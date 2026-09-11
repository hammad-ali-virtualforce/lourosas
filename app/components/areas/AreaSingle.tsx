import Image from "next/image";
import Link from "next/link";

import type {
  LucideIcon,
} from "lucide-react";

import {
  Users,
  UserRound,
  MapPinned,
  CircleDollarSign,
  House,
  BadgeDollarSign,
  Ruler,
  HousePlus,
  TrendingUp,
  MapPin,
  Building2,
  Trees,
  ArrowUpRight,
} from "lucide-react";

import type {
  Area,
  AreaFact,
} from "@/app/lib/wordpress/grapgql/areas";

import type {
  FeaturedPropertiesLayout,
} from "@/app/lib/wordpress/grapgql/pages";

import FeaturedPropertiesSection from "@/app/components/sections/FeaturedPropertiesSection";

import ActionButton from "@/app/components/common/ActionButton";

/* =========================================================
   PROPS
========================================================= */

type AreaSingleProps = {
  area: Area;
};

/* =========================================================
   OPTION NORMALIZER
========================================================= */

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

  return String(
    option || ""
  )
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/-/g, "_");
}

/* =========================================================
   STAT ICONS
========================================================= */

const statIcons:
  Record<
    string,
    LucideIcon
  > = {
  population: Users,

  age: UserRound,

  density: MapPinned,

  income:
    CircleDollarSign,

  home: House,

  price:
    BadgeDollarSign,

  size: Ruler,

  households: HousePlus,

  growth: TrendingUp,

  location: MapPin,

  community: Building2,

  lifestyle: Trees,
};

/* =========================================================
   AREA FACT
========================================================= */

