import type {
  BlogLayout,
} from "@/app/lib/wordpress/grapgql/pages";

import {
  getPosts,
  type BlogPost,
} from "@/app/lib/wordpress/grapgql/posts";

import BlogSectionClient from "./BlogSectionClient";

/* =========================================================
   PROPS
========================================================= */

type BlogSectionProps = {
  section: BlogLayout;
};

/* =========================================================
   OPTION
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
   COMPONENT
========================================================= */

export default async function BlogSection({
  section,
}: BlogSectionProps) {
  const postsSource =
    getOption(
      section.postsSource,
      "latest"
    );

  let posts: BlogPost[] = [];

  /* =======================================================
     SELECTED POSTS
  ======================================================= */

  if (
    postsSource ===
    "selected"
  ) {
    posts =
      section.selectedPosts
        ?.nodes || [];
  }

  /* =======================================================
     LATEST POSTS
  ======================================================= */

  if (
    postsSource !==
      "selected" ||
    posts.length === 0
  ) {
    posts =
      await getPosts(100);
  }

  return (
    <BlogSectionClient
      section={section}
      posts={posts}
    />
  );
}