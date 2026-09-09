"use client";

import Image from "next/image";
import { useRef } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

import type {
  TestimonialsLayout,
} from "@/app/lib/wordpress/grapgql/pages";

import type {
  Testimonial,
} from "@/app/lib/wordpress/grapgql/testimonials";

type TestimonialsSectionProps = {
  section: TestimonialsLayout;
  testimonials: Testimonial[];
};

/* =========================================================
   HELPERS
========================================================= */

function getOption(
  value: string | string[] | null | undefined,
  fallback: string
) {
  if (!value) {
    return fallback;
  }

  const option = Array.isArray(value)
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

function getImageUrl(
  testimonial: Testimonial
) {
  return (
    testimonial.testimonialDetails
      ?.clientImage?.node?.sourceUrl ||
    testimonial.testimonialDetails
      ?.clientImage?.node?.mediaItemUrl ||
    null
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

function truncateText(
  text: string,
  maxLength = 290
) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text
    .slice(0, maxLength)
    .trim()}...`;
}

/* =========================================================
   RATING
========================================================= */

function Rating({
  value,
}: {
  value: number | null | undefined;
}) {
  const rating = Math.max(
    0,
    Math.min(
      5,
      Math.round(value ?? 5)
    )
  );

  if (!rating) {
    return null;
  }

  return (
    <div
      className="
        flex
        items-center
        gap-[3px]
        text-[#b89a55]
      "
    >
      {Array.from({
        length: rating,
      }).map((_, index) => (
        <Star
          key={index}
          size={13}
          strokeWidth={1}
          className="fill-current"
        />
      ))}
    </div>
  );
}

/* =========================================================
   CLIENT AVATAR
========================================================= */

function ClientAvatar({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  const imageUrl =
    getImageUrl(testimonial);

  if (imageUrl) {
    return (
      <div
        className="
          relative
          h-[82px]
          w-[82px]
          shrink-0
          overflow-hidden
          rounded-full
          bg-white

          md:h-[96px]
          md:w-[96px]
        "
      >
        <Image
          src={imageUrl}
          alt={
            testimonial
              .testimonialDetails
              ?.clientImage?.node
              ?.altText ||
            testimonial.title
          }
          fill
          sizes="96px"
          className="
            object-cover
            object-center
          "
        />
      </div>
    );
  }

  return (
    <div
      className="
        flex
        h-[82px]
        w-[82px]
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-white

        font-heading
        text-[26px]
        font-light
        text-[#b89a55]

        md:h-[96px]
        md:w-[96px]
        md:text-[30px]
      "
    >
      {getInitials(
        testimonial.title
      )}
    </div>
  );
}

/* =========================================================
   SLIDER TESTIMONIAL CARD
========================================================= */

function SliderTestimonialCard({
  testimonial,
  isActive,
  isNearby,
  cardColor,
  textColor,
}: {
  testimonial: Testimonial;

  isActive: boolean;
  isNearby: boolean;

  cardColor: string;
  textColor: string;

}) {
  const details =
    testimonial.testimonialDetails;

  const testimonialText =
    details?.testimonialText || "";


  return (
    <article
      className={`
        relative
        mx-auto
        flex
        min-h-[390px]
        w-full
        flex-col
        items-center
        justify-center

        px-7
        py-11
        text-center

        transition-all
        duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]

        sm:min-h-[420px]
        sm:px-12

        md:min-h-[445px]
        md:px-14
        md:py-14

        lg:min-h-[470px]
        lg:px-[65px]

        ${
          isActive
            ? `
              z-30
              scale-100
              opacity-100
              shadow-[0_8px_35px_rgba(0,0,0,0.14)]
            `
            : isNearby
            ? `
              z-20
              scale-[0.92]
              opacity-[0.42]
            `
            : `
              z-10
              scale-[0.88]
              opacity-20
            `
        }
      `}
      style={{
        backgroundColor: cardColor,
        color: textColor,
      }}
    >
      {/* AVATAR */}

      <ClientAvatar
        testimonial={testimonial}
      />

      {/* CLIENT NAME */}

      <h3
        className="
          mt-7
          font-heading
          text-[20px]
          font-medium
          leading-tight
          tracking-[0.04em]

          md:text-[22px]
        "
      >
        {testimonial.title}
      </h3>

      {/* CLIENT META */}

      {details?.clientMeta && (
        <div
          className="
            mt-2
            font-body
            text-[9px]
            uppercase
            tracking-[0.2em]
            opacity-50
          "
        >
          {details.clientMeta}
        </div>
      )}

      {/* TESTIMONIAL */}

      <p
        className="
          mx-auto
          mt-7
          max-w-[650px]

          font-body
          text-[14px]
          leading-[1.75]
          tracking-[0.04em]

          md:text-[16px]
          md:leading-[1.7]

          lg:text-[17px]
        "
      >
        {truncateText(
          testimonialText,
          290
        )}
      </p>

      {/* BUTTON - ONLY ACTIVE CARD */}

      
    </article>
  );
}

/* =========================================================
   NORMAL TESTIMONIAL CARD
========================================================= */

function NormalTestimonialCard({
  testimonial,
  cardColor,
  textColor,
}: {
  testimonial: Testimonial;
  cardColor: string;
  textColor: string;
}) {
  const details =
    testimonial.testimonialDetails;

  return (
    <article
      className="
        flex
        h-full
        flex-col

        p-8

        shadow-[0_4px_25px_rgba(0,0,0,0.06)]

        sm:p-10
        lg:p-12
      "
      style={{
        backgroundColor: cardColor,
        color: textColor,
      }}
    >
      <Rating
        value={details?.rating}
      />

      <blockquote
        className="
          mt-7
          flex-1

          font-heading
          text-[25px]
          font-light
          leading-[1.5]

          lg:text-[28px]
        "
      >
        “
        {details?.testimonialText}
        ”
      </blockquote>

      <div
        className="
          mt-9
          flex
          items-center
          gap-4
        "
      >
        <ClientAvatar
          testimonial={
            testimonial
          }
        />

        <div>
          <div
            className="
              font-heading
              text-[20px]
            "
          >
            {testimonial.title}
          </div>

          {details?.clientMeta && (
            <div
              className="
                mt-1

                font-body
                text-[9px]
                uppercase
                tracking-[0.18em]

                opacity-50
              "
            >
              {details.clientMeta}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function TestimonialsSection({
  section,
  testimonials,
}: TestimonialsSectionProps) {
  const swiperRef =
    useRef<SwiperType | null>(
      null
    );

  /* =======================================================
     DISPLAY TYPE
  ======================================================= */

  const displayType =
    getOption(
      section.displayType,
      "slider"
    );

  const isSlider =
    displayType === "slider";

  /* =======================================================
     TESTIMONIAL DATA
  ======================================================= */

  const limit = Math.max(
    1,
    Number(
      section.numberToShow
    ) || 6
  );

  let items =
    testimonials.filter(
      (testimonial) =>
        Boolean(
          testimonial
            .testimonialDetails
            ?.testimonialText
        )
    );

  if (section.featuredOnly) {
    items = items.filter(
      (testimonial) =>
        testimonial
          .testimonialDetails
          ?.featured === true
    );
  }

  items = items.slice(
    0,
    limit
  );

  if (!items.length) {
    return null;
  }

  /* =======================================================
     COLORS
  ======================================================= */

  /*
   * Background Color controls individual testimonial cards.
   */

  const cardColor =
    section.backgroundColor ||
    "#f3f3f3";

  const textColor =
    section.textColor ||
    "#111111";

  /* =======================================================
     SECTION BACKGROUND
  ======================================================= */

  const backgroundImageUrl =
    section.backgroundImage?.node
      ?.sourceUrl ||
    section.backgroundImage?.node
      ?.mediaItemUrl ||
    null;

  /* =======================================================
     SECTION BUTTON
  ======================================================= */

  const hasButton =
    Boolean(section.buttonText) &&
    Boolean(section.buttonLink);
console.log("TESTIMONIAL SECTION:", section);
  return (
    <section
      className="
        relative
        isolate
        overflow-hidden

        px-0
        py-[90px]

        sm:py-[105px]

        md:py-[120px]

        lg:py-[135px]
      "
      style={{
        color: textColor,
      }}
    >
      {/* =================================================
          BACKGROUND IMAGE
      ================================================= */}

      {backgroundImageUrl && (
        <div
          className="
            absolute
            inset-0
            -z-30
          "
        >
          <Image
            src={
              backgroundImageUrl
            }
            alt=""
            fill
            sizes="100vw"
            className="
              object-cover
              object-center
            "
          />
        </div>
      )}

      {/* =================================================
          GENERAL WHITE OVERLAY
      ================================================= */}

      {backgroundImageUrl && (
        <div
          className="
            absolute
            inset-0
            -z-20
          "
          style={{
            background:
              "rgba(255,255,255,0.70)",
          }}
        />
      )}

      {/* =================================================
          TOP WHITE FADE / SHADOW

          Strong white at top.
          Background becomes more visible toward bottom.
      ================================================= */}

      {backgroundImageUrl && (
        <div
          className="
            absolute
            inset-0
            -z-10
          "
          style={{
            background: `
              linear-gradient(
                to bottom,
                rgba(255,255,255,1) 0%,
                rgba(255,255,255,0.98) 12%,
                rgba(255,255,255,0.92) 25%,
                rgba(255,255,255,0.62) 48%,
                rgba(255,255,255,0.30) 75%,
                rgba(255,255,255,0.16) 100%
              )
            `,
          }}
        />
      )}

      {/* =================================================
          FALLBACK BACKGROUND
      ================================================= */}

      {!backgroundImageUrl && (
        <div
          className="
            absolute
            inset-0
            -z-30
            bg-white
          "
        />
      )}

      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div
        className="
          relative
          z-10

          mx-auto
          max-w-[850px]

          px-5
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
              uppercase
              leading-none
              tracking-[0.025em]

              sm:text-[52px]

              md:text-[58px]

              lg:text-[62px]
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
              max-w-[650px]

              font-body
              text-[13px]
              leading-[1.8]
              tracking-[0.08em]

              opacity-75

              md:text-[15px]
            "
          >
            {section.description}
          </p>
        )}
      </div>

      {/* =================================================
          SLIDER
      ================================================= */}

      {isSlider ? (
        <div
          className="
            relative
            z-20

            mt-14
            w-full

            md:mt-16
          "
        >
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current =
                swiper;
            }}
            centeredSlides
            loop={
              items.length > 2
            }
            speed={850}
            spaceBetween={0}
            grabCursor
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView:
                  1.15,
              },

              768: {
                slidesPerView:
                  1.35,
              },

              1024: {
                slidesPerView:
                  1.62,
              },

              1280: {
                slidesPerView:
                  1.78,
              },

              1536: {
                slidesPerView:
                  1.9,
              },
            }}
            className="
              !overflow-visible
            "
          >
            {items.map(
              (
                testimonial
              ) => (
                <SwiperSlide
                  key={
                    testimonial.id
                  }
                  className="
                    px-2

                    sm:px-3

                    lg:px-4
                  "
                >
                  {({
                    isActive,
                    isPrev,
                    isNext,
                  }) => (
                    <SliderTestimonialCard
                      testimonial={
                        testimonial
                      }
                      isActive={
                        isActive
                      }
                      isNearby={
                        isPrev ||
                        isNext
                      }
                      cardColor={
                        cardColor
                      }
                      textColor={
                        textColor
                      }
                    />
                  )}
                </SwiperSlide>
              )
            )}
          </Swiper>

          {/* =============================================
              SLIDER ARROWS
          ============================================= */}

          {items.length > 1 && (
            <div
              className="
                mt-8
                flex
                items-center
                justify-center
                gap-5

                md:mt-9
              "
            >
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() =>
                  swiperRef.current?.slidePrev()
                }
                className="
                  flex
                  h-[48px]
                  w-[48px]
                  items-center
                  justify-center

                  bg-[#b89a55]
                  text-white

                  transition-colors
                  duration-300

                  hover:bg-[#222]

                  md:h-[52px]
                  md:w-[52px]
                "
              >
                <ChevronLeft
                  size={22}
                  strokeWidth={1.3}
                />
              </button>

              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() =>
                  swiperRef.current?.slideNext()
                }
                className="
                  flex
                  h-[48px]
                  w-[48px]
                  items-center
                  justify-center

                  bg-[#b89a55]
                  text-white

                  transition-colors
                  duration-300

                  hover:bg-[#222]

                  md:h-[52px]
                  md:w-[52px]
                "
              >
                <ChevronRight
                  size={22}
                  strokeWidth={1.3}
                />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* =================================================
           NORMAL TESTIMONIAL GRID
        ================================================= */

        <div
          className="
            relative
            z-20

            mx-auto
            mt-14

            grid
            max-w-[1400px]
            grid-cols-1
            gap-6

            px-5

            sm:px-8

            md:grid-cols-2
            md:gap-8
            md:px-10

            lg:mt-16
          "
        >
          {items.map(
            (testimonial) => (
              <NormalTestimonialCard
                key={
                  testimonial.id
                }
                testimonial={
                  testimonial
                }
                cardColor={
                  cardColor
                }
                textColor={
                  textColor
                }
              />
            )
          )}
        </div>
      )}

      {/* =================================================
          NORMAL MODE VIEW ALL BUTTON

          Slider button is inside active testimonial card.
      ================================================= */}

      {!isSlider &&
        hasButton && (
          <div
            className="
              relative
              z-20

              mt-12

              flex
              justify-center
            "
          >
            <a
              href={
                section.buttonLink!
              }
              className="
                inline-flex
                min-h-[55px]
                min-w-[210px]
                items-center
                justify-center

                bg-[#b89a55]
                px-8

                font-body
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-white

                transition-all
                duration-300

                hover:bg-[#222]
              "
            >
              {
                section.buttonText
              }
            </a>
          </div>
        )}
        {/* =================================================
    SECTION VIEW ALL BUTTON
================================================= */}

{hasButton && (
  <div
    className="
      relative
      z-20
      mt-12
      flex
      justify-center
      px-5
    "
  >
    <a
      href={section.buttonLink!}
      className="
       group
              inline-flex
              min-h-[54px]
              items-center
              justify-center
              gap-3

              bg-[#b89a55]
              px-8
              mt-4

              font-body
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-white

              transition-all
              duration-300

              hover:bg-[#222]
      "
    >
      {section.buttonText}
    </a>
  </div>
)}
    </section>
  );
}