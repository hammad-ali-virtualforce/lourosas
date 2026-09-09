import { graphqlRequest } from "./graphql";

export type TestimonialImage = {
  node: {
    sourceUrl: string | null;
    mediaItemUrl: string | null;
    altText: string | null;
  } | null;
} | null;

export type Testimonial = {
  id: string;
  databaseId: number;
  title: string;

  testimonialDetails: {
    testimonialText: string | null;
    clientMeta: string | null;
    rating: number | null;
    featured: boolean | null;
    clientImage: TestimonialImage;
  } | null;
};

type TestimonialsResponse = {
  testimonials: {
    nodes: Testimonial[];
  };
};

export async function getTestimonials() {
  const query = `
    query GetTestimonials {
      testimonials(first: 100) {
        nodes {
          id
          databaseId
          title

          testimonialDetails {
            testimonialText
            clientMeta
            rating
            featured

            clientImage {
              node {
                sourceUrl
                mediaItemUrl
                altText
              }
            }
          }
        }
      }
    }
  `;

  const data =
    await graphqlRequest<TestimonialsResponse>({
      query,
      revalidate: 60,
    });

  return data.testimonials.nodes;
}