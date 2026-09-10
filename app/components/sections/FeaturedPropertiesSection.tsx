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

import ActionButton from "@/app/components/common/ActionButton";

/* =========================================================
   PROPS
========================================================= */

type FeaturedPropertiesSectionProps = {
  section: FeaturedPropertiesLayout;
};

/* =========================================================
   TYPES
========================================================= */

type PropertiesDisplayType =
  | "slider"
  | "grid";

type PropertiesListingStatus =
  | ListingStatus
  | "all";

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
   NORMALIZE DISPLAY TYPE
========================================================= */

function getDisplayType(
  value:
    | string
    | string[]
    | null
    | undefined
): PropertiesDisplayType {
  const option =
    getOption(
      value,
      "slider"
    );

  if (option === "grid") {
    return "grid";
  }

  return "slider";
}

/* =========================================================
   NORMALIZE LISTING STATUS
========================================================= */

function getListingStatus(
  value:
    | string
    | string[]
    | null
    | undefined
): PropertiesListingStatus {
  const option =
    getOption(
      value,
      "all"
    );

  if (
    option === "for_sale"
  ) {
    return "for_sale";
  }

  if (option === "sold") {
    return "sold";
  }

  return "all";
}

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
   PROPERTY SLIDER
========================================================= */

function PropertySlider({
  items,
}: {
  items: Listing[];
}) {
  const swiperRef =
    useRef<SwiperType | null>(
      null
    );

  if (!items.length) {
    return (
      <EmptyProperties />
    );
  }

  return (
    <div
      className="
        relative

        mx-auto
        w-full
        max-w-[1640px]

        px-[70px]

        md:px-[85px]

        lg:px-[95px]
      "
    >
      <Swiper
        onSwiper={(swiper) => {
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
        {items.map(
          (listing) => (
            <SwiperSlide
              key={listing.id}
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

      {/* PREVIOUS */}

      {items.length > 1 && (
        <button
          type="button"
          aria-label="Previous property"
          onClick={() =>
            swiperRef.current
              ?.slidePrev()
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
      )}

      {/* NEXT */}

      {items.length > 1 && (
        <button
          type="button"
          aria-label="Next property"
          onClick={() =>
            swiperRef.current
              ?.slideNext()
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
      )}
    </div>
  );
}

/* =========================================================
   PROPERTY GRID
========================================================= */

function PropertyGrid({
  items,
}: {
  items: Listing[];
}) {
  if (!items.length) {
    return (
      <EmptyProperties />
    );
  }

  return (
    <div
      className="
        mx-auto
        grid
        w-full
        max-w-[1450px]

        grid-cols-1
        gap-x-5
        gap-y-12

        px-5

        sm:grid-cols-2
        sm:px-8

        lg:grid-cols-3
        lg:px-10
      "
    >
      {items.map(
        (listing) => (
          <PropertyCard
            key={listing.id}
            listing={
              listing
            }
          />
        )
      )}
    </div>
  );
}

/* =========================================================
   EMPTY
========================================================= */

function EmptyProperties() {
  return (
    <div
      className="
        mx-auto
        max-w-[1400px]

        px-5
        py-16

        text-center

        font-body
        text-[14px]

        text-black/50
      "
    >
      No properties available.
    </div>
  );
}

/* =========================================================
   PAGINATION
========================================================= */

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;

  onPageChange: (
    page: number
  ) => void;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages =
    Array.from(
      {
        length:
          totalPages,
      },
      (_, index) =>
        index + 1
    );

  return (
    <div
      className="
        mt-12

        flex
        flex-wrap
        items-center
        justify-center
        gap-2

        px-5
      "
    >
      {/* PREVIOUS */}

      <button
        type="button"
        aria-label="Previous page"
        disabled={
          currentPage <= 1
        }
        onClick={() =>
          onPageChange(
            currentPage - 1
          )
        }
        className="
          flex
          h-[44px]
          w-[44px]
          items-center
          justify-center

          border
          border-black/25

          text-black

          transition-all
          duration-300

          hover:border-black
          hover:bg-black
          hover:text-white

          disabled:cursor-not-allowed
          disabled:opacity-25
          disabled:hover:bg-transparent
          disabled:hover:text-black
        "
      >
        <ChevronLeft
          size={18}
          strokeWidth={1.4}
        />
      </button>

      {/* PAGE NUMBERS */}

      {pages.map(
        (page) => (
          <button
            type="button"
            key={page}
            onClick={() =>
              onPageChange(
                page
              )
            }
            className={`
              flex
              h-[44px]
              min-w-[44px]
              items-center
              justify-center

              border
              px-3

              font-body
              text-[12px]

              transition-all
              duration-300

              ${
                currentPage ===
                page
                  ? `
                    border-black
                    bg-black
                    text-white
                  `
                  : `
                    border-black/25
                    text-black

                    hover:border-black
                    hover:bg-black
                    hover:text-white
                  `
              }
            `}
          >
            {page}
          </button>
        )
      )}

      {/* NEXT */}

      <button
        type="button"
        aria-label="Next page"
        disabled={
          currentPage >=
          totalPages
        }
        onClick={() =>
          onPageChange(
            currentPage + 1
          )
        }
        className="
          flex
          h-[44px]
          w-[44px]
          items-center
          justify-center

          border
          border-black/25

          text-black

          transition-all
          duration-300

          hover:border-black
          hover:bg-black
          hover:text-white

          disabled:cursor-not-allowed
          disabled:opacity-25
          disabled:hover:bg-transparent
          disabled:hover:text-black
        "
      >
        <ChevronRight
          size={18}
          strokeWidth={1.4}
        />
      </button>
    </div>
  );
}

/* =========================================================
   SUBSECTION HEADING
========================================================= */

function ListingGroupHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        mx-auto
        mb-10
        max-w-[1450px]

        px-5

        text-center

        sm:px-8

        lg:px-10
      "
    >
      <h3
        className="
          font-heading

          text-[34px]
          font-normal
          uppercase
          leading-none
          tracking-[0.055em]

          sm:text-[39px]

          lg:text-[42px]
        "
      >
        {children}
      </h3>
    </div>
  );
}

/* =========================================================
   LISTING GROUP
========================================================= */

function ListingGroup({
  items,
  displayType,
  numberToShow,

  showPagination = false,
  currentPage = 1,
  onPageChange,

  heading,
}: {
  items: Listing[];

  displayType:
    PropertiesDisplayType;

  numberToShow: number;

  showPagination?: boolean;

  currentPage?: number;

  onPageChange?: (
    page: number
  ) => void;

  heading?: string | null;
}) {
  /* =======================================================
     SLIDER
  ======================================================= */

  if (
    displayType ===
    "slider"
  ) {
    const sliderItems =
      items.slice(
        0,
        numberToShow
      );

    return (
      <div>
        {heading && (
          <ListingGroupHeading>
            {heading}
          </ListingGroupHeading>
        )}

        <PropertySlider
          items={
            sliderItems
          }
        />
      </div>
    );
  }

  /* =======================================================
     GRID WITHOUT PAGINATION
  ======================================================= */

  if (!showPagination) {
    const gridItems =
      items.slice(
        0,
        numberToShow
      );

    return (
      <div>
        {heading && (
          <ListingGroupHeading>
            {heading}
          </ListingGroupHeading>
        )}

        <PropertyGrid
          items={
            gridItems
          }
        />
      </div>
    );
  }

  /* =======================================================
     GRID WITH PAGINATION
  ======================================================= */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        items.length /
          numberToShow
      )
    );

  const safePage =
    Math.min(
      Math.max(
        currentPage,
        1
      ),
      totalPages
    );

  const start =
    (safePage - 1) *
    numberToShow;

  const paginatedItems =
    items.slice(
      start,
      start +
        numberToShow
    );

  return (
    <div>
      {heading && (
        <ListingGroupHeading>
          {heading}
        </ListingGroupHeading>
      )}

      <PropertyGrid
        items={
          paginatedItems
        }
      />

      {items.length > 0 && (
        <Pagination
          currentPage={
            safePage
          }
          totalPages={
            totalPages
          }
          onPageChange={(
            page
          ) => {
            onPageChange?.(
              page
            );

            /*
             * Scroll user back
             * toward this section.
             */

            window.requestAnimationFrame(
              () => {
                window.scrollBy({
                  top: -250,
                  behavior:
                    "smooth",
                });
              }
            );
          }}
        />
      )}
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function FeaturedPropertiesSection({
  section,
}: FeaturedPropertiesSectionProps) {
  /* =======================================================
     TABS
  ======================================================= */

  const [
    activeTab,
    setActiveTab,
  ] =
    useState<ListingStatus>(
      "for_sale"
    );

  /* =======================================================
     SEPARATE PAGINATION FOR EACH STATUS
  ======================================================= */

  const [
    forSalePage,
    setForSalePage,
  ] =
    useState(1);

  const [
    soldPage,
    setSoldPage,
  ] =
    useState(1);

  /* =======================================================
     SETTINGS
  ======================================================= */

  const displayType =
    getDisplayType(
      section
        .propertiesDisplayType
    );

  const showTabs =
    Boolean(
      section.showTabs
    );

  const listingStatus =
    getListingStatus(
      section.listingStatus
    );

  /*
   * Pagination is intentionally
   * only used when:
   *
   * Grid
   * AND
   * Tabs are disabled.
   */

  const showPagination =
    displayType === "grid" &&
    !showTabs &&
    Boolean(
      section.showPagination
    );

  /* =======================================================
     LABELS
  ======================================================= */

  const forSaleLabel =
    section.forSaleTabLabel ||
    "For Sale";

  const soldLabel =
    section.soldTabLabel ||
    "Sold";

  /* =======================================================
     NUMBER TO SHOW
  ======================================================= */

  const numberToShow =
    section.numberToShow &&
    section.numberToShow > 0
      ? section.numberToShow
      : 12;

  /* =======================================================
     LISTINGS BY STATUS
  ======================================================= */

  const forSaleListings =
    useMemo(
      () =>
        listings.filter(
          (listing) =>
            listing.status ===
            "for_sale"
        ),
      []
    );

  const soldListings =
    useMemo(
      () =>
        listings.filter(
          (listing) =>
            listing.status ===
            "sold"
        ),
      []
    );

  /* =======================================================
     ACTIVE TAB ITEMS
  ======================================================= */

  const activeTabListings =
    activeTab ===
    "sold"
      ? soldListings
      : forSaleListings;

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
        section
          .isContactButton
      ) ||
      Boolean(
        section.buttonLink
      )
    );

  /* =======================================================
     CHANGE TAB
  ======================================================= */

  function changeTab(
    tab: ListingStatus
  ) {
    setActiveTab(tab);
  }

  /* =======================================================
     RENDER
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
          MAIN HEADING
      ================================================= */}

      <div
        className="
          mx-auto
          max-w-[900px]

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

        {showTabs && (
          <div
            className="
              mt-9

              flex
              items-start
              justify-center
            "
          >
            {/* FOR SALE */}

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

            {/* DIVIDER */}

            <span
              className="
                mt-[1px]

                h-[29px]
                w-px

                bg-black/15
              "
            />

            {/* SOLD */}

            <button
              type="button"
              onClick={() =>
                changeTab(
                  "sold"
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
        )}
      </div>

      {/* =================================================
          SHOW TABS = YES

          Tab controls current status.
          listingStatus setting is ignored.
      ================================================= */}

      {showTabs && (
        <div className="mt-[48px]">
          <ListingGroup
            key={activeTab}
            items={
              activeTabListings
            }
            displayType={
              displayType
            }
            numberToShow={
              numberToShow
            }
          />
        </div>
      )}

      {/* =================================================
          SHOW TABS = NO
          STATUS = FOR SALE
      ================================================= */}

      {!showTabs &&
        listingStatus ===
          "for_sale" && (
          <div className="mt-[48px]">
            <ListingGroup
              items={
                forSaleListings
              }
              displayType={
                displayType
              }
              numberToShow={
                numberToShow
              }
              showPagination={
                showPagination
              }
              currentPage={
                forSalePage
              }
              onPageChange={
                setForSalePage
              }
            />
          </div>
        )}

      {/* =================================================
          SHOW TABS = NO
          STATUS = SOLD
      ================================================= */}

      {!showTabs &&
        listingStatus ===
          "sold" && (
          <div className="mt-[48px]">
            <ListingGroup
              items={
                soldListings
              }
              displayType={
                displayType
              }
              numberToShow={
                numberToShow
              }
              showPagination={
                showPagination
              }
              currentPage={
                soldPage
              }
              onPageChange={
                setSoldPage
              }
            />
          </div>
        )}

      {/* =================================================
          SHOW TABS = NO
          STATUS = ALL

          FOR SALE heading
          For Sale listings

          SOLD heading
          Sold listings
      ================================================= */}

      {!showTabs &&
        listingStatus ===
          "all" && (
          <div className="mt-[55px]">
            {/* ===========================================
                FOR SALE GROUP
            =========================================== */}

            <ListingGroup
              items={
                forSaleListings
              }
              displayType={
                displayType
              }
              numberToShow={
                numberToShow
              }
              showPagination={
                showPagination
              }
              currentPage={
                forSalePage
              }
              onPageChange={
                setForSalePage
              }
              heading={
                forSaleLabel
              }
            />

            {/* ===========================================
                SOLD GROUP
            =========================================== */}

            <div
              className="
                mt-[90px]

                md:mt-[110px]

                lg:mt-[130px]
              "
            >
              <ListingGroup
                items={
                  soldListings
                }
                displayType={
                  displayType
                }
                numberToShow={
                  numberToShow
                }
                showPagination={
                  showPagination
                }
                currentPage={
                  soldPage
                }
                onPageChange={
                  setSoldPage
                }
                heading={
                  soldLabel
                }
              />
            </div>
          </div>
        )}

      {/* =================================================
          SECTION CTA
      ================================================= */}

      {hasButton && (
        <div
          className="
            mt-[65px]

            flex
            justify-center

            px-5
          "
        >
          <ActionButton
            button={section}
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
            {section.buttonLabel}
          </ActionButton>
        </div>
      )}
    </section>
  );
}