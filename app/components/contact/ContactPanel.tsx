"use client";

import type {
  FormEvent,
} from "react";

import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
  FaTiktok,
  FaPinterestP,
  FaYelp,
} from "react-icons/fa6";

/* =========================================================
   TYPES
========================================================= */

type ContactData = {
  agentName?: string | null;
  jobTitle?: string | null;

  mobilePhone?: string | null;
  officePhone?: string | null;

  email?: string | null;
  address?: string | null;
};

type SocialItem = {
  icon?: unknown;
  link?: string | null;
  label?: string | null;
};

type Props = {
  contact: ContactData;

  social?: {
    socialMedia?:
      | SocialItem[]
      | null;
  };

  detailsHeading?: string | null;
  formHeading?: string | null;

  showForm?: boolean;
  showEmail?: boolean;
  showPhoneNumber?: boolean;
  showAddress?: boolean;
  showSocial?: boolean;
};

/* =========================================================
   SOCIAL ICONS
========================================================= */

const socialIconMap = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  twitter: FaXTwitter,
  x: FaXTwitter,
  tiktok: FaTiktok,
  pinterest: FaPinterestP,
  yelp: FaYelp,
};

/* =========================================================
   HELPERS
========================================================= */

function formatTel(
  phone?: string | null
) {
  if (!phone) {
    return "";
  }

  return `tel:${phone.replace(
    /[^\d+]/g,
    ""
  )}`;
}

function normalizeIcon(
  value: unknown
) {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    const first = value[0];

    if (
      typeof first === "string"
    ) {
      return first;
    }

    if (
      first &&
      typeof first === "object" &&
      "value" in first
    ) {
      const result = (
        first as {
          value?: unknown;
        }
      ).value;

      return typeof result ===
        "string"
        ? result
        : "";
    }

    return "";
  }

  if (
    typeof value === "object" &&
    "value" in value
  ) {
    const result = (
      value as {
        value?: unknown;
      }
    ).value;

    return typeof result ===
      "string"
      ? result
      : "";
  }

  return "";
}

/* =========================================================
   CONTACT PANEL
========================================================= */

