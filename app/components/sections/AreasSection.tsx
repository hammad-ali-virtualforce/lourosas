"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
} from "lucide-react";

import type {
  AreasLayout,
} from "@/app/lib/wordpress/grapgql/pages";

import type {
  Area,
} from "@/app/lib/wordpress/grapgql/areas";

import ActionButton from "@/app/components/common/ActionButton";

/* =========================================================
   PROPS
========================================================= */

type AreasSectionProps = {
  section: AreasLayout;
  areas?: Area[];
};

/* =========================================================
   HELPERS
========================================================= */

function getOption(
  value:
    | string
    | string[]
    | null
    | undefined,
  fallback: string
) {
  if (!value) {
    return fallback;
  }

  const option =
    Array.isArray(value)
      ? value[0]
      : value;

  if (!option) {
    return fallback;
  }

  return String(option)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/-/g, "_");
}

/* =========================================================
   GET AREA IMAGE
========================================================= */

function getAreaImage(
  area: Area
) {
  return (
    area.featuredImage?.node
      ?.sourceUrl ||
    area.featuredImage?.node
      ?.mediaItemUrl ||
    null
  );
}

/* =========================================================
   STRIP HTML
========================================================= */

function stripHtml(
  value:
    | string
    | null
    | undefined
) {
  if (!value) {
    return "";
  }

  return value
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================================================
   TRUNCATE TEXT
========================================================= */

function truncateText(
  value: string,
  maxLength = 120
) {
  if (
    value.length <=
    maxLength
  ) {
    return value;
  }

  return `${value
    .slice(0, maxLength)
    .trim()}...`;
}

/* =========================================================
   AREA CARD
========================================================= */

function AreaCard({
  area,
}: {
  area: Area;
}) {
  const imageUrl =
    getAreaImage(area);

  const description =
    truncateText(
      stripHtml(
        area.content
      ),
      125
    );

  return (
    <Link
      href={
        area.uri || "#"
      }
      className="
        group
        relative
        block
        h-full
        overflow-hidden
        bg-[#111]
      "
    >
      {/* ===============================================
          IMAGE
      =============================================== */}

      <div
        className="
          relative
          aspect-[1.25/1]
          overflow-hidden
          bg-[#222]
        "
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={
              area.featuredImage
                ?.node?.altText ||
              area.title
            }
            fill
            sizes="
              (max-width: 767px) 100vw,
              (max-width: 1100px) 50vw,
              33vw
            "
            className="
              object-cover
              object-center

              transition-transform
              duration-[900ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]

              group-hover:scale-[1.06]
            "
          />
        ) : (
          <div
            className="
              absolute
              inset-0
              bg-[#222]
            "
          />
        )}

        {/* DARK OVERLAY */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-b
            from-black/5
            via-black/15
            to-black/85
          "
        />

        {/* CARD CONTENT */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            z-10

            p-6

            text-white

            sm:p-7

            lg:p-8
          "
        >
          {/* TITLE */}

          <div
            className="
              flex
              items-end
              justify-between
              gap-5
            "
          >
            <h3
              className="
                font-heading

                text-[30px]
                font-light
                uppercase
                leading-[1.05]
                tracking-[0.025em]

                sm:text-[32px]

                lg:text-[35px]
              "
            >
              {area.title}
            </h3>

            <div
              className="
                flex
                h-[42px]
                w-[42px]
                shrink-0
                items-center
                justify-center

                border
                border-white/45

                transition-all
                duration-300

                group-hover:border-white
                group-hover:bg-white
                group-hover:text-black
              "
            >
              <ArrowUpRight
                size={17}
                strokeWidth={1.3}
              />
            </div>
          </div>

          {/* DESCRIPTION */}

          {description && (
            <p
              className="
                mt-4
                max-w-[420px]

                font-body
                text-[12px]
                leading-[1.7]

                text-white/70

                transition-colors
                duration-300

                group-hover:text-white/90
              "
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AreasSection({
  section,
  areas = [],
}: AreasSectionProps) {
  /* =======================================================
     LAYOUT

     Expected ACF choices:

     home_grid
     all_grid
  ======================================================= */

  const layout =
    getOption(
      section.areasLayout,
      "home_grid"
    );

  const isAllGrid =
    layout ===
    "all_grid";

  /* =======================================================
     NUMBER TO SHOW

     home_grid:
     respect numberToShow

     all_grid:
     display every Area CPT item
  ======================================================= */

  const numberToShow =
    Math.max(
      1,
      Number(
        section.numberToShow
      ) || 6
    );

  const visibleAreas =
    isAllGrid
      ? areas
      : areas.slice(
          0,
          numberToShow
        );

  /* =======================================================
     COLORS
  ======================================================= */

  const backgroundColor =
    section.backgroundColor ||
    "#ffffff";

  const textColor =
    section.textColor ||
    "#111111";

  /* =======================================================
     BUTTON
  ======================================================= */

  const hasButton =
    Boolean(
      section.buttonLabel
    ) &&
    (
      Boolean(
        section.isContactButton
      ) ||
      Boolean(
        section.buttonLink
      )
    );

  /* =======================================================
     EMPTY DATA

     Keep heading visible even if no Area CPT items exist,
     which makes debugging much easier.
  ======================================================= */

  return (
    <section
      className="
        relative
        overflow-hidden

        py-[85px]

        md:py-[105px]

        lg:py-[125px]
      "
      style={{
        backgroundColor,
        color: textColor,
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
        "
      >
        {/* EYEBROW */}

        {section.eyebrow && (
          <p
            className="
              mb-5

              font-body
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.3em]

              opacity-55

              md:text-[10px]
            "
          >
            {section.eyebrow}
          </p>
        )}

        {/* HEADING */}

        {section.heading && (
          <h2
            className="
              font-heading

              text-[42px]
              font-light
              uppercase
              leading-none
              tracking-[0.035em]

              sm:text-[48px]

              md:text-[54px]

              lg:text-[58px]
            "
          >
            {section.heading}
          </h2>
        )}

        {/* DESCRIPTION */}

        {section.description && (
          <p
            className="
              mx-auto
              mt-6
              max-w-[680px]

              font-body
              text-[13px]
              leading-[1.8]

              opacity-65

              md:text-[14px]
            "
          >
            {section.description}
          </p>
        )}
      </div>

      {/* =================================================
          AREA GRID
      ================================================= */}

      {visibleAreas.length > 0 ? (
        <div
          className={`
            mx-auto
            mt-[55px]
            grid
            max-w-[1450px]

            grid-cols-1
            gap-5

            px-5

            sm:px-8

            md:grid-cols-2

            lg:px-10

            ${
              isAllGrid
                ? `
                  lg:grid-cols-3
                `
                : `
                  lg:grid-cols-3
                `
            }
          `}
        >
          {visibleAreas.map(
            (area) => (
              <AreaCard
                key={area.id}
                area={area}
              />
            )
          )}
        </div>
      ) : (
        /* =================================================
           EMPTY STATE

           Don't return null here. If GraphQL/CPT data breaks,
           we can still see that the section itself is rendering.
        ================================================= */

        <div
          className="
            mx-auto
            mt-12
            max-w-[900px]

            px-5
            py-10

            text-center

            font-body
            text-[13px]

            opacity-50
          "
        >
          No areas available.
        </div>
      )}

      {/* =================================================
          SECTION CTA

          Normal Link
          OR Contact Modal
          OR Contact Page
      ================================================= */}

      {hasButton && (
        <div
          className="
            mt-[55px]

            flex
            justify-center

            px-5
          "
        >
          <ActionButton
            button={section}
            className="
              group

              inline-flex
              min-h-[55px]
              min-w-[190px]

              items-center
              justify-center
              gap-3

              border
              border-current

              px-8

              font-body
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]

              transition-all
              duration-300

              hover:bg-black
              hover:text-white
            "
          >
            <span>
              {section.buttonLabel}
            </span>

            <ArrowUpRight
              size={14}
              strokeWidth={1.4}
              className="
                transition-transform
                duration-300

                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </ActionButton>
        </div>
      )}
    </section>
  );
}