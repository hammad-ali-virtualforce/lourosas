import { graphqlRequest } from "./graphql";

export type Area = {
  id: string;
  databaseId: number;

  title: string;
  slug: string;
  uri: string;

  content: string | null;

  featuredImage: {
    node: {
      sourceUrl: string | null;
      altText: string | null;
    } | null;
  } | null;
};

type AreasResponse = {
  areas: {
    nodes: Area[];
  };
};

export async function getAreas() {
  const query = `
    query GetAreas {
      areas(first: 100) {
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
        }
      }
    }
  `;

  const data =
    await graphqlRequest<AreasResponse>({
      query,
      revalidate: 60,
    });

  return data.areas.nodes;
}