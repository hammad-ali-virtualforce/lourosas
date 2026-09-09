type GraphQLRequestOptions = {
  query: string;
  variables?: Record<string, unknown>;
  revalidate?: number;
};

export async function graphqlRequest<T>({
  query,
  variables = {},
  revalidate = 60,
}: GraphQLRequestOptions): Promise<T> {
  const endpoint = process.env.WORDPRESS_GRAPHQL_URL;

  if (!endpoint) {
    throw new Error(
      "WORDPRESS_GRAPHQL_URL is not defined in .env.local"
    );
  }

  const response = await fetch(endpoint, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query,
      variables,
    }),

    next: {
      revalidate,
    },
  });

  if (!response.ok) {
    throw new Error(
      `WordPress GraphQL request failed: ${response.status}`
    );
  }

  const json = await response.json();

  if (json.errors) {
    console.error("GraphQL errors:", json.errors);

    throw new Error(
      json.errors[0]?.message || "WordPress GraphQL error"
    );
  }

  return json.data;
}