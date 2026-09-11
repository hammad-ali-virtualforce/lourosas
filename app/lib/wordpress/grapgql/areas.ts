import {
  graphqlRequest,
} from "./graphql";

/* =========================================================
   TYPES
========================================================= */

export type AreaFact = {
  value: string | null;
  label: string | null;
  icon:
    | string
    | string[]
    | null;
};

export type AreaDetails = {
  locationLabel:
    | string
    | null;

  overviewEyebrow:
    | string
    | null;

  overviewHeading:
    | string
    | null;

  overviewIntroContent:
    | string
    | null;

  additionalOverviewContent:
    | string
    | null;

  areaFacts:
    | AreaFact[]
    | null;

  googleMapEmbedUrl:
    | string
    | null;

  nearbyAreas:
    | {
        nodes: AreaReference[];
      }
    | null;
};

export type AreaReference = {
  id: string;
  databaseId: number;

  title: string;
  slug: string;
  uri: string;

  featuredImage:
    | {
        node:
          | {
              sourceUrl:
                | string
                | null;

              altText:
                | string
                | null;
            }
          | null;
      }
    | null;
};

export type Area = {
  id: string;
  databaseId: number;

  title: string;
  slug: string;
  uri: string;

  content:
    | string
    | null;

  featuredImage:
    | {
        node:
          | {
              sourceUrl:
                | string
                | null;

              altText:
                | string
                | null;
            }
          | null;
      }
    | null;

  areaDetails:
    | AreaDetails
    | null;
};

/* =========================================================
   RESPONSE
========================================================= */

type AreasResponse = {
  areas: {
    nodes: Area[];
  };
};

/* =========================================================
   GET AREAS
========================================================= */

export async function getAreas(
  first = 100
): Promise<Area[]> {
  const query = `
    query GetAreas(
      $first: Int!
    ) {
      areas(
        first: $first
      ) {
        nodes {
          id
          databaseId

          title
          slug
          uri
          content

          featuredImage {
            node {
              sourceUrl
              altText
            }
          }

          areaDetails {
            locationLabel

            overviewEyebrow
            overviewHeading
            overviewIntroContent

            additionalOverviewContent

            areaFacts {
              value
              label
              icon
            }

            googleMapEmbedUrl

            nearbyAreas {
              nodes {
                ... on Area {
                  id
                  databaseId

                  title
                  slug
                  uri

                  featuredImage {
                    node {
                      sourceUrl
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data =
    await graphqlRequest<AreasResponse>({
      query,

      variables: {
        first,
      },

      revalidate: 60,
    });

  return (
    data.areas?.nodes || []
  );
}

/* =========================================================
   GET AREA BY SLUG
========================================================= */

export async function getAreaBySlug(
  slug: string
): Promise<Area | null> {
  /*
   * We already know the "areas" connection
   * works in your GraphQL schema.
   *
   * For now we fetch the areas and find
   * the requested slug.
   *
   * This avoids guessing another GraphQL
   * root field such as areaBy().
   */

  const areas =
    await getAreas(100);

  return (
    areas.find(
      (area) =>
        area.slug === slug
    ) || null
  );
}