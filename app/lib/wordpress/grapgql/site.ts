import { graphqlRequest } from "./graphql";

type MediaNode = {
  sourceUrl: string;
  altText: string;
};

type MediaImage = {
  node: MediaNode | null;
} | null;

type SocialItem = {
  icon: string;
  label: string;
  link: string;
};

type LegalLink = {
  legalText: string;
  legalLinks: string;
};

export type SiteSettings = {
  branding: {
    siteName: string;
    primaryLogo: MediaImage;
    lightLogo: MediaImage;
    footerLogo: MediaImage;
    favicon: MediaImage;
  };

  contact: {
    agentName: string;
    jobTitle: string;
    licenseNumber: string;
    email: string;
    mobilePhone: string;
    officePhone: string;
    brokerageName: string;
    address: string;
  };

  header: {
    headerLogo: MediaImage;
    headerLightLogo: MediaImage;
    headerBackground: string;
    headerText: string;
  };

  social: {
    socialMedia: SocialItem[];
  };

  footer: {
    heading: string;
    description: string;

    realtorLogo: MediaImage;
    brokerageLogo: MediaImage;

    legalLinks: LegalLink[];

    disclaimerText1: string;
    disclaimerText2: string;
    disclaimerCopyright: string;
    websiteCopyright: string;
    privacyLink: string;
  };
};

type SiteSettingsResponse = {
  siteSettings: SiteSettings;
};

export async function getSiteSettings() {
  const query = `
    query GetSiteSettings {
      siteSettings {
        branding {
          siteName

          primaryLogo {
            node {
              sourceUrl
              altText
            }
          }

          lightLogo {
            node {
              sourceUrl
              altText
            }
          }

          footerLogo {
            node {
              sourceUrl
              altText
            }
          }

          favicon {
            node {
              sourceUrl
              altText
            }
          }
        }

        contact {
          agentName
          jobTitle
          licenseNumber
          email
          mobilePhone
          officePhone
          brokerageName
          address
        }

        header {
          headerLogo {
            node {
              sourceUrl
              altText
            }
          }

          headerLightLogo {
            node {
              sourceUrl
              altText
            }
          }

          headerBackground
          headerText
        }

        social {
          socialMedia {
            icon
            label
            link
          }
        }

        footer {
          heading
          description

          realtorLogo {
            node {
              sourceUrl
              altText
            }
          }

          brokerageLogo {
            node {
              sourceUrl
              altText
            }
          }

          legalLinks {
            legalText
            legalLink
          }

          disclaimerText1
          disclaimerText2
          disclaimerCopyright
          websiteCopyright
          privacyLink
        }
      }
    }
  `;

  const data = await graphqlRequest<SiteSettingsResponse>({
    query,
    revalidate: 3600,
  });

  return data.siteSettings;
}