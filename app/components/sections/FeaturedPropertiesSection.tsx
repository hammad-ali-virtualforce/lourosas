"use client";

import {
  useMemo,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import type {
  Swiper as SwiperType,
} from "swiper";

import "swiper/css";

import type {
  FeaturedPropertiesLayout,
} from "@/app/lib/wordpress/grapgql/pages";

import {
  listings,
  type Listing,
  type ListingStatus,
} from "@/app/data/listings";

/* =========================================================
   PROPS
========================================================= */

type FeaturedPropertiesSectionProps = {
  section: FeaturedPropertiesLayout;
};

/* =========================================================
   PROPERTY CARD
========================================================= */

function PropertyCard({
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
            text-[11px]
            font-medium

            text-black
          "
        >
          {statusLabel}
        </div>
      </div>

      {/* CONTENT */}

      <div className="pt-5">
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

        {(listing.beds ||
          listing.baths ||
          listing.sqft) && (
          <p
            className="
              mt-1

              font-body
              text-[13px]
              uppercase
              leading-[1.5]

              text-black/75

              md:text-[14px]
            "
          >
            {listing.beds && (
              <>
                {listing.beds} Beds
              </>
            )}

            {listing.beds &&
              listing.baths && (
                <span> | </span>
              )}

            {listing.baths && (
              <>
                {listing.baths} Baths
              </>
            )}

            {(listing.beds ||
              listing.baths) &&
              listing.sqft && (
                <span> | </span>
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
   MAIN COMPONENT
========================================================= */

export default function FeaturedPropertiesSection({
  section,
}: FeaturedPropertiesSectionProps) {
  const [
    activeTab,
    setActiveTab,
  ] =
    useState<ListingStatus>(
      "for_sale"
    );

  const swiperRef =
    useRef<SwiperType | null>(
      null
    );

  const forSaleLabel =
    section.forSaleTabLabel ||
    "For Sale";

  const soldLabel =
    section.soldTabLabel ||
    "Sold";

  const maxItems =
    section.numberToShow &&
    section.numberToShow > 0
      ? section.numberToShow
      : 12;

  const filteredListings =
    useMemo(() => {
      return listings
        .filter(
          (listing) =>
            listing.status ===
            activeTab
        )
        .slice(0, maxItems);
    }, [
      activeTab,
      maxItems,
    ]);

  const backgroundColor =
    section.backgroundColor ||
    "#ffffff";

  const textColor =
    section.textColor ||
    "#111111";

  const hasButton =
    Boolean(section.buttonText) &&
    Boolean(section.buttonLink);

  function changeTab(
    tab: ListingStatus
  ) {
    setActiveTab(tab);

    setTimeout(() => {
      swiperRef.current?.slideTo(
        0,
        0
      );
    }, 0);
  }

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
          HEADING
      ================================================= */}

      <div
        className="
          mx-auto
          max-w-[800px]
          px-5
          text-center
        "
      >
        {section.heading && (
          <h2
            className="
              font-heading

              text-[39px]
              font-normal
              uppercase
              leading-none
              tracking-[0.055em]

              sm:text-[43px]

              lg:text-[46px]
            "
          >
            {section.heading}
          </h2>
        )}

        {/* ===============================================
            TABS
        =============================================== */}

        <div
          className="
            mt-9
            flex
            items-start
            justify-center
          "
        >
          <button
            type="button"
            onClick={() =>
              changeTab(
                "for_sale"
              )
            }
            className={`
              relative

              min-w-[110px]
              pb-4

              font-body
              text-[14px]
              font-normal

              transition-colors
              duration-300

              ${
                activeTab ===
                "for_sale"
                  ? "text-black"
                  : "text-black/40"
              }
            `}
          >
            {forSaleLabel}

            {activeTab ===
              "for_sale" && (
              <span
                className="
                  absolute
                  bottom-0
                  left-1/2

                  h-[2px]
                  w-[35px]

                  -translate-x-1/2

                  bg-black
                "
              />
            )}
          </button>

          <span
            className="
              mt-[1px]
              h-[29px]
              w-px
              bg-black/15
            "
          />

          <button
            type="button"
            onClick={() =>
              changeTab("sold")
            }
            className={`
              relative

              min-w-[110px]
              pb-4

              font-body
              text-[14px]
              font-normal

              transition-colors
              duration-300

              ${
                activeTab ===
                "sold"
                  ? "text-black"
                  : "text-black/40"
              }
            `}
          >
            {soldLabel}

            {activeTab ===
              "sold" && (
              <span
                className="
                  absolute
                  bottom-0
                  left-1/2

                  h-[2px]
                  w-[35px]

                  -translate-x-1/2

                  bg-black
                "
              />
            )}
          </button>
        </div>
      </div>

      {/* =================================================
          SLIDER
      ================================================= */}

      <div
        className="
          relative
          mx-auto

          mt-[48px]

          max-w-[1640px]

          px-[70px]

          md:px-[85px]

          lg:px-[95px]
        "
      >
        {filteredListings.length >
        0 ? (
          <>
            <Swiper
              key={activeTab}
              onSwiper={(
                swiper
              ) => {
                swiperRef.current =
                  swiper;
              }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                650: {
                  slidesPerView: 2,
                  spaceBetween: 18,
                },

                1100: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
            >
              {filteredListings.map(
                (listing) => (
                  <SwiperSlide
                    key={
                      listing.id
                    }
                  >
                    <PropertyCard
                      listing={
                        listing
                      }
                    />
                  </SwiperSlide>
                )
              )}
            </Swiper>

            {/* =============================================
                PREVIOUS
            ============================================= */}

            <button
              type="button"
              aria-label="Previous property"
              onClick={() =>
                swiperRef.current?.slidePrev()
              }
              className="
                absolute
                left-3
                top-[33%]
                z-20

                flex
                h-[49px]
                w-[49px]

                -translate-y-1/2

                items-center
                justify-center

                border
                border-black

                bg-white
                text-black

                transition-all
                duration-300

                hover:bg-black
                hover:text-white

                md:left-4

                lg:left-5
              "
            >
              <ChevronLeft
                size={21}
                strokeWidth={1.5}
              />
            </button>

            {/* =============================================
                NEXT
            ============================================= */}

            <button
              type="button"
              aria-label="Next property"
              onClick={() =>
                swiperRef.current?.slideNext()
              }
              className="
                absolute
                right-3
                top-[33%]
                z-20

                flex
                h-[49px]
                w-[49px]

                -translate-y-1/2

                items-center
                justify-center

                border
                border-black

                bg-white
                text-black

                transition-all
                duration-300

                hover:bg-black
                hover:text-white

                md:right-4

                lg:right-5
              "
            >
              <ChevronRight
                size={21}
                strokeWidth={1.5}
              />
            </button>
          </>
        ) : (
          <div
            className="
              py-16
              text-center

              font-body
              text-sm
              text-black/50
            "
          >
            No properties available.
          </div>
        )}
      </div>

      {/* =================================================
          VIEW ALL
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
          <Link
            href={
              section.buttonLink!
            }
            className="
              inline-flex

              min-h-[58px]
              min-w-[172px]

              items-center
              justify-center

              border
              border-black

              px-8

              font-heading
              text-[13px]
              font-medium
              uppercase
              tracking-[0.12em]

              text-black

              transition-all
              duration-300

              hover:bg-black
              hover:text-white
            "
          >
            {section.buttonText}
          </Link>
        </div>
      )}
    </section>
  );
}