import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import type {
  Area,
} from "@/app/lib/wordpress/grapgql/areas";

import type {
  AreasLayout,
} from "@/app/lib/wordpress/grapgql/page";

type AreasSectionProps = {
  section: AreasLayout;

  /**
   * All Area CPT posts.
   */
  areas: Area[];

  /**
   * IDs selected in the ACF Relationship field.
   * Used for home_grid.
   */
  selectedAreaIds?: number[];
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
   AREA CARD
========================================================= */

function AreaCard({
  area,
  variant = "small",
}: {
  area: Area;

  variant?:
    | "big"
    | "small"
    | "equal";
}) {
  const imageUrl =
    area.featuredImage?.node
      ?.sourceUrl || null;

  const imageAlt =
    area.featuredImage?.node
      ?.altText ||
    area.title;

  const isBig =
    variant === "big";

  const isEqual =
    variant === "equal";

  return (
    <Link
      href={area.uri}
      className={`
        group
        relative
        block
        w-full
        overflow-hidden
        bg-[#333]

        ${
          isEqual
            ? `
              aspect-[4/5]
            `
            : `
              min-h-[370px]

              md:min-h-[420px]

              lg:min-h-[460px]
            `
        }
      `}
    >
      {/* IMAGE */}

      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes={
            isBig
              ? `
                (max-width: 1024px)
                100vw,
                50vw
              `
              : `
                (max-width: 768px)
                100vw,
                (max-width: 1024px)
                50vw,
                25vw
              `
          }
          className="
            object-cover
            object-center

            transition-transform
            duration-[900ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]

            group-hover:scale-[1.055]
          "
        />
      ) : (
        <div
          className="
            absolute
            inset-0
            bg-[#555]
          "
        />
      )}

      {/* DARK IMAGE OVERLAY */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-t
          from-black/70
          via-black/10
          to-black/5

          transition-all
          duration-700

          group-hover:from-black/80
        "
      />

      {/* SUBTLE BORDER */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0

          border
          border-white/10

          transition-colors
          duration-500

          group-hover:border-white/30
        "
      />

      {/* CONTENT */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-10

          flex
          items-end
          justify-between

          p-7

          sm:p-8

          lg:p-9
        "
      >
        <div>
          <div
            className="
              mb-3

              font-body
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.26em]

              text-white/65

              transition-transform
              duration-500

              group-hover:-translate-y-1
            "
          >
            Explore Area
          </div>

          <h3
            className={`
              font-heading
              font-light
              leading-none
              tracking-[-0.02em]
              text-white

              transition-transform
              duration-500

              group-hover:-translate-y-1

              ${
                isBig
                  ? `
                    text-[38px]
                    sm:text-[44px]
                    lg:text-[50px]
                  `
                  : `
                    text-[32px]
                    sm:text-[36px]
                    lg:text-[39px]
                  `
              }
            `}
          >
            {area.title}
          </h3>
        </div>

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center

            border
            border-white/50

            text-white

            transition-all
            duration-500

            group-hover:border-white
            group-hover:bg-white
            group-hover:text-black
          "
        >
          <ArrowUpRight
            size={17}
            strokeWidth={1.2}
          />
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   HOME GRID
========================================================= */

function HomeAreasGrid({
  areas,
}: {
  areas: Area[];
}) {
  const items =
    areas.slice(0, 6);

  if (!items.length) {
    return null;
  }

  /*
   * DESKTOP:
   *
   * BIG   BIG   SMALL SMALL
   * SMALL SMALL  BIG   BIG
   */

  const desktopClasses = [
    "lg:col-span-2",
    "lg:col-span-1",
    "lg:col-span-1",

    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-2",
  ];

  return (
    <div
      className="
        grid
        grid-cols-1

        md:grid-cols-2

        lg:grid-cols-4
        max-w-[1400px]
        mx-auto
        gap-6
      "
    >
      {items.map(
        (area, index) => {
          const isBig =
            index === 0 ||
            index === 5;

          return (
            <div
              key={area.id}
              className={`
                ${desktopClasses[index]}
              `}
            >
              <AreaCard
                area={area}
                variant={
                  isBig
                    ? "big"
                    : "small"
                }
              />
            </div>
          );
        }
      )}
    </div>
  );
}

/* =========================================================
   ALL AREAS GRID
========================================================= */

function AllAreasGrid({
  areas,
}: {
  areas: Area[];
}) {
  if (!areas.length) {
    return null;
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-[1px]

        bg-black/10

        sm:grid-cols-2

        lg:grid-cols-4
        max-w-[1400px]
        mx-auto
        gap-6
      "
    >
      {areas.map(
        (area) => (
          <AreaCard
            key={area.id}
            area={area}
            variant="equal"
          />
        )
      )}
    </div>
  );
}

/* =========================================================
   AREAS SECTION
========================================================= */

export default function AreasSection({
 section,
  areas = [],
  selectedAreaIds = [],
}: AreasSectionProps) {
  const layout =
     getOption(
    section.areasLayout,
    "home_grid"
  );

  const isAllGrid =
    layout === "all_grid";

  const backgroundColor =
    section.backgroundColor ||
    "#ffffff";

  const textColor =
    section.textColor ||
    "#111111";

  /* =======================================================
     HOME SELECTED AREAS
  ======================================================= */

  let displayAreas = areas;

  if (
    !isAllGrid &&
    selectedAreaIds.length
  ) {
    /*
     * Preserve the exact Relationship-field order.
     */

    displayAreas =
      selectedAreaIds
        .map((databaseId) =>
          areas.find(
            (area) =>
              area.databaseId ===
              databaseId
          )
        )
        .filter(
          (
            area
          ): area is Area =>
            Boolean(area)
        );
  }

  if (!isAllGrid) {
    displayAreas =
      displayAreas.slice(0, 6);
  }

  const hasButton =
    Boolean(section.buttonText) &&
    Boolean(section.buttonLink);
console.log(areas)
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
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          mx-auto
          max-w-[1440px]

          px-5
          py-[80px]

          sm:px-8
          sm:py-[95px]

          md:py-[110px]

          lg:px-12
          lg:py-[125px]
        "
      >
        <div
          className="
            mx-auto
            max-w-[800px]
            text-center
          "
        >
          {section.eyebrow && (
            <p
              className="
                mb-5

                font-body
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.32em]

                opacity-55

                md:text-[10px]
              "
            >
              {section.eyebrow}
            </p>
          )}

          {section.heading && (
            <h2
              className="
                font-heading
                text-[44px]
                font-light
                leading-none
                tracking-[-0.025em]

                sm:text-[52px]

                md:text-[60px]

                lg:text-[66px]
              "
            >
              {section.heading}
            </h2>
          )}

          {section.description && (
  <p
    className="
      mx-auto
      mt-6
      max-w-[680px]
      font-body
      text-[13px]
      leading-[1.8]
      opacity-70
      md:text-[15px]
    "
  >
    {section.description}
  </p>
)}
        </div>
      </div>

      {/* =================================================
          GRID
      ================================================= */}

      {isAllGrid ? (
        <AllAreasGrid
          areas={displayAreas}
        />
      ) : (
        <HomeAreasGrid
          areas={displayAreas}
        />
      )}

      {/* =================================================
          VIEW ALL BUTTON
      ================================================= */}

      {hasButton && (
        <div
          className="
            flex
            justify-center

            px-5
            py-[65px]

            md:py-[80px]
          "
        >
          <Link
            href={
              section.buttonLink!
            }
            className="
              group
              inline-flex
              min-h-[55px]
              min-w-[190px]

              items-center
              justify-center
              gap-3

              bg-[#b89a55]
              px-8

              font-body
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]

              text-white

              transition-colors
              duration-300

              hover:bg-[#222]
            "
          >
            <span>
              {section.buttonText}
            </span>

            <ArrowRight
              size={14}
              strokeWidth={1.3}

              className="
                transition-transform
                duration-300

                group-hover:translate-x-1
              "
            />
          </Link>
        </div>
      )}
    </section>
  );
}