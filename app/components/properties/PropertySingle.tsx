"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Bath,
  BedDouble,
  MapPin,
  Maximize2,
  Tag,
} from "lucide-react";

import {
  listings,
  type Listing,
} from "@/app/data/listings";

import ActionButton from "@/app/components/common/ActionButton";

/* =========================================================
   PROPS
========================================================= */

type PropertySingleProps = {
  listing: Listing;

  /*
   * Optional because the component can
   * automatically generate related properties.
   */
  relatedListings?: Listing[];
};

/* =========================================================
   GET RELATED PROPERTIES
========================================================= */

function getRelatedProperties(
  currentListing: Listing,
  limit = 3
): Listing[] {
  /*
   * First priority:
   * same listing status.
   */

  const sameStatus =
    listings.filter(
      (item) =>
        item.id !==
          currentListing.id &&
        item.status ===
          currentListing.status
    );

  /*
   * Second priority:
   * other statuses.
   */

  const otherStatus =
    listings.filter(
      (item) =>
        item.id !==
          currentListing.id &&
        item.status !==
          currentListing.status
    );

  return [
    ...sameStatus,
    ...otherStatus,
  ].slice(0, limit);
}

/* =========================================================
   DETAIL ITEM
========================================================= */

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        min-h-[125px]
        flex-col
        items-center
        justify-center

        border-b
        border-black/10

        px-5
        py-6

        text-center

        sm:border-b-0
        sm:border-r
        sm:last:border-r-0
      "
    >
      <div className="text-[#b89a55]">
        {icon}
      </div>

      <div
        className="
          mt-3

          font-heading
          text-[23px]
          font-medium
          leading-tight

          text-[#111]
        "
      >
        {value}
      </div>

      <div
        className="
          mt-2

          font-body
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.18em]

          text-black/45
        "
      >
        {label}
      </div>
    </div>
  );
}

/* =========================================================
   RELATED PROPERTY CARD
========================================================= */

