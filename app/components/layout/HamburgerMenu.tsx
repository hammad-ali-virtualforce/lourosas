"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import type { MenuItem } from "./HeaderClient";

type ImageNode = {
  node: {
    sourceUrl: string;
    altText: string;
  } | null;
} | null;

type HamburgerMenuProps = {
  open: boolean;
  onClose: () => void;

  menuItems: MenuItem[];

  branding: {
    siteName: string;
    primaryLogo: ImageNode;
    lightLogo: ImageNode;
  };
};

function getMenuHref(item: MenuItem) {
  return item.path || item.url || "#";
}

function isExternalLink(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:")
  );
}

export default function HamburgerMenu({
  open,
  onClose,
  menuItems,
}: HamburgerMenuProps) {
  const [openSubmenus, setOpenSubmenus] = useState<string[]>(
    []
  );

  /**
   * Open / close submenu.
   */
  const toggleSubmenu = (id: string) => {
    setOpenSubmenus((current) =>
      current.includes(id)
        ? current.filter(
            (itemId) => itemId !== id
          )
        : [...current, id]
    );
  };

  /**
   * Disable body scroll while drawer is open.
   */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /**
   * Close with Escape.
   */
  useEffect(() => {
    if (!open) return;

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, onClose]);

  /**
   * Reset opened submenus when drawer closes.
   */
  useEffect(() => {
    if (!open) {
      setOpenSubmenus([]);
    }
  }, [open]);


  /**
   * Only top-level WordPress menu items.
   */
  const parentItems = menuItems
    .filter((item) => !item.parentId)
    .sort((a, b) => a.order - b.order);

  return (
  <>
    {/* Backdrop */}
    <div
      onClick={onClose}
      className={`
        fixed
        inset-0
        z-[9998]
        bg-black/30
        transition-opacity
        duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }
      `}
    />

    {/* Drawer */}
    <aside
      className={`
        fixed
        right-0
        top-0
        z-[9999]
        h-dvh
        w-full
        overflow-y-auto
        bg-white
        text-[#222]

        transition-transform
        duration-[850ms]
        ease-[cubic-bezier(0.22,1,0.36,1)]

        sm:w-[500px]

        ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }
      `}
      aria-hidden={!open}
      aria-label="Navigation menu"
    >
      <div className="flex min-h-full flex-col">

        {/* Close */}
        <div className="flex justify-end px-4 py-6">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="
              group
              relative
              flex
              h-12
              w-12
              items-center
              justify-center
            "
          >
            <span
              className="
                absolute
                h-px
                w-8
                rotate-45
                bg-[#222]
                transition-transform
                duration-500
                ease-out
                group-hover:rotate-[135deg]
              "
            />

            <span
              className="
                absolute
                h-px
                w-8
                -rotate-45
                bg-[#222]
                transition-transform
                duration-500
                ease-out
                group-hover:rotate-45
              "
            />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-1 px-4 py-4">
          <nav
            className="w-full text-center"
            aria-label="Hamburger navigation"
          >
            {parentItems.length > 0 ? (
              <ul>
                {parentItems.map((item) => {
                  const children = menuItems
                    .filter(
                      (child) =>
                        child.parentId === item.id
                    )
                    .sort(
                      (a, b) =>
                        a.order - b.order
                    );

                  const hasChildren =
                    children.length > 0;

                  const isOpen =
                    openSubmenus.includes(
                      item.id
                    );

                  const href =
                    getMenuHref(item);

                  return (
                    <li
                      key={item.id}
                      className="
                        border-b
                        border-black/15
                      "
                    >
                      {/* Parent row */}
                      <div
                        className="
                          flex
                          flex-nowrap
                          items-center
                          justify-center
                          gap-1
                        "
                      >
                        <Link
                          href={href}
                          onClick={onClose}
                          className="
                            inline-flex
                            items-center
                            whitespace-nowrap
                            py-5
                            font-heading
                            text-[22px]
                            font-medium
                            uppercase
                            tracking-[0.04em]
                            text-[#222]
                            transition-opacity
                            duration-300
                            hover:opacity-60
                            md:py-6
                          "
                        >
                          {item.label}
                        </Link>

                        {hasChildren && (
                          <button
                            type="button"
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();

                              toggleSubmenu(
                                item.id
                              );
                            }}
                            aria-label={`Toggle ${item.label} submenu`}
                            aria-expanded={isOpen}
                            className="
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              text-[#222]
                            "
                          >
                            <ChevronDown
                              size={18}
                              strokeWidth={1.5}
                              className={`
                                transition-transform
                                duration-500
                                ease-[cubic-bezier(0.22,1,0.36,1)]

                                ${
                                  isOpen
                                    ? "rotate-180"
                                    : "rotate-0"
                                }
                              `}
                            />
                          </button>
                        )}
                      </div>

                      {/* Submenu */}
                      {hasChildren && (
                        <div
                          className={`
                            grid
                            overflow-hidden
                            transition-all
                            duration-500
                            ease-[cubic-bezier(0.22,1,0.36,1)]

                            ${
                              isOpen
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                            }
                          `}
                        >
                          <div className="overflow-hidden">
                            <ul className="pb-6">
                              {children.map(
                                (child) => (
                                  <li
                                    key={
                                      child.id
                                    }
                                  >
                                    <Link
                                      href={getMenuHref(
                                        child
                                      )}
                                      onClick={
                                        onClose
                                      }
                                      className="
                                        block
                                        py-2
                                        font-heading
                                        text-[18px]
                                        font-normal
                                        uppercase
                                        tracking-[0.08em]
                                        text-[#222]
                                        transition-opacity
                                        duration-300
                                        hover:opacity-60
                                      "
                                    >
                                      {
                                        child.label
                                      }
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p
                className="
                  py-10
                  font-heading
                  text-[22px]
                  font-light
                  text-[#222]/60
                "
              >
                Add items to the Hamburger
                Menu in WordPress.
              </p>
            )}
          </nav>
        </div>
      </div>
    </aside>
  </>
);
}