export default function ContactPanel({
  contact,
  social,

  detailsHeading =
    "Contact Details",

  formHeading =
    "Submit a Message",

  showForm = true,
  showEmail = true,
  showPhoneNumber = true,
  showAddress = true,
  showSocial = true,
}: Props) {
  const socialItems =
    Array.isArray(
      social?.socialMedia
    )
      ? social.socialMedia
      : [];

  const showDetails =
    showEmail ||
    showPhoneNumber ||
    showAddress ||
    showSocial;

  function handleDummySubmit(
    event:
      FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
  }

  return (
    <div
      className={`
        grid
        grid-cols-1

        ${
          showDetails && showForm
            ? "lg:grid-cols-2"
            : ""
        }
      `}
    >
      {/* =================================================
          LEFT DETAILS
      ================================================= */}

      {showDetails && (
        <div
          className={`
            py-10

            ${
              showForm
                ? `
                  lg:border-r
                  lg:border-white/30
                  lg:pr-[70px]
                `
                : ""
            }
          `}
        >
          <h2
            className="
              font-heading

              text-[38px]
              font-normal
              uppercase
              leading-none
              tracking-[0.04em]

              md:text-[44px]
            "
          >
            {detailsHeading}
          </h2>

          {contact.agentName && (
            <div className="mt-7">
              <p
                className="
                  font-heading
                  text-[20px]
                "
              >
                {contact.agentName}
              </p>

              {contact.jobTitle && (
                <p
                  className="
                    mt-1

                    font-body
                    text-[10px]
                    uppercase
                    tracking-[0.15em]

                    opacity-60
                  "
                >
                  {contact.jobTitle}
                </p>
              )}
            </div>
          )}

          {/* PHONE */}

          {showPhoneNumber &&
            contact.mobilePhone && (
              <div
                className="
                  mt-7
                  flex
                  items-start
                  gap-4
                "
              >
                <Phone
                  size={28}
                  strokeWidth={1.2}
                />

                <div>
                  <p
                    className="
                      font-body
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                    "
                  >
                    Mobile
                  </p>

                  <a
                    href={formatTel(
                      contact.mobilePhone
                    )}
                    className="
                      mt-1
                      inline-block

                      font-body
                      text-[14px]
                      font-semibold

                      text-[#b89a55]

                      underline
                      underline-offset-4
                    "
                  >
                    {
                      contact.mobilePhone
                    }
                  </a>
                </div>
              </div>
            )}

          {showPhoneNumber &&
            contact.officePhone && (
              <div
                className="
                  mt-6
                  flex
                  items-start
                  gap-4
                "
              >
                <Phone
                  size={28}
                  strokeWidth={1.2}
                />

                <div>
                  <p
                    className="
                      font-body
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                    "
                  >
                    Office
                  </p>

                  <a
                    href={formatTel(
                      contact.officePhone
                    )}
                    className="
                      mt-1
                      inline-block

                      font-body
                      text-[14px]
                      font-semibold

                      text-[#b89a55]

                      underline
                      underline-offset-4
                    "
                  >
                    {
                      contact.officePhone
                    }
                  </a>
                </div>
              </div>
            )}

          {/* EMAIL */}

          {showEmail &&
            contact.email && (
              <div
                className="
                  mt-6
                  flex
                  items-start
                  gap-4
                "
              >
                <Mail
                  size={28}
                  strokeWidth={1.2}
                />

                <div>
                  <p
                    className="
                      font-body
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                    "
                  >
                    Email
                  </p>

                  <a
                    href={`mailto:${contact.email}`}
                    className="
                      mt-1
                      inline-block

                      break-all

                      font-body
                      text-[14px]
                      font-semibold

                      text-[#b89a55]

                      underline
                      underline-offset-4
                    "
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            )}

          {/* ADDRESS */}

          {showAddress &&
            contact.address && (
              <div
                className="
                  mt-6
                  flex
                  items-start
                  gap-4
                "
              >
                <MapPin
                  size={29}
                  strokeWidth={1.2}
                />

                <div>
                  <p
                    className="
                      font-body
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                    "
                  >
                    Address
                  </p>

                  <p
                    className="
                      mt-1
                      max-w-[360px]

                      whitespace-pre-line

                      font-body
                      text-[13px]
                      leading-[1.7]
                    "
                  >
                    {contact.address}
                  </p>
                </div>
              </div>
            )}

          {/* SOCIAL */}

          {showSocial &&
            socialItems.length >
              0 && (
              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  gap-3
                "
              >
                {socialItems.map(
                  (
                    item,
                    index
                  ) => {
                    const iconValue =
                      normalizeIcon(
                        item.icon
                      );

                    const key =
                      iconValue
                        .trim()
                        .toLowerCase() as keyof typeof socialIconMap;

                    const Icon =
                      socialIconMap[
                        key
                      ];

                    if (
                      !Icon ||
                      !item.link
                    ) {
                      return null;
                    }

                    return (
                      <a
                        key={`${iconValue}-${index}`}
                        href={
                          item.link
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={
                          item.label ||
                          iconValue
                        }
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center

                          rounded-full

                          bg-white
                          text-[#b89a55]

                          transition-all
                          duration-300
                            border border-[[#b89a55]
                          hover:-translate-y-1
                          hover:bg-[#b89a55]
                          hover:text-white
                        "
                      >
                        <Icon
                          size={15}
                        />
                      </a>
                    );
                  }
                )}
              </div>
            )}
        </div>
      )}

      {/* =================================================
          RIGHT FORM
      ================================================= */}

      {showForm && (
        <div
          className={`
            py-10

            ${
              showDetails
                ? "lg:pl-[70px]"
                : ""
            }
          `}
        >
          <h2
            className="
              font-heading

              text-[38px]
              font-normal
              uppercase
              leading-none
              tracking-[0.04em]

              md:text-[44px]
            "
          >
            {formHeading}
          </h2>

          <form
            onSubmit={
              handleDummySubmit
            }
            className="mt-9"
          >
            <ContactInput
              label="Name"
              name="name"
              type="text"
            />

            <ContactInput
              label="Email"
              name="email"
              type="email"
            />

            <ContactInput
              label="Phone"
              name="phone"
              type="tel"
            />

            <div className="mt-7">
              <label
                htmlFor="contact-message"
                className="
                  font-body
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.1em]
                "
              >
                Message
              </label>

              <textarea
                id="contact-message"
                name="message"
                rows={4}
                className="
                  mt-3
                  w-full
                  resize-none

                  border
                  border-current/60

                  bg-transparent
                  p-4

                  font-body
                  text-[14px]

                  outline-none
                "
              />
            </div>

            <label
              className="
                mt-5
                flex
                items-start
                gap-3
              "
            >
              <input
                type="checkbox"
                className="
                  mt-[3px]
                  h-4
                  w-4
                "
              />

              <span
                className="
                  font-body
                  text-[10px]
                  leading-[1.7]
                  opacity-75
                "
              >
                I agree to be
                contacted regarding
                real estate services.
              </span>
            </label>

            <button
              type="submit"
              className="
                mt-6

                min-h-[50px]

                bg-white
                px-8

                font-heading
                text-[12px]
                font-medium
                uppercase
                tracking-[0.15em]

                text-[#b89a55]
                cursor-pointer
                transition-all
                duration-300
                border border-[#b89a55]
                hover:bg-[#b89a55]
                hover:text-white
              "
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   INPUT
========================================================= */

function ContactInput({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) {
  return (
    <div
      className="
        mt-7
        first:mt-0
      "
    >
      <label
        htmlFor={`contact-${name}`}
        className="
          font-body
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.1em]
        "
      >
        {label}
      </label>

      <input
        id={`contact-${name}`}
        name={name}
        type={type}
        className="
          mt-2
          w-full

          border-0
          border-b
          border-current/60

          bg-transparent

          px-0
          py-3

          font-body

          outline-none
        "
      />
    </div>
  );
}