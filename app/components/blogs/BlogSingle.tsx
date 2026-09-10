import Image from "next/image";

import {
  CalendarDays,
} from "lucide-react";

import type {
  BlogPost,
} from "@/app/lib/wordpress/grapgql/posts";

import BlogCard from "@/app/components/blogs/BlogCard";

import ActionButton from "@/app/components/common/ActionButton";

/* =========================================================
   PROPS
========================================================= */

type BlogSingleProps = {
  post: BlogPost;

  /*
   * Optional for safety.
   * If no related posts are passed,
   * the section simply won't render.
   */
  relatedPosts?: BlogPost[];
};

/* =========================================================
   DATE
========================================================= */

function formatDate(
  date: string | null
) {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  ).format(
    new Date(date)
  );
}

/* =========================================================
   BLOG SINGLE
========================================================= */

export default function BlogSingle({
  post,
  relatedPosts = [],
}: BlogSingleProps) {
  const image =
    post.featuredImage?.node;

  const category =
    post.categories?.nodes?.[0];

  return (
    <>
      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="
          relative

          flex
          min-h-[620px]

          items-end
          overflow-hidden

          border-b-[5px]
          border-[#b89a55]

          bg-[#111]

          md:min-h-[700px]

          lg:min-h-[760px]
        "
      >
        {/* FEATURED IMAGE */}

        {image?.sourceUrl && (
          <Image
            src={
              image.sourceUrl
            }
            alt={
              image.altText ||
              post.title
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

        {/* DARK OVERLAY */}

        <div
          className="
            absolute
            inset-0

            bg-black/45
          "
        />

        {/* GRADIENT */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-b
            from-black/10
            via-black/20
            to-black/80
          "
        />

        {/* HERO CONTENT */}

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
          <div
            className="
              max-w-[1000px]
            "
          >
            {/* CATEGORY */}

            {category && (
              <div
                className="
                  mb-5

                  inline-flex

                  bg-white

                  px-4
                  py-2

                  font-body
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]

                  text-black
                "
              >
                {category.name}
              </div>
            )}

            {/* TITLE */}

            <h1
              className="
                font-heading

                text-[43px]
                font-light
                leading-[1]

                sm:text-[55px]

                md:text-[64px]

                lg:text-[72px]
              "
            >
              {post.title}
            </h1>

            {/* DATE */}

            {post.date && (
              <div
                className="
                  mt-6

                  flex
                  items-center
                  gap-2

                  font-body
                  text-[11px]
                  uppercase
                  tracking-[0.14em]

                  text-white/70
                "
              >
                <CalendarDays
                  size={16}
                  strokeWidth={1.4}
                />

                {formatDate(
                  post.date
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =================================================
          ARTICLE CONTENT
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
            max-w-[1350px]

            grid-cols-1
            gap-16

            lg:grid-cols-[minmax(0,1fr)_340px]
            lg:gap-[90px]
          "
        >
          {/* =================================================
              ARTICLE
          ================================================= */}

          <article
            className="
              min-w-0
            "
          >
            {post.content ? (
              <div
                className="
                  blog-content

                  font-body
                  text-[15px]
                  leading-[1.9]

                  text-black/75
                "
                dangerouslySetInnerHTML={{
                  __html:
                    post.content,
                }}
              />
            ) : (
              <p
                className="
                  font-body
                  text-[15px]

                  text-black/60
                "
              >
                No article content
                available.
              </p>
            )}
          </article>

          {/* =================================================
              CONTACT SIDEBAR
          ================================================= */}

          <aside>
            <div
              className="
                sticky
                top-[120px]

                bg-[#222]

                p-8

                text-white
              "
            >
              <p
                className="
                  font-body
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.24em]

                  text-[#b89a55]
                "
              >
                Have A Question?
              </p>

              <h2
                className="
                  mt-4

                  font-heading
                  text-[34px]
                  font-light
                  leading-[1.1]
                "
              >
                Contact Lou Rosas
              </h2>

              <p
                className="
                  mt-5

                  font-body
                  text-[13px]
                  leading-[1.8]

                  text-white/65
                "
              >
                Get in touch for
                professional real
                estate guidance and
                property information.
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
                  mt-7

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
                  tracking-[0.17em]

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
          RELATED POSTS
      ================================================= */}

      {relatedPosts.length > 0 && (
        <section
          className="
            border-b-[5px]
            border-[#b89a55]

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
                Keep Reading
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
                Related Posts
              </h2>
            </div>

            {/* =============================================
                RELATED POSTS GRID
            ============================================= */}

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
              {relatedPosts.map(
                (relatedPost) => (
                  <BlogCard
                    key={
                      relatedPost.id
                    }
                    post={
                      relatedPost
                    }
                    showDate
                    showExcerpt
                    showCategory
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