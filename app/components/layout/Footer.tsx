import Image from "next/image";
import Link from "next/link";

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

import { getSiteSettings } from "@/app/lib/wordpress/grapgql/site";

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

function formatTel(phone?: string) {
  if (!phone) return "";

  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export default async function Footer() {
  const settings = await getSiteSettings();

  const {
    branding,
    contact,
    footer,
    social,
  } = settings;

  const footerLogo =
    branding.footerLogo?.node ??
    branding.primaryLogo?.node;

  return (
    <footer className="bg-white text-[#111]">
      <div
        className="
          mx-auto
          w-full
          px-5
          py-12
          md:px-8
          lg:px-10
          lg:py-16
          xl:px-14
          2xl:px-16
          max-w-[1440px]
        "
      >
        {/* =====================================
            SITE NAME / LOGO
        ====================================== */}

        <div className="mb-12 lg:mb-16">
          {footerLogo && (
            <Image src={footerLogo.sourceUrl}  width={200}
                height={800}
                priority
                alt={
                  footerLogo.altText ||
                  branding.siteName ||
                  "Lou Rosas"
                }
                className="
                  h-auto
                  w-[120px]
                  object-contain
                  md:w-[160px]
                  lg:w-[180px]
                "/>
                )}
            {footer.description && (
              <p
                className="
                  mt-4
                  max-w-[250px]
                  font-body
                  text-[13px]
                  leading-6
                  text-[#222]
                "
              >
                {footer.description}
              </p>
            )}
        </div>

        {/* =====================================
            CONTACT AREA
        ====================================== */}
       
        <div
          className="
            grid
            grid-cols-1
            gap-10
            border-b
            border-black/20
            pb-12
            md:grid-cols-2
            lg:grid-cols-[180px_1fr_300px]
            lg:gap-14
            lg:pb-16
          "
        >
          {/* Get in Touch */}

          <div>
            <h3
              className="
                font-heading
                text-[24px]
                font-normal
                tracking-[0.03em]
                text-[#222]
              "
            >
              Get in Touch
            </h3>

            
          </div>

          {/* Email + Address */}

          <div className="space-y-8">
            {/* Email */}

            {contact.email && (
              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >
                <Mail
                  size={28}
                  strokeWidth={1.2}
                  className="mt-1 shrink-0"
                />

                <div>
                  <p
                    className="
                      font-body
                      text-[13px]
                      font-semibold
                      uppercase
                      tracking-[0.1em]
                    "
                  >
                    Email
                  </p>

                  <a
                    href={`mailto:${contact.email}`}
                    className="
                      mt-1
                      inline-block
                      font-body
                      text-[14px]
                      font-medium
                      uppercase
                      tracking-[0.04em]
                      text-[#b89852]
                      underline
                      underline-offset-4
                    "
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            )}

            {/* Address */}

            {contact.address && (
              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >
                <MapPin
                  size={29}
                  strokeWidth={1.2}
                  className="mt-1 shrink-0"
                />

                <div>
                  <p
                    className="
                      font-body
                      text-[13px]
                      font-semibold
                      uppercase
                      tracking-[0.1em]
                    "
                  >
                    Address
                  </p>

                  <p
                    className="
                      mt-1
                      max-w-[340px]
                      whitespace-pre-line
                      font-body
                      text-[14px]
                      font-medium
                      uppercase
                      leading-6
                      tracking-[0.04em]
                    "
                  >
                    {contact.address}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Phone Numbers */}

          <div className="space-y-7">
            {contact.mobilePhone && (
              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >
                <Phone
                  size={27}
                  strokeWidth={1.2}
                  className="mt-1 shrink-0"
                />

                <div>
                  <p
                    className="
                      font-body
                      text-[13px]
                      font-semibold
                      uppercase
                      tracking-[0.1em]
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
                      font-medium
                      tracking-[0.04em]
                      text-[#b89852]
                      underline
                      underline-offset-4
                    "
                  >
                    {contact.mobilePhone}
                  </a>
                </div>
              </div>
            )}

            {contact.officePhone && (
              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >
                <Phone
                  size={27}
                  strokeWidth={1.2}
                  className="mt-1 shrink-0"
                />

                <div>
                  <p
                    className="
                      font-body
                      text-[13px]
                      font-semibold
                      uppercase
                      tracking-[0.1em]
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
                      font-medium
                      tracking-[0.04em]
                      text-[#b89852]
                      underline
                      underline-offset-4
                    "
                  >
                    {contact.officePhone}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =====================================
            LEGAL / LOGOS
        ====================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-10
            py-12
            lg:grid-cols-[180px_1fr]
            lg:gap-14
            lg:py-14
          "
        >
          {/* Realtor + Brokerage Logos */}

          <div
            className="
              flex
              flex-row
              items-start
              gap-6
              lg:flex-col
            "
          >
            {footer.realtorLogo?.node?.sourceUrl && (
              <Image
                src={
                  footer.realtorLogo.node
                    .sourceUrl
                }
                alt={
                  footer.realtorLogo.node
                    .altText || "Realtor"
                }
                width={150}
                height={150}
                className="
                  h-auto
                  max-h-[90px]
                  w-auto
                  object-contain
                "
              />
            )}

            {footer.brokerageLogo?.node
              ?.sourceUrl && (
              <Image
                src={
                  footer.brokerageLogo.node
                    .sourceUrl
                }
                alt={
                  footer.brokerageLogo.node
                    .altText ||
                  contact.brokerageName ||
                  "Brokerage"
                }
                width={180}
                height={120}
                className="
                  h-auto
                  max-h-[100px]
                  w-auto
                  object-contain
                "
              />
            )}
          </div>

          {/* Legal Content */}

          <div>
            {/* Legal Links */}

            {footer.legalLinks?.length > 0 && (
              <div
                className="
                  mb-8
                  flex
                  flex-col
                  items-start
                  gap-2
                "
              >
                {footer.legalLinks.map(
                  (item, index) => (
                    <a
                      key={`${item.legalText}-${index}`}
                      href={
                        item.legalLinks || "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        font-body
                        text-[13px]
                        tracking-[0.04em]
                        underline
                        underline-offset-4
                        transition-opacity
                        duration-300
                        hover:opacity-60
                      "
                    >
                      {item.legalText}
                    </a>
                  )
                )}
              </div>
            )}

            {/* Disclaimer 1 */}

            {footer.disclaimerText1 && (
              <p
                className="
                  font-body
                  text-[11px]
                  leading-[1.7]
                  tracking-[0.03em]
                  text-black/80
                "
              >
                {footer.disclaimerText1}
              </p>
            )}

            {/* Disclaimer 2 */}

            {footer.disclaimerText2 && (
              <p
                className="
                  mt-4
                  font-body
                  text-[11px]
                  leading-[1.7]
                  tracking-[0.03em]
                  text-black/80
                "
              >
                {footer.disclaimerText2}
              </p>
            )}

            {/* Disclaimer Copyright */}

            {footer.disclaimerCopyright && (
              <p
                className="
                  mt-4
                  font-body
                  text-[10px]
                  leading-5
                  text-black/60
                "
              >
                {footer.disclaimerCopyright}
              </p>
            )}
          </div>
        </div>

        {/* =====================================
            BOTTOM
        ====================================== */}

        <div
          className="
            flex
            flex-col
            gap-7
            border-t
            border-black/20
            pt-8
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          

          {/* Center */}

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-2
              font-body
              text-[13px]
            "
          >
            {footer.websiteCopyright && (
              <span>
                {footer.websiteCopyright}
              </span>
            )}

            
          </div>
          <div className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-2
              font-body
              text-[13px]
            ">
            {footer.termsLink && (
              <>
                <Link
                  href={footer.termsLink}
                  className="
                    font-semibold
                    text-[#b89852]
                    underline
                    underline-offset-4
                  "
                >
                  Terms of Use
                </Link>
              </>
            )}
            {footer.privacyLink && (
              <>
                <span>|</span>

                <Link
                  href={footer.privacyLink}
                  className="
                    font-semibold
                    text-[#b89852]
                    underline
                    underline-offset-4
                  "
                >
                  Privacy Policy
                </Link>
                <span>|</span>
              </>
            )}
            {footer.fhslink && (
              <><Link
                  href={footer.fhslink}
                  className="
                    font-semibold
                    text-[#b89852]
                    underline
                    underline-offset-4
                  "
                >
                  Fair Housing Statement
                </Link>
              </>
            )}
          </div>
          {/* Social */}

          {social.socialMedia?.length > 0 && (
            <div className="flex items-center gap-3 justify-center">
                {social.socialMedia.map((item, index) => {
                  const rawIcon: unknown = item.icon;

                  let iconValue = "";

                  if (typeof rawIcon === "string") {
                    iconValue = rawIcon;
                  } else if (Array.isArray(rawIcon)) {
                    iconValue =
                      typeof rawIcon[0] === "string"
                        ? rawIcon[0]
                        : "";
                  } else if (
                    rawIcon &&
                    typeof rawIcon === "object" &&
                    "value" in rawIcon
                  ) {
                    const value = (
                      rawIcon as {
                        value?: unknown;
                      }
                    ).value;

                    iconValue =
                      typeof value === "string"
                        ? value
                        : "";
                  }

                  const key =
                    iconValue
                      .trim()
                      .toLowerCase() as keyof typeof socialIconMap;

                  const Icon =
                    socialIconMap[key];

                  if (!Icon || !item.link) {
                    return null;
                  }

                  return (
                    <a
                      key={`${iconValue}-${index}`}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={
                        item.label || iconValue
                      }
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-[#b89852]
                        text-white
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:bg-[#222]
                      "
                    >
                      <Icon size={15} />
                    </a>
                  );
                })}
            </div>
            )}
        </div>
      </div>
    </footer>
  );
}