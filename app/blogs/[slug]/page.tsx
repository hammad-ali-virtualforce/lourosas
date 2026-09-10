import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import BlogSingle from "@/app/components/blogs/BlogSingle";

import {
  getPostBySlug,
  getRelatedPosts,
} from "@/app/lib/wordpress/grapgql/posts";

/* =========================================================
   TYPES
========================================================= */

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* =========================================================
   STRIP HTML
========================================================= */

function stripHtml(
  value: string
) {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } =
    await params;

  const post =
    await getPostBySlug(
      slug
    );

  if (!post) {
    return {
      title:
        "Post Not Found",
    };
  }

  const description =
    post.excerpt
      ? stripHtml(
          post.excerpt
        )
      : undefined;

  return {
    title:
      `${post.title} | Lou Rosas`,

    description,

    openGraph: {
      title:
        post.title,

      description,

      images:
        post.featuredImage
          ?.node?.sourceUrl
          ? [
              {
                url:
                  post
                    .featuredImage
                    .node
                    .sourceUrl,
              },
            ]
          : [],
    },
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } =
    await params;

  const post =
    await getPostBySlug(
      slug
    );

  if (!post) {
    notFound();
  }

  /* =======================================================
     RELATED POSTS
  ======================================================= */

  const relatedPosts =
    await getRelatedPosts(
      post,
      3
    );

  return (
    <main>
      <BlogSingle
        post={post}
        relatedPosts={
          relatedPosts
        }
      />
    </main>
  );
}