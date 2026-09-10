import {
  graphqlRequest,
} from "./graphql";

/* =========================================================
   TYPES
========================================================= */

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
};

export type BlogPost = {
  id: string;

  databaseId: number;

  slug: string;
  uri: string;

  title: string;

  date: string | null;

  excerpt: string | null;
  content: string | null;

  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    } | null;
  } | null;

  categories: {
    nodes: BlogCategory[];
  } | null;
};

/* =========================================================
   POSTS RESPONSE
========================================================= */

type PostsResponse = {
  posts: {
    nodes: BlogPost[];
  };
};

/* =========================================================
   GET POSTS
========================================================= */

export async function getPosts(
  first = 100
): Promise<BlogPost[]> {
  const query = `
    query GetPosts(
      $first: Int!
    ) {
      posts(
        first: $first
        where: {
          orderby: {
            field: DATE
            order: DESC
          }
        }
      ) {
        nodes {
          id
          databaseId

          slug
          uri

          title
          date

          excerpt
          content

          featuredImage {
            node {
              sourceUrl
              altText
            }
          }

          categories {
            nodes {
              id
              name
              slug
            }
          }
        }
      }
    }
  `;

  const data =
    await graphqlRequest<PostsResponse>({
      query,

      variables: {
        first,
      },

      revalidate: 60,
    });

  return (
    data.posts?.nodes || []
  );
}

/* =========================================================
   GET POST BY SLUG
========================================================= */

type PostResponse = {
  postBy: BlogPost | null;
};

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const query = `
    query GetPostBySlug(
      $slug: String!
    ) {
      postBy(
        slug: $slug
      ) {
        id
        databaseId

        slug
        uri

        title
        date

        excerpt
        content

        featuredImage {
          node {
            sourceUrl
            altText
          }
        }

        categories {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
  `;

  const data =
    await graphqlRequest<PostResponse>({
      query,

      variables: {
        slug,
      },

      revalidate: 60,
    });

  return data.postBy || null;
}

/* =========================================================
   GET RELATED POSTS
========================================================= */

export async function getRelatedPosts(
  currentPost: BlogPost,
  limit = 3
): Promise<BlogPost[]> {
  /*
   * Get recent posts.
   */

  const allPosts =
    await getPosts(30);

  /*
   * Current post categories.
   */

  const currentCategorySlugs =
    currentPost.categories?.nodes.map(
      (category) =>
        category.slug
    ) || [];

  /*
   * First priority:
   * posts sharing at least
   * one category.
   */

  const sameCategory =
    allPosts.filter(
      (post) => {
        /*
         * Never include
         * current post.
         */

        if (
          post.id ===
          currentPost.id
        ) {
          return false;
        }

        return (
          post.categories?.nodes.some(
            (category) =>
              currentCategorySlugs.includes(
                category.slug
              )
          ) || false
        );
      }
    );

  /*
   * Second priority:
   * any other posts.
   */

  const otherPosts =
    allPosts.filter(
      (post) => {
        /*
         * Never include
         * current post.
         */

        if (
          post.id ===
          currentPost.id
        ) {
          return false;
        }

        /*
         * Don't duplicate
         * same-category posts.
         */

        return !sameCategory.some(
          (relatedPost) =>
            relatedPost.id ===
            post.id
        );
      }
    );

  return [
    ...sameCategory,
    ...otherPosts,
  ].slice(0, limit);
}