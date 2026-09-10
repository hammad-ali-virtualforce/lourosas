import ContactPanel from "@/app/components/contact/ContactPanel";

import {
  getSiteSettings,
} from "@/app/lib/wordpress/grapgql/site";

import type {
  ContactLayout,
} from "@/app/lib/wordpress/grapgql/pages";

type Props = {
  section: ContactLayout;
};

export default async function ContactSection({
  section,
}: Props) {
  const settings =
    await getSiteSettings();

  const image =
    section
      .contactBackgroundImage
      ?.node;

  const imageUrl =
    image?.sourceUrl ||
    image?.mediaItemUrl ||
    null;

  return (
    <section
      className="
        relative
        overflow-hidden
        border-b-[5px]
          border-[#b89a55]
      "
      style={{
        backgroundColor:
          section
            .contactBackgroundColor ||
          "#fff",

        color:
          section
            .contactTextColor ||
          "#111",
      }}
    >
      {/* BACKGROUND IMAGE */}

      {imageUrl && (
        <div
          className="
            absolute
            inset-0

            bg-cover
            bg-center
            bg-no-repeat
          "
          style={{
            backgroundImage:
              `url("${imageUrl}")`,
          }}
        />
      )}

      {/* DARK OVERLAY */}

      {imageUrl && (
        <div
          className="
            absolute
            inset-0
            bg-[#061318]/90
          "
        />
      )}

      <div
        className="
          relative
          z-10

          mx-auto
          max-w-[1180px]

          px-5
          py-[80px]

          md:px-8
          md:py-[100px]

          lg:px-10
        "
      >
        <ContactPanel
          contact={
            settings.contact
          }
          social={
            settings.social
          }
          detailsHeading={
            section.contactHeading ||
            "Contact Details"
          }
          formHeading={
            section
              .contactFormHeading ||
            "Submit a Message"
          }
          showForm={
            section.showForm ??
            true
          }
          showEmail={
            section.showEmail ??
            true
          }
          showPhoneNumber={
            section
              .showPhoneNumber ??
            true
          }
          showAddress={
            section.showAddress ??
            true
          }
          showSocial={
            section.showSocial ??
            true
          }
        />
      </div>
    </section>
  );
}