"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import type {
  ActionButtonFields,
} from "@/app/lib/wordpress/grapgql/pages";

import {
  useContactModal,
} from "@/app/components/contact/ContactModalProvider";

type Props = {
  button: ActionButtonFields;

  className?: string;

  /*
   * Allows every section to keep
   * its own label/icon design.
   */
  children?: ReactNode;
};

function getOption(
  value:
    | string
    | string[]
    | null
    | undefined
) {
  if (!value) {
    return "";
  }

  const option =
    Array.isArray(value)
      ? value[0]
      : value;

  return String(option || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/-/g, "_");
}

export default function ActionButton({
  button,
  className = "",
  children,
}: Props) {
  const {
    openContactModal,
  } = useContactModal();

  if (!button.buttonLabel) {
    return null;
  }

  const content =
    children ??
    button.buttonLabel;

  /* =======================================================
     NORMAL BUTTON
  ======================================================= */

  if (!button.isContactButton) {
    if (!button.buttonLink) {
      return null;
    }

    return (
      <Link
        href={button.buttonLink}
        className={className}
      >
        {content}
      </Link>
    );
  }

  /* =======================================================
     CONTACT BUTTON
  ======================================================= */

  const contactAction =
    getOption(
      button.contactAction
    );

  /* =======================================================
     CONTACT PAGE
  ======================================================= */

  if (
    contactAction === "page"
  ) {
    return (
      <Link
        href={
          button.contactPageLink ||
          "/contact/"
        }
        className={className}
      >
        {content}
      </Link>
    );
  }

  /* =======================================================
     CONTACT MODAL
  ======================================================= */

  return (
    <button
      type="button"
      onClick={
        openContactModal
      }
      className={className}
    >
      {content}
    </button>
  );
}