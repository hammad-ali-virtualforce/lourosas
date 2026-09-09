import { graphqlRequest } from "./graphql";

/* =========================================================
   SHARED MEDIA
========================================================= */

export type MediaNode = {
  sourceUrl: string | null;
  mediaItemUrl: string | null;
  altText: string | null;
};

export type MediaEdge = {
  node: MediaNode | null;
} | null;

/* =========================================================
   HERO
========================================================= */

export type HeroSlide = {
  eyebrow: string | null;
  heading: string | null;

  mediaType: string[] | null;

  image: MediaEdge;
  video: MediaEdge;
  videoPoster: MediaEdge;
};

export type HeroLayout = {
  __typename: "PageSectionsHeroHeroLayout";

  heroType: string[] | null;

  autoplay: boolean | null;
  pauseOnHover: boolean | null;

  slideDuration: number | null;
  transitionSpeed: number | null;

  showArrows: boolean | null;
  showDots: boolean | null;

  showSearchBar: boolean | null;

  searchFieldPlaceholder: string | null;
  searchBarButtonLabel: string | null;

  heroSlides: HeroSlide[] | null;
};

/* =========================================================
   CONTENT MEDIA
========================================================= */

export type ContentMediaStat = {
  value: string | null;
  label: string | null;
};

export type ContentMediaButton = {
  buttonLabel: string | null;
  buttonLink: string | null;
};

export type ContentMediaLayout = {
  __typename: "PageSectionsHeroContentMediaLayout";

  layout: string[] | null;

  eyebrow: string | null;
  heading: string | null;
  content: string | null;

  image: MediaEdge;
  backgroundImage: MediaEdge;

  imagePosition: string[] | null;
  contentWidth: string[] | null;

  backgroundColor: string | null;
  textColor: string | null;

  showStats: boolean | null;

  stats: ContentMediaStat[] | null;
  buttons: ContentMediaButton[] | null;
};

/* =========================================================
   TESTIMONIALS SECTION
========================================================= */

export type TestimonialsLayout = {
  __typename: "PageSectionsHeroTestimonialsLayout";

  displayType: string[] | null;

  eyebrow: string | null;
  heading: string | null;
  description: string | null;

  featuredOnly: boolean | null;
  numberToShow: number | null;

  backgroundColor: string | null;
  textColor: string | null;

    backgroundImage: MediaEdge;

  buttonText: string | null;
  buttonLink: string | null;
};

export type AreasLayout = {
  __typename:
    "PageSectionsHeroAreasLayout";

  /*
   * We alias GraphQL "layout" to "areasLayout"
   * because Content Media layout returns [String]
   * while Areas layout returns String.
   */
  areasLayout: string | null;

  eyebrow: string | null;
  heading: string | null;
  description: string | null;

  backgroundColor: string | null;
  textColor: string | null;

  buttonText: string | null;
  buttonLink: string | null;

  selectedAreas?:
    | {
        nodes: {
          id: string;
          databaseId: number;
        }[];
      }
    | null;
};

/* =========================================================
   AGENT PROFILE
========================================================= */

export type AgentProfileLayout = {
  __typename:
    "PageSectionsHeroAgentProfileLayout";

  agentProfileHeading: string | null;

  agentProfileImage: MediaEdge;

  agentProfileBackgroundColor:
    string | null;

  agentProfileTextColor:
    string | null;
};
/* =========================================================
   CLIENT RESOURCES
========================================================= */

export type ClientResourceItem = {
  image: MediaEdge;
  title: string | null;
  link: string | null;
};

export type ClientResourcesLayout = {
  __typename: "PageSectionsHeroClientResourcesLayout";

  eyebrow: string | null;
  heading: string | null;
 clientResourcesDescription: string | null;

  resources: ClientResourceItem[] | null;

  backgroundColor: string | null;
};

export type FeaturedPropertiesLayout = {
  __typename:
    "PageSectionsHeroFeaturedPropertiesLayout";

  heading: string | null;

  forSaleTabLabel: string | null;
  soldTabLabel: string | null;

  numberToShow: number | null;

  buttonText: string | null;
  buttonLink: string | null;

  backgroundColor: string | null;
  textColor: string | null;
};
/* =========================================================
   SECTION UNION
========================================================= */

