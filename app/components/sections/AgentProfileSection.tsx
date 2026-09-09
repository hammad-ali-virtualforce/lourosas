import Image from "next/image";

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

import type {
  AgentProfileLayout,
} from "@/app/lib/wordpress/grapgql/pages";

import {
  getSiteSettings,
} from "@/app/lib/wordpress/grapgql/site";

/* =========================================================
   PROPS
========================================================= */

type AgentProfileSectionProps = {
  section: AgentProfileLayout;
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

function normalizeSocialIcon(
  value: unknown
): string {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    const first = value[0];

    if (typeof first === "string") {
      return first;
    }

    if (
      first &&
      typeof first === "object" &&
      "value" in first
    ) {
      const optionValue = (
        first as {
          value?: unknown;
        }
      ).value;

      return typeof optionValue === "string"
        ? optionValue
        : "";
    }

    return "";
  }

  if (
    typeof value === "object" &&
    "value" in value
  ) {
    const optionValue = (
      value as {
        value?: unknown;
      }
    ).value;

    return typeof optionValue === "string"
      ? optionValue
      : "";
  }

  return "";
}

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

/* =========================================================
   CONTACT ITEM
========================================================= */

function ContactItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p
        className="
          mb-2
          font-body
          text-[12px]
          font-medium
          uppercase
          tracking-[0.13em]
        "
      >
        {label}
      </p>

      {children}
    </div>
  );
}

/* =========================================================
   AGENT PROFILE
========================================================= */

export default async function AgentProfileSection({
  section,
}: AgentProfileSectionProps) {
  const settings =
    await getSiteSettings();

  const {
    contact,
    social,
  } = settings;

  const image =
    section.agentProfileImage?.node;

  const imageUrl =
    image?.sourceUrl ||
    image?.mediaItemUrl ||
    null;

  const heading =
    section.agentProfileHeading ||
    contact.agentName ||
    "Lou Rosas";

  const backgroundColor =
    section.agentProfileBackgroundColor ||
    "#ffffff";

  const textColor =
    section.agentProfileTextColor ||
    "#111111";

  const socialItems =
    Array.isArray(
      social.socialMedia
    )
      ? social.socialMedia
      : [];

  return (
    <section
      className="
        relative
        overflow-hidden
      "
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      <div
        className="
          mx-auto
          grid
          max-w-[1440px]
          grid-cols-1

          lg:grid-cols-[520px_1fr]
          lg:gap-[120px]

          xl:grid-cols-[540px_1fr]
          xl:gap-[130px]
        "
      >
        {/* =================================================
            LEFT IMAGE
        ================================================= */}

        <div
          className="
            relative
            min-h-[520px]

            sm:min-h-[650px]

            lg:min-h-[735px]
          "
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={
                image?.altText ||
                heading
              }
              fill
              sizes="
                (max-width: 1023px) 100vw,
                540px
              "
              className="
                object-contain
                object-center
              "
              priority={false}
            />
          ) : (
            <div
              className="
                absolute
                inset-0
                bg-[#eceae6]
              "
            />
          )}
        </div>

        {/* =================================================
            RIGHT CONTENT
        ================================================= */}

        <div
          className="
            flex
            items-center

            px-5
            py-[70px]

            sm:px-8
            sm:py-[85px]

            lg:px-0
            lg:py-[90px]
            lg:pr-12

            xl:pr-16
          "
        >
          <div
            className="
              w-full
              max-w-[620px]
            "
          >
            {/* NAME */}

            <h2
              className="
                font-heading
                text-[42px]
                font-normal
                uppercase
                leading-none
                tracking-[0.045em]

                sm:text-[48px]

                lg:text-[50px]
              "
            >
              {heading}
            </h2>

            {/* JOB TITLE */}

            {contact.jobTitle && (
              <p
                className="
                  mt-3
                  font-body
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  opacity-55
                "
              >
                {contact.jobTitle}
              </p>
            )}

            {/* =============================================
                PHONE ROW
            ============================================= */}

            <div
              className="
                mt-[34px]
                grid
                grid-cols-1
                gap-7

                sm:grid-cols-2
                sm:gap-12
              "
            >
              {contact.mobilePhone && (
                <ContactItem
                  label="Primary Phone"
                >
                  <a
                    href={formatTel(
                      contact.mobilePhone
                    )}
                    className="
                      font-body
                      text-[15px]
                      font-semibold
                      tracking-[0.035em]
                      text-[#b79a55]
                      underline
                      underline-offset-4

                      transition-opacity
                      duration-300

                      hover:opacity-60
                    "
                  >
                    {contact.mobilePhone}
                  </a>
                </ContactItem>
              )}

              {contact.officePhone && (
                <ContactItem
                  label="Secondary Phone"
                >
                  <a
                    href={formatTel(
                      contact.officePhone
                    )}
                    className="
                      font-body
                      text-[15px]
                      font-semibold
                      tracking-[0.035em]
                      text-[#b79a55]
                      underline
                      underline-offset-4

                      transition-opacity
                      duration-300

                      hover:opacity-60
                    "
                  >
                    {contact.officePhone}
                  </a>
                </ContactItem>
              )}
            </div>

            {/* =============================================
                EMAIL
            ============================================= */}

            {contact.email && (
              <div className="mt-8">
                <ContactItem label="Email">
                  <a
                    href={`mailto:${contact.email}`}
                    className="
                      break-all
                      font-body
                      text-[15px]
                      font-semibold
                      tracking-[0.035em]
                      text-[#b79a55]
                      underline
                      underline-offset-4

                      transition-opacity
                      duration-300

                      hover:opacity-60
                    "
                  >
                    {contact.email}
                  </a>
                </ContactItem>
              </div>
            )}

            {/* =============================================
                ADDRESS
            ============================================= */}

            {contact.address && (
              <div className="mt-8">
                <ContactItem label="Address">
                  <p
                    className="
                      max-w-[390px]
                      whitespace-pre-line

                      font-body
                      text-[15px]
                      font-normal
                      leading-[1.7]
                      tracking-[0.02em]
                    "
                  >
                    {contact.address}
                  </p>
                </ContactItem>
              </div>
            )}

            {/* =============================================
                SOCIAL
            ============================================= */}

            {socialItems.length > 0 && (
              <div
                className="
                  mt-[42px]
                  flex
                  flex-wrap
                  items-center
                  gap-[10px]
                "
              >
                {socialItems.map(
                  (
                    item,
                    index
                  ) => {
                    const iconValue =
                      normalizeSocialIcon(
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
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={
                          item.label ||
                          iconValue
                        }
                        className="
                          flex
                          h-[42px]
                          w-[42px]
                          items-center
                          justify-center

                          rounded-full

                          bg-[#b79a55]
                          text-white

                          transition-all
                          duration-300

                          hover:-translate-y-1
                          hover:bg-[#222]
                        "
                      >
                        <Icon
                          size={16}
                        />
                      </a>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}