function AreaFactItem({
  fact,
}: {
  fact: AreaFact;
}) {
  const iconKey =
    getOption(
      fact.icon
    );

  const Icon =
    statIcons[iconKey] ||
    MapPin;

  if (
    !fact.value &&
    !fact.label
  ) {
    return null;
  }

  return (
    <div
      className="
        flex
        items-center
        gap-5

        py-5

        md:py-0
      "
    >
      {/* ICON */}

      <div
        className="
          flex
          h-[52px]
          w-[52px]
          shrink-0

          items-center
          justify-center

          rounded-full

          bg-[#b89a55]

          text-white
        "
      >
        <Icon
          size={22}
          strokeWidth={1.25}
        />
      </div>

      {/* CONTENT */}

      <div>
        {fact.value && (
          <div
            className="
              font-body

              text-[16px]
              font-medium
              uppercase

              tracking-[0.02em]

              text-[#111]
            "
          >
            {fact.value}
          </div>
        )}

        {fact.label && (
          <div
            className="
              mt-2

              font-body
              text-[9px]
              font-medium
              uppercase
              tracking-[0.14em]

              text-black/55
            "
          >
            {fact.label}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   NEARBY AREA CARD
========================================================= */

function NearbyAreaCard({
  area,
}: {
  area:
    NonNullable<
      NonNullable<
        Area["areaDetails"]
      >["nearbyAreas"]
    >["nodes"][number];
}) {
  const image =
    area.featuredImage
      ?.node;

  return (
    <Link
      href={
        area.uri ||
        `/area/${area.slug}/`
      }
      className="
        group
        relative

        block
        overflow-hidden

        bg-[#111]
      "
    >
      <div
        className="
          relative

          aspect-[1.3/1]

          overflow-hidden
        "
      >
        {image?.sourceUrl ? (
          <Image
            src={
              image.sourceUrl
            }
            alt={
              image.altText ||
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

              group-hover:scale-[1.05]
            "
          />
        ) : (
          <div
            className="
              absolute
              inset-0

              bg-[#333]
            "
          />
        )}

        {/* GRADIENT */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-b
            from-black/5
            via-black/15
            to-black/80
          "
        />

        {/* TITLE */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            z-10

            flex
            items-end
            justify-between
            gap-4

            p-7

            text-white

            lg:p-8
          "
        >
          <h3
            className="
              font-heading

              text-[31px]
              font-light
              uppercase
              leading-none

              tracking-[0.03em]

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
              border-white/50

              transition-all
              duration-300

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
      </div>
    </Link>
  );
}

/* =========================================================
   AREA SINGLE
========================================================= */

export default function AreaSingle({
  area,
}: AreaSingleProps) {
  const details =
    area.areaDetails;

  const featuredImage =
    area.featuredImage?.node;

  const facts =
    details?.areaFacts?.filter(
      (fact) =>
        Boolean(
          fact.value ||
          fact.label
        )
    ) || [];

  const nearbyAreas =
    details?.nearbyAreas
      ?.nodes || [];

  /* =======================================================
     PROPERTIES SECTION CONFIG

     For now:
     show FOR SALE properties in slider.

     Later:
     iHomefinder can filter by current area.
  ======================================================= */

  const propertySection:
    FeaturedPropertiesLayout = {
    __typename:
      "PageSectionsHeroFeaturedPropertiesLayout",

    propertiesDisplayType:
      "slider",

    showTabs: false,

    listingStatus:
      "for_sale",

    showPagination: false,

    heading:
      `Properties in ${area.title}`,

    forSaleTabLabel:
      "For Sale",

    soldTabLabel:
      "Sold",

    numberToShow: 6,

    buttonLabel:
      "View All Properties",

    buttonLink:
      "/properties/",

    isContactButton:
      false,

    contactAction:
      null,

    contactPageLink:
      null,

    backgroundColor:
      "#f7f7f5",

    textColor:
      "#111111",
  };

  return (
    <>
      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="
          relative

          flex
          min-h-[600px]

          items-end
          overflow-hidden

          border-b-[5px]
          border-[#b89a55]

          bg-[#111]

          md:min-h-[680px]

          lg:min-h-[760px]
        "
      >
        {/* IMAGE */}

        {featuredImage
          ?.sourceUrl && (
          <Image
            src={
              featuredImage.sourceUrl
            }
            alt={
              featuredImage.altText ||
              area.title
            }
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              object-center
            "
          />
        )}

        {/* OVERLAY */}

        <div
          className="
            absolute
            inset-0

            bg-black/35
          "
        />

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-b
            from-black/10
            via-black/15
            to-black/80
          "
        />

        {/* CONTENT */}

        <div
          className="
            relative
            z-10

            mx-auto
            w-full
            max-w-[1450px]

            px-5
            pb-[70px]

            text-white

            sm:px-8

            md:pb-[90px]

            lg:px-10
            lg:pb-[105px]
          "
        >
          {details
            ?.locationLabel && (
            <p
              className="
                mb-4

                font-body
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.28em]

                text-white/75

                md:text-[10px]
              "
            >
              {
                details.locationLabel
              }
            </p>
          )}

          <h1
            className="
              max-w-[1100px]

              font-heading

              text-[52px]
              font-light
              uppercase
              leading-[0.95]

              tracking-[-0.015em]

              sm:text-[62px]

              md:text-[76px]

              lg:text-[90px]
            "
          >
            {area.title}
          </h1>
        </div>
      </section>

      {/* =================================================
          OVERVIEW
      ================================================= */}

      <section
        className="
          bg-white

          px-5
          py-[85px]

          sm:px-8

          md:py-[105px]

          lg:px-10
          lg:py-[125px]
        "
      >
        <div
          className="
            mx-auto
            max-w-[1320px]
          "
        >
          {/* HEADER */}

          <div
            className="
              mx-auto
              max-w-[850px]

              text-center
            "
          >
            {details
              ?.overviewEyebrow && (
              <p
                className="
                  mb-5

                  font-body
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]

                  text-[#b89a55]
                "
              >
                {
                  details
                    .overviewEyebrow
                }
              </p>
            )}

            <h2
              className="
                font-heading

                text-[42px]
                font-light
                uppercase
                leading-none

                tracking-[0.025em]

                sm:text-[50px]

                md:text-[58px]
              "
            >
              {details
                ?.overviewHeading ||
                `Discover ${area.title}`}
            </h2>

            {details
              ?.overviewIntroContent && (
              <div
                className="
                  area-content

                  mx-auto
                  mt-7
                  max-w-[780px]

                  font-body
                  text-[14px]
                  leading-[1.9]

                  text-black/65

                  md:text-[15px]
                "
                dangerouslySetInnerHTML={{
                  __html:
                    details
                      .overviewIntroContent,
                }}
              />
            )}
          </div>

          {/* =============================================
              FACTS / STATS
          ============================================= */}

          {facts.length >
            0 && (
            <div
              className="
                mt-[65px]

                grid
                grid-cols-1

                border-y
                border-black/10

                py-5

                sm:grid-cols-2

                lg:grid-cols-4
                lg:py-9
              "
            >
              {facts.map(
                (
                  fact,
                  index
                ) => (
                  <div
                    key={`${fact.label}-${index}`}
                    className="
                      px-4

                      lg:border-r
                      lg:border-black/10
                      lg:last:border-r-0

                      xl:px-8
                    "
                  >
                    <AreaFactItem
                      fact={fact}
                    />
                  </div>
                )
              )}
            </div>
          )}

          {/* =============================================
              LARGE FEATURED IMAGE

              Same featured image as hero.
          ============================================= */}

          {featuredImage
            ?.sourceUrl && (
            <div
              className="
                relative

                mt-[75px]

                aspect-[16/7]

                min-h-[320px]

                overflow-hidden

                bg-[#ddd]
              "
            >
              <Image
                src={
                  featuredImage
                    .sourceUrl
                }
                alt={
                  featuredImage
                    .altText ||
                  area.title
                }
                fill
                sizes="100vw"
                className="
                  object-cover
                  object-center
                "
              />
            </div>
          )}

          {/* =============================================
              ADDITIONAL CONTENT
          ============================================= */}

          {details
            ?.additionalOverviewContent && (
            <div
              className="
                area-content

                mx-auto
                mt-[70px]
                max-w-[900px]

                font-body
                text-[14px]
                leading-[1.95]

                text-black/70

                md:text-[15px]
              "
              dangerouslySetInnerHTML={{
                __html:
                  details
                    .additionalOverviewContent,
              }}
            />
          )}
        </div>
      </section>

      {/* =================================================
          PROPERTIES IN AREA

          Uses existing property component.
      ================================================= */}

      <FeaturedPropertiesSection
        section={
          propertySection
        }
      />

      {/* =================================================
          NEARBY AREAS
      ================================================= */}

      {nearbyAreas.length >
        0 && (
        <section
          className="
            bg-white

            px-5
            py-[85px]

            sm:px-8

            md:py-[105px]

            lg:px-10
            lg:py-[125px]
          "
        >
          <div
            className="
              mx-auto
              max-w-[1450px]
            "
          >
            <div
              className="
                mb-[55px]
                text-center
              "
            >
              <p
                className="
                  mb-4

                  font-body
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]

                  text-[#b89a55]
                "
              >
                Explore More
              </p>

              <h2
                className="
                  font-heading

                  text-[42px]
                  font-light
                  uppercase
                  leading-none

                  tracking-[0.025em]

                  sm:text-[50px]

                  lg:text-[56px]
                "
              >
                Nearby Areas
              </h2>
            </div>

            <div
              className="
                grid
                grid-cols-1

                gap-5

                md:grid-cols-2

                lg:grid-cols-3
              "
            >
              {nearbyAreas.map(
                (
                  nearbyArea
                ) => (
                  <NearbyAreaCard
                    key={
                      nearbyArea.id
                    }
                    area={
                      nearbyArea
                    }
                  />
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* =================================================
          MAP
      ================================================= */}

      {details
        ?.googleMapEmbedUrl && (
        <section
          className="
            bg-[#f7f7f5]

            px-5
            py-[85px]

            sm:px-8

            md:py-[105px]

            lg:px-10
            lg:py-[125px]
          "
        >
          <div
            className="
              mx-auto
              max-w-[1450px]
            "
          >
            <div
              className="
                mb-[50px]
                text-center
              "
            >
              <p
                className="
                  mb-4

                  font-body
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]

                  text-[#b89a55]
                "
              >
                Location
              </p>

              <h2
                className="
                  font-heading

                  text-[42px]
                  font-light
                  uppercase
                  leading-none

                  sm:text-[50px]

                  lg:text-[56px]
                "
              >
                Explore{" "}
                {area.title}
              </h2>
            </div>

            <div
              className="
                overflow-hidden

                bg-[#ddd]

                shadow-[0_8px_35px_rgba(0,0,0,0.06)]
              "
            >
              <iframe
                src={
                  details.googleMapEmbedUrl
                }
                title={`${area.title} map`}
                width="100%"
                height="520"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="
                  block
                  w-full
                  border-0
                "
              />
            </div>
          </div>
        </section>
      )}

      {/* =================================================
          CONTACT CTA
      ================================================= */}

      <section
        className="
          bg-[#111]

          px-5
          py-[90px]

          text-center
          text-white

          sm:px-8

          md:py-[115px]
border-b-[5px]
          border-[#b89a55]
          lg:px-10
          lg:py-[130px]
        "
      >
        <div
          className="
            mx-auto
            max-w-[850px]
          "
        >
          <p
            className="
              mb-5

              font-body
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.3em]

              text-[#b89a55]
            "
          >
            Interested in{" "}
            {area.title}?
          </p>

          <h2
            className="
              font-heading

              text-[42px]
              font-light
              uppercase
              leading-[1]

              sm:text-[50px]

              md:text-[58px]
            "
          >
            Let&apos;s Talk About{" "}
            {area.title} Real Estate
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-[650px]

              font-body
              text-[13px]
              leading-[1.8]

              text-white/65

              md:text-[14px]
            "
          >
            Connect with Lou
            Rosas to learn more
            about available
            properties and real
            estate opportunities
            in {area.title}.
          </p>

          <ActionButton
            button={{
              buttonLabel:
                "Contact Lou",

              buttonLink: null,

              isContactButton:
                true,

              contactAction:
                "modal",

              contactPageLink:
                null,
            }}
            className="
              mt-8

              inline-flex
              min-h-[55px]

              items-center
              justify-center

              bg-[#b89a55]

              px-9

              font-body
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]

              text-white

              transition-all
              duration-300

              hover:bg-white
              hover:text-black
            "
          >
            Contact Lou
          </ActionButton>
        </div>
      </section>
    </>
  );
}