"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  Swiper,
  SwiperSlide,
  useSwiper,
} from "swiper/react";

import {
  Autoplay,
  EffectFade,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import type {
  HeroLayout,
  HeroSlide,
  MediaEdge,
} from "@/app/lib/wordpress/grapgql/pages";

type HeroSectionProps = {
  section: HeroLayout;
  pageTitle: string;
  pageUri: string;
};

/* =========================================
   HELPERS
========================================= */

function getOption(
  value: string[] | null | undefined,
  fallback: string
) {
  if (!value?.length) {
    return fallback;
  }

  return String(value[0])
    .trim()
    .toLowerCase();
}

function getMediaUrl(
  media: MediaEdge
): string | null {
  return (
    media?.node?.sourceUrl ||
    media?.node?.mediaItemUrl ||
    null
  );
}

function getHeroType(
  value: string[] | null
): "main" | "inner" | "simple" {
  const type = getOption(value, "main");

  if (type.includes("simple")) {
    return "simple";
  }

  if (type.includes("inner")) {
    return "inner";
  }

  return "main";
}

function getMediaType(
  slide: HeroSlide
): "image" | "video" {
  const type = getOption(
    slide.mediaType,
    "image"
  );

  return type.includes("video")
    ? "video"
    : "image";
}

/* =========================================
   SLIDE MEDIA
========================================= */

function HeroMedia({
  slide,
  priority = false,
}: {
  slide: HeroSlide;
  priority?: boolean;
}) {
  const mediaType = getMediaType(slide);

  if (mediaType === "video") {
    const videoUrl = getMediaUrl(
      slide.video
    );

    const posterUrl = getMediaUrl(
      slide.videoPoster
    );

    if (videoUrl) {
      return (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterUrl || undefined}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        >
          <source src={videoUrl} />
        </video>
      );
    }
  }

  const imageUrl = getMediaUrl(
    slide.image
  );

  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={
          slide.image?.node?.altText ||
          slide.heading ||
          ""
        }
        fill
        priority={priority}
        sizes="100vw"
        className="
          object-cover
          object-center
        "
      />
    );
  }

  return (
    <div
      className="
        absolute
        inset-0
        bg-[#5b5b58]
      "
    />
  );
}

/* =========================================
   MAIN HERO SLIDE CONTENT
========================================= */

function MainSlideContent({
  slide,
}: {
  slide: HeroSlide;
}) {
  return (
    <div
      className="
        absolute
        inset-0
        z-20
        flex
        items-center
        justify-center
        px-5
        text-center
        text-white
      "
    >
      <div
        className="
          -translate-y-[55px]
          md:-translate-y-[65px]
        "
      >
        {slide.eyebrow && (
          <p
            className="
              mb-4
              font-body
              text-[10px]
              font-medium
              uppercase
              tracking-[0.32em]
              md:text-[11px]
            "
          >
            {slide.eyebrow}
          </p>
        )}

        {slide.heading && (
          <h1
            className="
              mx-auto
              max-w-[1100px]
              font-heading
              text-[48px]
              font-light
              leading-[0.98]
              tracking-[-0.025em]
              text-white
              sm:text-[58px]
              md:text-[74px]
              lg:text-[88px]
              xl:text-[96px]
            "
          >
            {slide.heading}
          </h1>
        )}
      </div>
    </div>
  );
}

/* =========================================
   SLIDER ARROWS
========================================= */

function HeroSliderArrows() {
  const swiper = useSwiper();

  return (
    <>
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() =>
          swiper.slidePrev()
        }
        className="
          absolute
          left-4
          top-1/2
          z-40
          hidden
          h-12
          w-12
          -translate-y-1/2
          items-center
          justify-center
          border
          border-white/40
          text-white
          transition-all
          duration-500
          hover:bg-white
          hover:text-black
          md:flex
          lg:left-8
        "
      >
        <ChevronLeft
          size={20}
          strokeWidth={1.2}
        />
      </button>

      <button
        type="button"
        aria-label="Next slide"
        onClick={() =>
          swiper.slideNext()
        }
        className="
          absolute
          right-4
          top-1/2
          z-40
          hidden
          h-12
          w-12
          -translate-y-1/2
          items-center
          justify-center
          border
          border-white/40
          text-white
          transition-all
          duration-500
          hover:bg-white
          hover:text-black
          md:flex
          lg:right-8
        "
      >
        <ChevronRight
          size={20}
          strokeWidth={1.2}
        />
      </button>
    </>
  );
}

/* =========================================
   SEARCH
========================================= */

