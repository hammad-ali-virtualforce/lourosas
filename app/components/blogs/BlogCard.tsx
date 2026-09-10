import Image from "next/image";
import Link from "next/link";

import type {
  BlogPost,
} from "@/app/lib/wordpress/grapgql/posts";

/* =========================================================
   PROPS
========================================================= */

type BlogCardProps = {
  post: BlogPost;

  showDate?: boolean;
  showExcerpt?: boolean;
  showCategory?: boolean;
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
   BLOG CARD
========================================================= */

export default function BlogCard({
  post,

  showDate = true,
  showExcerpt = true,
  showCategory = true,
}: BlogCardProps) {
  const image =
    post.featuredImage?.node;

  const category =
    post.categories?.nodes?.[0];

  return (
    <article
      className="
        group
        h-full
      "
    >
      <Link
        href={`/blogs/${post.slug}/`}
        className="
          flex
          h-full
          flex-col
        "
      >
        {/* IMAGE */}

        <div
          className="
            relative
            aspect-[1.55/1]
            overflow-hidden

            bg-[#ecebe7]
          "
        >
          {image?.sourceUrl ? (
            <Image
              src={
                image.sourceUrl
              }
              alt={
                image.altText ||
                post.title
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
          ) : (
            <div
              className="
                absolute
                inset-0

                bg-[#e8e6e0]
              "
            />
          )}

          {/* CATEGORY */}

          {showCategory &&
            category && (
              <div
                className="
                  absolute
                  left-4
                  top-4
                  z-10

                  bg-white

                  px-3
                  py-[7px]

                  font-body
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]

                  text-black
                "
              >
                {category.name}
              </div>
            )}
        </div>

        {/* CONTENT */}

        <div
          className="
            flex
            flex-1
            flex-col

            pt-6
          "
        >
          {/* DATE */}

          {showDate &&
            post.date && (
              <p
                className="
                  font-body
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]

                  text-black/45
                "
              >
                {formatDate(
                  post.date
                )}
              </p>
            )}

          {/* TITLE */}

          <h3
            className="
              mt-3

              font-heading
              text-[30px]
              font-normal
              leading-[1.08]

              text-[#111]

              transition-opacity
              duration-300

              group-hover:opacity-60

              md:text-[32px]
            "
          >
            {post.title}
          </h3>

          {/* EXCERPT */}

          {showExcerpt &&
            post.excerpt && (
              <div
                className="
                  mt-4

                  line-clamp-3

                  font-body
                  text-[13px]
                  leading-[1.8]

                  text-black/65
                "
                dangerouslySetInnerHTML={{
                  __html:
                    post.excerpt,
                }}
              />
            )}

          {/* READ MORE */}

          <div
            className="
              mt-6

              font-body
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.2em]

              text-black
            "
          >
            Read More
          </div>
        </div>
      </Link>
    </article>
  );
}