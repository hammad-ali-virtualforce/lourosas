"use client";

import {
  useEffect,
} from "react";

import {
  X,
} from "lucide-react";

import ContactPanel from "./ContactPanel";

import {
  useContactModal,
} from "./ContactModalProvider";

import {ContactModalSettings} from "@/app/lib/wordpress/grapgql/site";

type Props = {
  contact: any;
  social: any;

   modalSettings:
    ContactModalSettings | null;
};

export default function ContactModal({
  contact,
  social,
  modalSettings,
}: Props) {
  const {
    isOpen,
    closeContactModal,
  } = useContactModal();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const oldOverflow =
      document.body.style
        .overflow;

    document.body.style
      .overflow = "hidden";

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (
        event.key ===
        "Escape"
      ) {
        closeContactModal();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style
        .overflow =
        oldOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    isOpen,
    closeContactModal,
  ]);

  if (!isOpen) {
    return null;
  }
console.log(modalSettings)
  const image =
    modalSettings
      ?.backgroundImage
      ?.node;

  const imageUrl =
    image?.sourceUrl ||
    image?.mediaItemUrl ||
    null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="
        fixed
        inset-0
        z-[99999]

        overflow-y-auto

        bg-[#07171c]
        text-white
      "
    >
      {/* BACKGROUND */}

      {imageUrl && (
        <div
          className="
            absolute
            inset-0

            bg-cover
            bg-center
          "
          style={{
            backgroundImage:
              `url("${imageUrl}")`,
          }}
        />
      )}

      <div
        className="
          absolute
          inset-0
          bg-[#061318]/90
        "
      />

      {/* CLOSE */}

      <button
        type="button"
        onClick={
          closeContactModal
        }
        aria-label="Close contact modal"
        className="
          fixed
          right-6
          top-6
          z-50

          flex
          h-12
          w-12
          items-center
          justify-center

          text-white

          transition-transform
          duration-300

          hover:rotate-90
        "
      >
        <X
          size={38}
          strokeWidth={1.1}
        />
      </button>

      {/* CONTENT */}

      <div
        className="
          relative
          z-20

          mx-auto

          flex
          min-h-screen
          max-w-[1180px]
          items-center

          px-5
          py-[80px]

          md:px-8
          lg:px-10
        "
      >
        <div className="w-full">
          <ContactPanel
            contact={contact}
            social={social}
            detailsHeading={
              modalSettings
                ?.detailsHeading ||
              "Contact Details"
            }
            formHeading={
              modalSettings
                ?.formHeading ||
              "Submit a Message"
            }
            showForm={
              modalSettings
                ?.showForm ??
              true
            }
            showEmail={
              modalSettings
                ?.showEmail ??
              true
            }
            showPhoneNumber={
              modalSettings
                ?.showPhoneNumber ??
              true
            }
            showAddress={
              modalSettings
                ?.showAddress ??
              true
            }
            showSocial={
              modalSettings
                ?.showSocial ??
              true
            }
          />
        </div>
      </div>
    </div>
  );
}