function RelatedPropertyCard({
  listing,
}: {
  listing: Listing;
}) {
  const statusLabel =
    listing.status === "sold"
      ? "Sold"
      : "For Sale";

  return (
    <Link
      href={listing.url}
      className="
        group
        block
      "
    >
      {/* IMAGE */}

      <div
        className="
          relative
          aspect-[1.62/1]
          overflow-hidden
          bg-[#eee]
        "
      >
        <Image
          src={listing.image}
          alt={
            listing.title ||
            listing.address
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

            group-hover:scale-[1.04]
          "
        />

        {/* STATUS */}

        <div
          className="
            absolute
            right-3
            top-3
            z-10

            bg-white
            px-3
            py-1

            font-body
            text-[10px]
            font-medium

            text-black
          "
        >
          {statusLabel}
        </div>
      </div>

      {/* CONTENT */}

      <div className="pt-5">
        {/* PRICE */}

        <h3
          className="
            font-body
            text-[15px]
            font-bold
            uppercase
            leading-[1.3]

            text-[#111]

            lg:text-[16px]
          "
        >
          {listing.price}
        </h3>

        {/* ADDRESS */}

        <p
          className="
            mt-2

            font-body
            text-[13px]
            font-medium
            leading-[1.5]

            text-[#111]

            md:text-[14px]
          "
        >
          {listing.address}
        </p>

        {/* DETAILS */}

        {(listing.beds != null ||
          listing.baths != null ||
          listing.sqft) && (
          <p
            className="
              mt-2

              font-body
              text-[12px]
              uppercase
              leading-[1.5]

              text-black/60
            "
          >
            {listing.beds != null && (
              <>
                {listing.beds} Beds
              </>
            )}

            {listing.beds != null &&
              listing.baths != null && (
                <span>
                  {" | "}
                </span>
              )}

            {listing.baths != null && (
              <>
                {listing.baths} Baths
              </>
            )}

            {(listing.beds != null ||
              listing.baths != null) &&
              listing.sqft && (
                <span>
                  {" | "}
                </span>
              )}

            {listing.sqft && (
              <>
                {listing.sqft} Sq.Ft.
              </>
            )}
          </p>
        )}
      </div>
    </Link>
  );
}

/* =========================================================
   PROPERTY SINGLE
========================================================= */

export default function PropertySingle({
  listing,
  relatedListings,
}: PropertySingleProps) {
  const statusLabel =
    listing.status === "sold"
      ? "Sold"
      : "For Sale";

  /* =======================================================
     SAFE RELATED PROPERTIES

     If relatedListings is passed from page.tsx,
     use it.

     Otherwise automatically generate 3 properties.
  ======================================================= */

  const safeRelatedListings =
    relatedListings ??
    getRelatedProperties(
      listing,
      3
    );

  return (
    <>
      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="
          relative
          min-h-[620px]
          w-full
          overflow-hidden

          border-b-[5px]
          border-[#b89a55]

          md:min-h-[700px]

          lg:min-h-[780px]
        "
      >
        {/* HERO IMAGE */}

        <Image
          src={listing.image}
          alt={
            listing.title ||
            listing.address
          }
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            object-center
          "
        />

        {/* DARK OVERLAY */}

        <div
          className="
            absolute
            inset-0

            bg-black/40
          "
        />

        {/* BOTTOM GRADIENT */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-b
            from-black/10
            via-black/10
            to-black/75
          "
        />

        {/* HERO CONTENT */}

        <div
          className="
            relative
            z-10

            mx-auto
            flex
            min-h-[620px]
            w-full
            max-w-[1500px]

            items-end

            px-5
            pb-[70px]

            text-white

            sm:px-8

            md:min-h-[700px]
            md:pb-[85px]

            lg:min-h-[780px]
            lg:px-12
            lg:pb-[100px]
          "
        >
          <div
            className="
              flex
              w-full
              flex-col
              gap-8

              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            {/* LEFT */}

            <div
              className="
                max-w-[950px]
              "
            >
              {/* STATUS */}

              <div
                className="
                  mb-5

                  inline-flex
                  min-h-[34px]
                  items-center

                  bg-white

                  px-4

                  font-body
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]

                  text-black
                "
              >
                {statusLabel}
              </div>

              {/* TITLE */}

              <h1
                className="
                  font-heading

                  text-[44px]
                  font-light
                  leading-[0.98]
                  tracking-[-0.02em]

                  sm:text-[54px]

                  md:text-[64px]

                  lg:text-[74px]
                "
              >
                {listing.title}
              </h1>

              {/* ADDRESS */}

              <div
                className="
                  mt-6

                  flex
                  items-start
                  gap-3

                  font-body
                  text-[13px]
                  leading-[1.6]

                  text-white/85

                  md:text-[15px]
                "
              >
                <MapPin
                  size={18}
                  strokeWidth={1.4}
                  className="
                    mt-[2px]
                    shrink-0
                  "
                />

                <span>
                  {listing.address}
                </span>
              </div>
            </div>

            {/* PRICE */}

            <div
              className="
                shrink-0

                lg:max-w-[340px]
                lg:text-right
              "
            >
              <p
                className="
                  mb-2

                  font-body
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]

                  text-white/60
                "
              >
                Price
              </p>

              <div
                className="
                  font-heading

                  text-[32px]
                  font-medium
                  leading-tight

                  sm:text-[38px]

                  lg:text-[42px]
                "
              >
                {listing.price}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          PROPERTY DETAILS
      ================================================= */}

      <section
        className="
          relative
          bg-white
        "
      >
        <div
          className="
            mx-auto
            max-w-[1450px]

            px-5

            sm:px-8

            lg:px-10
          "
        >
          <div
            className="
              grid
              grid-cols-1

              border-b
              border-black/10

              sm:grid-cols-2

              lg:grid-cols-4
            "
          >
            {/* STATUS */}

            <DetailItem
              icon={
                <Tag
                  size={22}
                  strokeWidth={1.3}
                />
              }
              label="Status"
              value={statusLabel}
            />

            {/* BEDS */}

            {listing.beds != null && (
              <DetailItem
                icon={
                  <BedDouble
                    size={22}
                    strokeWidth={1.3}
                  />
                }
                label="Beds"
                value={String(
                  listing.beds
                )}
              />
            )}

            {/* BATHS */}

            {listing.baths != null && (
              <DetailItem
                icon={
                  <Bath
                    size={22}
                    strokeWidth={1.3}
                  />
                }
                label="Baths"
                value={String(
                  listing.baths
                )}
              />
            )}

            {/* SQFT */}

            {listing.sqft && (
              <DetailItem
                icon={
                  <Maximize2
                    size={22}
                    strokeWidth={1.3}
                  />
                }
                label="Sq. Ft."
                value={
                  listing.sqft
                }
              />
            )}
          </div>
        </div>
      </section>

      {/* =================================================
          PROPERTY INFORMATION
      ================================================= */}

      <section
        className="
          bg-white

          px-5
          py-[80px]

          sm:px-8

          md:py-[100px]

          lg:px-10
          lg:py-[120px]
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1450px]
            grid-cols-1
            gap-14

            lg:grid-cols-[1fr_380px]
            lg:gap-[100px]
          "
        >
          {/* LEFT CONTENT */}

          <div>
            <p
              className="
                font-body
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.28em]

                text-[#b89a55]
              "
            >
              Property Details
            </p>

            <h2
              className="
                mt-4
                max-w-[800px]

                font-heading
                text-[42px]
                font-light
                leading-[1.05]

                md:text-[52px]
              "
            >
              {listing.title}
            </h2>

            <div
              className="
                mt-7
                max-w-[800px]

                font-body
                text-[14px]
                leading-[1.9]

                text-black/70

                md:text-[15px]
              "
            >
              <p>
                This property is
                located at{" "}
                <strong>
                  {
                    listing.address
                  }
                </strong>
                .
              </p>

              <p className="mt-5">
                Current listing status
                is{" "}
                <strong>
                  {statusLabel}
                </strong>
                , with a listed price
                of{" "}
                <strong>
                  {listing.price}
                </strong>
                .
              </p>

              {listing.sqft && (
                <p className="mt-5">
                  The property includes
                  approximately{" "}
                  <strong>
                    {
                      listing.sqft
                    }{" "}
                    square feet
                  </strong>
                  .
                </p>
              )}
            </div>
          </div>

          {/* =================================================
              CONTACT CARD
          ================================================= */}

          <aside>
            <div
              className="
                sticky
                top-[120px]

                bg-[#222]

                p-8

                text-white

                md:p-10
              "
            >
              <p
                className="
                  font-body
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]

                  text-[#b89a55]
                "
              >
                Interested In This
                Property?
              </p>

              <h3
                className="
                  mt-4

                  font-heading
                  text-[34px]
                  font-light
                  leading-[1.1]

                  md:text-[38px]
                "
              >
                Request More
                Information
              </h3>

              <p
                className="
                  mt-5

                  font-body
                  text-[13px]
                  leading-[1.8]

                  text-white/70
                "
              >
                Contact Lou Rosas for
                more information about
                this property.
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
                  min-h-[54px]
                  w-full

                  items-center
                  justify-center

                  bg-[#b89a55]

                  px-7

                  font-body
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]

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
          </aside>
        </div>
      </section>

      {/* =================================================
          RELATED PROPERTIES
      ================================================= */}

      {safeRelatedListings.length >
        0 && (
        <section
          className="
            bg-[#f7f7f5]

            px-5
            py-[85px]
 border-b-[5px]
          border-[#b89a55]
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
            {/* HEADING */}

            <div
              className="
                mb-12
                text-center

                md:mb-14
              "
            >
              <p
                className="
                  mb-4

                  font-body
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]

                  text-[#b89a55]
                "
              >
                Explore More
              </p>

              <h2
                className="
                  font-heading

                  text-[40px]
                  font-light
                  uppercase
                  leading-none
                  tracking-[0.03em]

                  sm:text-[46px]

                  lg:text-[52px]
                "
              >
                Related Properties
              </h2>
            </div>

            {/* PROPERTY GRID */}

            <div
              className="
                grid
                grid-cols-1

                gap-x-6
                gap-y-12

                md:grid-cols-2

                lg:grid-cols-3
              "
            >
              {safeRelatedListings.map(
                (property) => (
                  <RelatedPropertyCard
                    key={
                      property.id
                    }
                    listing={
                      property
                    }
                  />
                )
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}