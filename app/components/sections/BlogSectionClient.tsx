"use client";

import {
  useRef,
  useState,
} from "react";

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
  BlogLayout,
} from "@/app/lib/wordpress/grapgql/pages";

import type {
  BlogPost,
} from "@/app/lib/wordpress/grapgql/posts";

import BlogCard from "@/app/components/blogs/BlogCard";

import ActionButton from "@/app/components/common/ActionButton";

/* =========================================================
   PROPS
========================================================= */

type Props = {
  section: BlogLayout;
  posts: BlogPost[];
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

  return String(
    option || fallback
  )
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/-/g, "_");
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

  return (
    <div
      className="
        mt-14

        flex
        items-center
        justify-center
        gap-2
      "
    >
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
          border-black/20

          transition-all

          hover:bg-black
          hover:text-white

          disabled:pointer-events-none
          disabled:opacity-25
        "
      >
        <ChevronLeft
          size={18}
        />
      </button>

      {Array.from(
        {
          length:
            totalPages,
        },
        (_, index) =>
          index + 1
      ).map((page) => (
        <button
          key={page}
          type="button"
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

            font-body
            text-[11px]

            transition-all

            ${
              page ===
              currentPage
                ? `
                  border-black
                  bg-black
                  text-white
                `
                : `
                  border-black/20

                  hover:bg-black
                  hover:text-white
                `
            }
          `}
        >
          {page}
        </button>
      ))}

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
          border-black/20

          transition-all

          hover:bg-black
          hover:text-white

          disabled:pointer-events-none
          disabled:opacity-25
        "
      >
        <ChevronRight
          size={18}
        />
      </button>
    </div>
  );
}

/* =========================================================
   BLOG SECTION
========================================================= */

export default function BlogSectionClient({
  section,
  posts,
}: Props) {
  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const swiperRef =
    useRef<SwiperType | null>(
      null
    );

  const displayType =
    getOption(
      section.blogDisplayType,
      "grid"
    );

  const postsToShow =
    section.postsToShow &&
    section.postsToShow > 0
      ? section.postsToShow
      : 6;

  const showPagination =
    displayType === "grid" &&
    Boolean(
      section.showPagination
    );

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
     PAGINATION
  ======================================================= */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        posts.length /
          postsToShow
      )
    );

  const safePage =
    Math.min(
      currentPage,
      totalPages
    );

  const startIndex =
    (safePage - 1) *
    postsToShow;

  const gridPosts =
    showPagination
      ? posts.slice(
          startIndex,
          startIndex +
            postsToShow
        )
      : posts.slice(
          0,
          postsToShow
        );

  const sliderPosts =
    posts.slice(
      0,
      postsToShow
    );

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
          HEADER
      ================================================= */}

      <div
        className="
          mx-auto
          max-w-[850px]

          px-5
          text-center
        "
      >
        {section.eyebrow && (
          <p
            className="
              mb-4

              font-body
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.28em]

              opacity-55
            "
          >
            {section.eyebrow}
          </p>
        )}

        {section.heading && (
          <h2
            className="
              font-heading

              text-[40px]
              font-normal
              uppercase
              leading-none
              tracking-[0.045em]

              sm:text-[45px]

              lg:text-[50px]
            "
          >
            {section.heading}
          </h2>
        )}

        {section.blogDescription && (
          <p
            className="
              mx-auto
              mt-6
              max-w-[680px]

              font-body
              text-[14px]
              leading-[1.8]

              opacity-65
            "
          >
            {
              section.blogDescription
            }
          </p>
        )}
      </div>

      {/* =================================================
          SLIDER
      ================================================= */}

      {displayType ===
        "slider" && (
        <div
          className="
            relative
            mx-auto
            mt-[55px]
            max-w-[1600px]

            px-[65px]

            md:px-[80px]

            lg:px-[95px]
          "
        >
          {sliderPosts.length >
          0 ? (
            <>
              <Swiper
                onSwiper={(
                  swiper
                ) => {
                  swiperRef.current =
                    swiper;
                }}
                spaceBetween={25}
                slidesPerView={1}
                breakpoints={{
                  700: {
                    slidesPerView:
                      2,
                  },

                  1100: {
                    slidesPerView:
                      3,
                  },
                }}
              >
                {sliderPosts.map(
                  (post) => (
                    <SwiperSlide
                      key={
                        post.id
                      }
                      className="h-auto"
                    >
                      <BlogCard
                        post={
                          post
                        }
                        showDate={Boolean(
                          section.showDate
                        )}
                        showExcerpt={Boolean(
                          section.showExcerpt
                        )}
                        showCategory={Boolean(
                          section.showCategory
                        )}
                      />
                    </SwiperSlide>
                  )
                )}
              </Swiper>

              <button
                type="button"
                aria-label="Previous article"
                onClick={() =>
                  swiperRef.current
                    ?.slidePrev()
                }
                className="
                  absolute
                  left-3
                  top-[35%]
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

                  hover:bg-black
                  hover:text-white
                "
              >
                <ChevronLeft
                  size={20}
                />
              </button>

              <button
                type="button"
                aria-label="Next article"
                onClick={() =>
                  swiperRef.current
                    ?.slideNext()
                }
                className="
                  absolute
                  right-3
                  top-[35%]
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

                  hover:bg-black
                  hover:text-white
                "
              >
                <ChevronRight
                  size={20}
                />
              </button>
            </>
          ) : (
            <p className="text-center">
              No posts available.
            </p>
          )}
        </div>
      )}

      {/* =================================================
          GRID
      ================================================= */}

      {displayType !==
        "slider" && (
        <div
          className="
            mx-auto
            mt-[55px]
            max-w-[1450px]

            px-5

            sm:px-8

            lg:px-10
          "
        >
          {gridPosts.length >
          0 ? (
            <div
              className="
                grid
                grid-cols-1

                gap-x-7
                gap-y-14

                md:grid-cols-2

                lg:grid-cols-3
              "
            >
              {gridPosts.map(
                (post) => (
                  <BlogCard
                    key={
                      post.id
                    }
                    post={post}
                    showDate={Boolean(
                      section.showDate
                    )}
                    showExcerpt={Boolean(
                      section.showExcerpt
                    )}
                    showCategory={Boolean(
                      section.showCategory
                    )}
                  />
                )
              )}
            </div>
          ) : (
            <p className="text-center">
              No posts available.
            </p>
          )}

          {showPagination && (
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
                setCurrentPage(
                  page
                );

                window.requestAnimationFrame(
                  () => {
                    window.scrollTo({
                      top:
                        window
                          .scrollY -
                        300,
                      behavior:
                        "smooth",
                    });
                  }
                );
              }}
            />
          )}
        </div>
      )}

      {/* =================================================
          CTA
      ================================================= */}

      {hasButton && (
        <div
          className="
            mt-[60px]

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
              min-w-[175px]

              items-center
              justify-center

              border
              border-current

              px-8

              font-heading
              text-[13px]
              font-medium
              uppercase
              tracking-[0.12em]

              transition-all

              hover:bg-black
              hover:text-white
            "
          >
            {
              section.buttonLabel
            }
          </ActionButton>
        </div>
      )}
      <div className="border-b-5 border-[#b89a55] py-5"></div>
    </section>
  );
}