function HeroSearch({
  placeholder,
  buttonLabel,
}: {
  placeholder: string;
  buttonLabel: string;
}) {
  return (
    <form
      action="/search"
      method="get"
      className="
        mx-auto
        flex
        w-full
        max-w-[680px]
        flex-col
        overflow-hidden
        bg-white
        shadow-[0_10px_35px_rgba(0,0,0,0.14)]
        sm:flex-row
      "
    >
      <input
        type="text"
        name="q"
        placeholder={placeholder}
        className="
          h-[58px]
          min-w-0
          flex-1
          bg-white
          px-5
          font-body
          text-[12px]
          text-[#222]
          outline-none
          placeholder:text-[#555]/70
          sm:h-[62px]
          sm:px-7
        "
      />

      <button
        type="submit"
        className="
          h-[54px]
          shrink-0
          bg-[#b89a57]
          px-8
          font-body
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.2em]
          text-white
          transition-colors
          duration-500
          hover:bg-[#222]
          sm:h-[62px]
          sm:min-w-[135px]
        "
      >
        {buttonLabel}
      </button>
    </form>
  );
}

/* =========================================
   HERO SECTION
========================================= */

export default function HeroSection({
  section,
  pageTitle,
}: HeroSectionProps) {
  const heroType = getHeroType(
    section.heroType
  );

  const slides =
    section.heroSlides?.filter(Boolean) ??
    [];

  const isSlider = slides.length > 1;

  const autoplay =
    section.autoplay ?? true;

  const pauseOnHover =
    section.pauseOnHover ?? false;

  const slideDuration =
    section.slideDuration || 6500;

  const transitionSpeed =
    section.transitionSpeed || 1400;

  const showArrows =
    Boolean(section.showArrows) &&
    isSlider;

  const showDots =
    Boolean(section.showDots) &&
    isSlider;

  /* =====================================
     SIMPLE HERO
  ===================================== */

  if (heroType === "simple") {
    return (
      <section
        className="
          flex
          min-h-[270px]
          items-end
          bg-white
          px-5
          pb-16
          pt-[150px]
          md:min-h-[320px]
          md:px-8
          md:pb-20
          lg:px-14
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1440px]
            text-center
          "
        >
          <h1
            className="
              font-heading
              text-[48px]
              font-light
              leading-none
              tracking-[-0.02em]
              text-[#222]
              md:text-[64px]
              lg:text-[74px]
            "
          >
            {pageTitle}
          </h1>
        </div>
      </section>
    );
  }

  /* =====================================
     MAIN / INNER MEDIA CONTENT
  ===================================== */

  const renderSlide = (
    slide: HeroSlide,
    index: number,
    showContent: boolean
  ) => (
    <div
      className="
        relative
        h-full
        w-full
        overflow-hidden
      "
    >
      <HeroMedia
        slide={slide}
        priority={index === 0}
      />

      {/* Reference-style darkening layer */}
      <div
        className="
          absolute
          inset-0
          z-10
          bg-black/35
        "
      />

      {showContent && (
        <MainSlideContent
          slide={slide}
        />
      )}
    </div>
  );

  return (
    <section
      className={`
        relative
        w-full
        overflow-hidden

        ${
          heroType === "main"
            ? "h-[100svh] min-h-[680px]"
            : "h-[470px] md:h-[540px]"
        }
      `}
    >
      {/* =================================
          MEDIA / SLIDER
      ================================== */}

      <div className="absolute inset-0">
        {slides.length === 0 ? (
          <div
            className="
              absolute
              inset-0
              bg-[#5b5b58]
            "
          />
        ) : isSlider ? (
          <Swiper
            modules={[
              Autoplay,
              EffectFade,
              Pagination,
            ]}
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
            loop
            speed={transitionSpeed}
            autoplay={
              autoplay
                ? {
                    delay:
                      slideDuration,
                    disableOnInteraction:
                      false,
                    pauseOnMouseEnter:
                      pauseOnHover,
                  }
                : false
            }
            pagination={
              showDots
                ? {
                    clickable: true,
                  }
                : false
            }
            className="
              hero-swiper
              h-full
              w-full
            "
          >
            {slides.map(
              (slide, index) => (
                <SwiperSlide
                  key={`hero-slide-${index}`}
                  className="
                    relative
                    h-full
                    w-full
                  "
                >
                  {renderSlide(
                    slide,
                    index,
                    heroType === "main"
                  )}
                </SwiperSlide>
              )
            )}

            {showArrows && (
              <HeroSliderArrows />
            )}
          </Swiper>
        ) : (
          renderSlide(
            slides[0],
            0,
            heroType === "main"
          )
        )}
      </div>

      {/* =================================
          INNER HERO STATIC CONTENT
      ================================== */}

      {heroType === "inner" && (
        <div
          className="
            absolute
            inset-0
            z-30
            flex
            items-center
            justify-center
            px-5
            pt-[80px]
            text-center
            text-white
          "
        >
          <div>
            <h1
              className="
                font-heading
                text-[48px]
                font-light
                leading-none
                tracking-[-0.02em]
                text-white
                md:text-[64px]
                lg:text-[72px]
              "
            >
              {pageTitle}
            </h1>

            <div
              className="
                mt-5
                flex
                items-center
                justify-center
                gap-2
                font-body
                text-[9px]
                font-medium
                uppercase
                tracking-[0.22em]
                text-white/80
              "
            >
              <Link
                href="/"
                className="
                  transition-opacity
                  hover:opacity-60
                "
              >
                Home
              </Link>

              <span>/</span>

              <span>
                {pageTitle}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =================================
          MAIN HERO STATIC SEARCH
      ================================== */}

      {heroType === "main" &&
        section.showSearchBar && (
          <div
            className="
              absolute
              left-1/2
              top-[61%]
              z-30
              w-full
              -translate-x-1/2
              px-5
              sm:top-[62%]
            "
          >
            <HeroSearch
              placeholder={
                section.searchFieldPlaceholder ||
                "City, Area, Region or Zip Code"
              }
              buttonLabel={
                section.searchBarButtonLabel ||
                "Search"
              }
            />
          </div>
        )}
    </section>
  );
}