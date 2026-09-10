import Image from "next/image";
import Link from "next/link";

import type {
  ClientResourcesLayout,
  ClientResourceItem,
} from "@/app/lib/wordpress/grapgql/pages";

type ClientResourcesSectionProps = {
  section: ClientResourcesLayout;
};

/* =========================================================
   RESOURCE CARD
========================================================= */

function ResourceCard({
  resource,
  textColor,
}: {
  resource: ClientResourceItem;
  textColor: string;
}) {
  const imageUrl =
    resource.image?.node?.sourceUrl ||
    resource.image?.node?.mediaItemUrl ||
    null;

  const imageAlt =
    resource.image?.node?.altText ||
    resource.title ||
    "";

  const href =
    resource.link || "#";

  return (
    <Link
      href={href}
      className="
        group
        relative
        block
        w-full
        overflow-hidden
      "
    >
      <div
        className="
          relative
          h-[360px]
          overflow-hidden

          sm:h-[400px]

          md:h-[380px]

          lg:h-[410px]
        "
      >
        {/* IMAGE */}

        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="
              (max-width: 767px) 100vw,
              (max-width: 1023px) 33vw,
              430px
            "
            className="
              object-cover
              object-center

              transition-transform
              duration-[900ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]

              group-hover:scale-[1.045]
            "
          />
        ) : (
          <div
            className="
              absolute
              inset-0
              bg-[#e8e8e8]
            "
          />
        )}

        {/* =================================================
            WHITE FADE LIKE REFERENCE
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
          "
          style={{
            background: `
              linear-gradient(
                to bottom,
                rgba(255,255,255,0) 0%,
                rgba(255,255,255,0) 55%,
                rgba(255,255,255,0.12) 66%,
                rgba(255,255,255,0.48) 77%,
                rgba(255,255,255,0.82) 88%,
                rgba(255,255,255,1) 100%
              )
            `,
          }}
        />

        {/* =================================================
            TITLE
        ================================================= */}

        {resource.title && (
          <div
            className="
              absolute
              inset-x-4
              bottom-3
              z-20

              text-center
            "
          >
            <h3
              className="
                font-heading

                text-[27px]
                font-normal
                uppercase
                leading-[1.1]
                tracking-[0.06em]

                text-[#111]

                transition-transform
                duration-500

                group-hover:-translate-y-1

                lg:text-[29px]
              "
              style={{
            color: textColor}}
            >
              {resource.title}
            </h3>
          </div>
        )}
      </div>
    </Link>
  );
}

/* =========================================================
   CLIENT RESOURCES SECTION
========================================================= */

export default function ClientResourcesSection({
  section,
}: ClientResourcesSectionProps) {
  const resources =
    Array.isArray(section.resources)
      ? section.resources.filter(Boolean)
      : [];

  const backgroundColor =
    section.backgroundColor ||
    "#ffffff";
    const textColor =
    section.textColor ||
    "#222";

  if (
    !section.heading &&
    !section.eyebrow &&
    resources.length === 0
  ) {
    return null;
  }

  return (
    <section
      className="
        relative
        overflow-hidden

        py-[75px]

        md:py-[90px]

        lg:py-[105px]
      "
      style={{
        backgroundColor,
      }}
    >
      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div
        className="
          mx-auto
          max-w-[850px]

          px-5
          text-center

          sm:px-8
        "
      >
        {section.eyebrow && (
          <p
            className="
              mb-4

              font-body
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.30em]

              text-black/50
            "
          >
            {section.eyebrow}
          </p>
        )}

        {section.heading && (
          <h2
            className="
              font-heading

              text-[38px]
              font-normal
              uppercase
              leading-none
              tracking-[0.07em]

              text-[#111]

              sm:text-[42px]

              lg:text-[44px]
            "
          >
            {section.heading}
          </h2>
        )}

        {section.clientResourcesDescription  && (
          <p
            className="
              mx-auto
              mt-5
              max-w-[670px]

              font-body
              text-[13px]
              leading-[1.8]

              text-black/60

              md:text-[14px]
            "
          >
            {section.clientResourcesDescription }
          </p>
        )}
      </div>

      {/* =================================================
          RESOURCES GRID
      ================================================= */}

      {resources.length > 0 && (
        <div
          className="
            mx-auto

            mt-[65px]
            max-w-[1320px]

            px-5

            sm:px-8

            lg:px-0
          "
        >
          <div
            className="
              grid
              grid-cols-1

              gap-5

              md:grid-cols-3
              md:gap-4
            "
          >
            {resources.map(
              (resource, index) => (
                <ResourceCard
                  key={`${resource.title}-${index}`}
                  resource={resource}
                  textColor={textColor}
                />
              )
            )}
          </div>
        </div>
      )}
    </section>
  );
}