export type PageSection =
  | HeroLayout
  | ContentMediaLayout
  | TestimonialsLayout
  | AreasLayout
  | ClientResourcesLayout
  | FeaturedPropertiesLayout
  | AgentProfileLayout;

/* =========================================================
   PAGE
========================================================= */

export type PageData = {
  id: string;
  databaseId: number;
  title: string;
  slug: string | null;
  uri: string;

  pageSections: {
    sections: PageSection[] | null;
  } | null;
};

type PageResponse = {
  nodeByUri: PageData | null;
};

/* =========================================================
   QUERY
========================================================= */

export async function getPageByUri(
  uri: string
): Promise<PageData | null> {
  const query = `
    query GetPageByUri($uri: String!) {
      nodeByUri(uri: $uri) {
        ... on Page {
          id
          databaseId
          title
          slug
          uri

          pageSections {
            sections: hero {
              __typename

              # ============================================
              # HERO
              # ============================================

              ... on PageSectionsHeroHeroLayout {
                heroType

                autoplay
                pauseOnHover

                slideDuration
                transitionSpeed

                showArrows
                showDots

                showSearchBar

                searchFieldPlaceholder: searchFeildPlaceholder
                searchBarButtonLabel

                heroSlides {
                  eyebrow
                  heading
                  mediaType

                  image {
                    node {
                      sourceUrl
                      mediaItemUrl
                      altText
                    }
                  }

                  video {
                    node {
                      sourceUrl
                      mediaItemUrl
                    }
                  }

                  videoPoster {
                    node {
                      sourceUrl
                      mediaItemUrl
                      altText
                    }
                  }
                }
              }

              # ============================================
              # CONTENT MEDIA
              # ============================================

              ... on PageSectionsHeroContentMediaLayout {
                layout

                eyebrow
                heading
                content

                image {
                  node {
                    sourceUrl
                    mediaItemUrl
                    altText
                  }
                }

                backgroundImage {
                  node {
                    sourceUrl
                    mediaItemUrl
                    altText
                  }
                }

                imagePosition
                contentWidth

                backgroundColor
                textColor

                showStats

                stats {
                  value
                  label
                }

                buttons {
                  buttonLabel
                  buttonLink
                }
              }

                            # ============================================
              # TESTIMONIALS
              # ============================================

              ... on PageSectionsHeroTestimonialsLayout {
                displayType

                eyebrow
                heading
                description

                featuredOnly
                numberToShow

                backgroundImage {
                  node {
                    sourceUrl
                    mediaItemUrl
                    altText
                  }
                }

                backgroundColor
                textColor

                buttonText
                buttonLink
              }

              # ============================================
              # AREAS
              # ============================================

              ... on PageSectionsHeroAreasLayout {
                areasLayout: layout

                eyebrow
                heading
                description

                backgroundColor
                textColor

                buttonText
                buttonLink
              }
              # ============================================
              # CLIENT RESOURCES
              # ============================================

              ... on PageSectionsHeroClientResourcesLayout {
                eyebrow
                heading
                clientResourcesDescription: description

                resources {
                  image {
                    node {
                      sourceUrl
                      mediaItemUrl
                      altText
                    }
                  }

                  title
                  link
                }

                backgroundColor
              }
                
              # ============================================
              # FEATURED PROPERTIES
              # ============================================

              ... on PageSectionsHeroFeaturedPropertiesLayout {
                heading

                forSaleTabLabel
                soldTabLabel

                numberToShow

                buttonText
                buttonLink

                backgroundColor
                textColor
              }
              # ============================================
              # AGENT PROFILE
              # ============================================

              ... on PageSectionsHeroAgentProfileLayout {
                agentProfileHeading: heading

                agentProfileImage: image {
                  node {
                    sourceUrl
                    mediaItemUrl
                    altText
                  }
                }

                agentProfileBackgroundColor: backgroundColor
                agentProfileTextColor: textColor
              }
            }
          }
        }
      }
    }
  `;

  const data =
    await graphqlRequest<PageResponse>({
      query,
      variables: {
        uri,
      },
      revalidate: 60,
    });

  return data.nodeByUri;
}

export async function getHomePage() {
  return getPageByUri("/");
}