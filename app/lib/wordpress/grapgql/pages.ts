import { graphqlRequest } from "./graphql";

import type {
  BlogPost,
} from "./posts";

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

  mediaType: string | string[] | null;

  image: MediaEdge;
  video: MediaEdge;
  videoPoster: MediaEdge;
};

export type HeroLayout = {
  __typename: "PageSectionsHeroHeroLayout";

  heroType: string | string[] | null;

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


export type ActionButtonFields = {
  buttonLabel: string | null;
  buttonLink: string | null;

  isContactButton: boolean | null;

  contactAction:
    | string
    | string[]
    | null;

  contactPageLink: string | null;
}; 

export type ContentMediaButton =   ActionButtonFields;

export type ContentMediaLayout = {
  __typename: "PageSectionsHeroContentMediaLayout";

  layout: string | string[] | null;

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

  displayType: string | string[] | null;

  eyebrow: string | null;
  heading: string | null;
  description: string | null;

  featuredOnly: boolean | null;
  numberToShow: number | null;

  backgroundColor: string | null;
  textColor: string | null;

    backgroundImage: MediaEdge;

} & ActionButtonFields;

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


  selectedAreas?:
    | {
        nodes: {
          id: string;
          databaseId: number;
        }[];
      }
    | null;
} & ActionButtonFields;

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
  textColor: string | null;
};

/* =========================================================
   FEATURED PROPERTIES
========================================================= */

export type FeaturedPropertiesLayout = {
  __typename:
    "PageSectionsHeroFeaturedPropertiesLayout";

  /*
   * Aliased from ACF displayType
   * to avoid conflicts with other flexible layouts.
   */
  propertiesDisplayType:
    | string
    | string[]
    | null;

  showTabs: boolean | null;

  listingStatus:
    | string
    | string[]
    | null;

  showPagination: boolean | null;

  heading: string | null;

  forSaleTabLabel: string | null;
  soldTabLabel: string | null;

  /*
   * Slider:
   * maximum properties loaded into slider.
   *
   * Grid + pagination:
   * properties per page.
   *
   * Grid without pagination:
   * maximum properties displayed.
   */
  numberToShow: number | null;

  backgroundColor: string | null;
  textColor: string | null;
} & ActionButtonFields;

/* =========================================================
   CONTACT SECTION
========================================================= */

export type ContactLayout = {
  __typename:
    "PageSectionsHeroContactLayout";

  contactHeading: string | null;
  contactFormHeading: string | null;

  showForm: boolean | null;
  showEmail: boolean | null;
  showPhoneNumber: boolean | null;
  showAddress: boolean | null;
  showSocial: boolean | null;

  contactBackgroundImage: MediaEdge;

  contactBackgroundColor:
    string | null;

  contactTextColor:
    string | null;
};

/* =========================================================
   BLOG
========================================================= */

export type BlogLayout = {
  __typename:
    "PageSectionsHeroBlogLayout";

  eyebrow: string | null;

  heading: string | null;

  blogDescription:
    | string
    | null;

  blogDisplayType:
    | string
    | string[]
    | null;

  postsSource:
    | string
    | string[]
    | null;

  selectedPosts: {
    nodes: BlogPost[];
  } | null;

  postsToShow:
    | number
    | null;

  showPagination:
    | boolean
    | null;

  showDate:
    | boolean
    | null;

  showExcerpt:
    | boolean
    | null;

  showCategory:
    | boolean
    | null;

  backgroundColor:
    | string
    | null;

  textColor:
    | string
    | null;
} & ActionButtonFields;

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
  | AgentProfileLayout
  | ContactLayout
  | BlogLayout;

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

                  isContactButton
                  contactAction
                  contactPageLink
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

                buttonLabel
                buttonLink

                isContactButton
                contactAction
                contactPageLink
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

                buttonLabel
                buttonLink

                isContactButton
                contactAction
                contactPageLink
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
                textColor
              }
                
              # ============================================
              # FEATURED PROPERTIES
              # ============================================

              ... on PageSectionsHeroFeaturedPropertiesLayout {

                propertiesDisplayType: displayType
                showTabs
                listingStatus
                showPagination

                heading

                forSaleTabLabel
                soldTabLabel

                numberToShow

                buttonLabel
                buttonLink

                isContactButton
                contactAction
                contactPageLink

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
              # ============================================
              # CONTACT
              # ============================================

              ... on PageSectionsHeroContactLayout {
                contactHeading: heading
                contactFormHeading: formHeading

                showForm
                showEmail
                showPhoneNumber
                showAddress
                showSocial

                contactBackgroundImage: backgroundImage {
                  node {
                    sourceUrl
                    mediaItemUrl
                    altText
                  }
                }

                contactBackgroundColor: backgroundColor
                contactTextColor: textColor
              }
              # ============================================
              # BLOG
              # ============================================

              ... on PageSectionsHeroBlogLayout {

                eyebrow
                heading

                blogDescription: description

                blogDisplayType: displayType

                postsSource
                postsToShow

                showPagination
                showDate
                showExcerpt
                showCategory

                backgroundColor
                textColor

                buttonLabel
                buttonLink

                isContactButton
                contactAction
                contactPageLink

                selectedPosts {
                  nodes {
                    ... on Post {
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