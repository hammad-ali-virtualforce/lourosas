"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import HamburgerMenu from "./HamburgerMenu";

type ImageNode = {
  node: {
    sourceUrl: string;
    altText: string;
  } | null;
} | null;

type Branding = {
  siteName: string;
  primaryLogo: ImageNode;
  lightLogo: ImageNode;
};

export type MenuItem = {
  id: string;
  databaseId: number;
  label: string;
  url: string;
  path: string;
  parentId: string | null;
  order: number;
};

type HeaderSettings = {
  headerLogo: ImageNode;
  headerLightLogo: ImageNode;
  headerBackground: string | null;
  headerText: string | null;
};

type HeaderClientProps = {
  branding: Branding;
  headerSettings: HeaderSettings;
  headerMenu: MenuItem[];
  hamburgerMenu: MenuItem[];
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

export default function HeaderClient({
  branding,
  headerSettings,
  headerMenu,
  hamburgerMenu,
}: HeaderClientProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(0);

  useEffect(() => {
  let lastScrollPosition = 0;

  const handleScroll = (event?: Event) => {
    let currentScrollPosition = 0;

    /*
     * If a custom container is scrolling,
     * get scrollTop from that element.
     */
    const target = event?.target;

    if (
      target instanceof HTMLElement &&
      target !== document.documentElement &&
      target !== document.body
    ) {
      currentScrollPosition = target.scrollTop;
    } else {
      /*
       * Normal browser/window scrolling.
       */
      currentScrollPosition =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
    }


    /*
     * Sticky styling.
     */
    setIsScrolled(currentScrollPosition > 40);

    /*
     * Always show near top.
     */
    if (currentScrollPosition <= 80) {
      setIsVisible(true);
      lastScrollPosition = currentScrollPosition;
      return;
    }

    const scrollDifference =
      currentScrollPosition - lastScrollPosition;

    /*
     * Ignore tiny movements.
     */
    if (Math.abs(scrollDifference) < 3) {
      return;
    }

    /*
     * Scroll down = hide.
     */
    if (scrollDifference > 0) {
      setIsVisible(false);
    }

    /*
     * Scroll up = show.
     */
    if (scrollDifference < 0) {
      setIsVisible(true);
    }

    lastScrollPosition = currentScrollPosition;
  };

  /*
   * Normal browser scrolling.
   */
  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  /*
   * IMPORTANT:
   * Capture scroll events from custom
   * scrollable divs/containers too.
   */
  document.addEventListener(
    "scroll",
    handleScroll,
    true
  );

  return () => {
    window.removeEventListener(
      "scroll",
      handleScroll
    );

    document.removeEventListener(
      "scroll",
      handleScroll,
      true
    );
  };
}, []);

  /*
   * Only top-level items go in main navigation.
   */
  const parentItems = headerMenu
    .filter((item) => !item.parentId)
    .sort((a, b) => a.order - b.order);

  /*
   * Get children belonging to one parent.
   */
  const getChildren = (parentId: string) =>
    headerMenu
      .filter((item) => item.parentId === parentId)
      .sort((a, b) => a.order - b.order);

  /*
   * Logos
   */
  const primaryLogo =
    headerSettings.headerLogo?.node ??
    branding.primaryLogo?.node;

  const lightLogo =
    headerSettings.headerLightLogo?.node ??
    branding.lightLogo?.node ??
    primaryLogo;

  const activeLogo = isScrolled
    ? primaryLogo
    : lightLogo;

  /*
   * IMPORTANT:
   * ACF sticky header background.
   */
  const stickyBackground =
    headerSettings.headerBackground?.trim() ||
    "#ffffff";

  const textColor = isScrolled
    ? "text-black"
    : "text-white";
      
  return (
    <>
      <header
        className={`
          fixed
          left-0
          top-0
          z-50
          w-full
          transition-all
          duration-500
          ease-in-out
          py-2

          ${
            isVisible
              ? "translate-y-0"
              : "-translate-y-full"
          }

          ${
            isScrolled
              ? "shadow-[0_1px_8px_rgba(0,0,0,0.08)]"
              : ""
          }
        `}
        style={{
          backgroundColor: isScrolled
            ? stickyBackground
            : "transparent",
        }}
      >
        <div
          className="
            mx-auto
            flex
            h-[95px]
            w-full
            items-center
            justify-between
            px-5
            md:px-8
            lg:px-10
            xl:px-14
            2xl:px-16
            
          max-w-[1440px]
          "
        >
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0"
            aria-label={branding.siteName}
          >
            {activeLogo?.sourceUrl ? (
              <Image
                src={activeLogo.sourceUrl}
                alt={
                  activeLogo.altText ||
                  branding.siteName ||
                  "Lou Rosas"
                }
                width={200}
                height={800}
                priority
                className="
                  h-auto
                  w-[120px]
                  object-contain
                  md:w-[130px]
                  lg:w-[140px]
                "
              />
            ) : (
              <span
                className={`
                  text-lg
                  uppercase
                  tracking-[0.1em]
                  ${textColor}
                `}
              >
                {branding.siteName}
              </span>
            )}
          </Link>

          {/* Right */}
          <div className="flex items-center">
            {/* Desktop menu */}
            <nav
              className="
                hidden
                items-center
                lg:flex
              "
              aria-label="Primary navigation"
            >
              {parentItems.map((item) => {
                const children = getChildren(item.id);
                const href = getMenuHref(item);

                return (
                  <div
                    key={item.id}
                    className="group relative"
                  >
                    {/* Parent */}
                    {isExternalLink(href) ? (
                      <a
                        href={href}
                        className={`
                          flex
                          items-center
                          gap-1.5
                          px-4
                          py-9
                          text-[12px]
                          uppercase
                          tracking-[0.14em]
                          transition-opacity
                          hover:opacity-60
                          xl:px-5
                          ${textColor}
                        `}
                      >
                        {item.label}

                        {children.length > 0 && (
                          <span className="text-[8px]">
                            ▼
                          </span>
                        )}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className={`
                          flex
                          items-center
                          gap-1.5
                          px-4
                          py-9
                          font-heading
                          text-[13px]
                          font-medium
                          uppercase
                          tracking-[0.08em]
                          uppercase
                          tracking-[0.14em]
                          transition-opacity
                          hover:opacity-60
                          xl:px-5
                          ${textColor}
                          
                        `}
                        style={{
                          color: isScrolled
                            ? (headerSettings.headerText ?? "#111")
                            : "#fff",
                        }}
                      >
                        {item.label}

                        {children.length > 0 && (
                          <span className="text-[8px]">
                            ▼
                          </span>
                        )}
                      </Link>
                    )}

                    {/* Submenu */}
                    {children.length > 0 && (
                      <div
                        className="
                          invisible
                          absolute
                          left-0
                          top-full
                          min-w-[220px]
                          translate-y-2
                          bg-white
                          py-3
                          opacity-0
                          shadow-lg
                          transition-all
                          duration-200

                          group-hover:visible
                          group-hover:translate-y-0
                          group-hover:opacity-100
                        "
                      >
                        {children.map((child) => {
                          const childHref =
                            getMenuHref(child);

                          if (
                            isExternalLink(childHref)
                          ) {
                            return (
                              <a
                                key={child.id}
                                href={childHref}
                                className="
                                  block
                                  whitespace-nowrap
                                  px-6
                                  py-3
                                  text-[12px]
                                  uppercase
                                  tracking-[0.1em]
                                  text-black
                                  transition-colors
                                  hover:bg-black/5
                                "
                              >
                                {child.label}
                              </a>
                            );
                          }

                          return (
                            <Link
                              key={child.id}
                              href={childHref}
                              className="
                                block
                                whitespace-nowrap
                                px-6
                                py-3
                                font-heading
                                text-[14px]
                                font-medium
                                uppercase
                                tracking-[0.08em]
                                uppercase
                                tracking-[0.1em]
                                text-black
                                transition-colors
                                hover:bg-black/5
                              "
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Separator */}
            {parentItems.length > 0 && (
              <span
                className={`
                  mx-4
                  hidden
                  h-6
                  w-px
                  lg:block

                  ${
                    isScrolled
                      ? "bg-black/20"
                      : "bg-white/40"
                  }
                `}
              />
            )}

            {/* Hamburger */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="
                group
                flex
                h-11
                w-11
                items-center
                justify-center
                cursor-pointer
              "
            >
              <span
                className="
                  flex
                  w-[28px]
                  flex-col
                  items-end
                  gap-[6px]
                "
              >
                <span
                  className={`
                    block
                    h-px
                    w-full
                    transition-all
                    duration-300
                    group-hover:w-[75%]

                    ${
                      isScrolled
                        ? "bg-[#b79f5e]"
                        : "bg-[white]"
                    }
                  `}
                />

                <span
                  className={`
                    block
                    h-px
                    w-[75%]
                    transition-all
                    duration-300
                    group-hover:w-full

                    ${
                      isScrolled
                        ? "bg-[#b79f5e]"
                        : "bg-white"
                    }
                  `}
                />

                <span
                  className={`
                    block
                    h-px
                    w-full
                    transition-all
                    duration-300
                    group-hover:w-[75%]

                    ${
                      isScrolled
                        ? "bg-[#b79f5e]"
                        : "bg-white"
                    }
                  `}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <HamburgerMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        menuItems={hamburgerMenu}
        branding={branding}
      />
    </>
  );
}