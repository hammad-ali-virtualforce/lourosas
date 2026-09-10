import { graphqlRequest } from "./graphql";

/* =========================================================
   MEDIA
========================================================= */

type MediaNode = {
  sourceUrl: string;
  mediaItemUrl?: string | null;
  altText: string;
};

type MediaImage = {
  node: MediaNode | null;
} | null;

/* =========================================================
   SOCIAL
========================================================= */

type ACFSelectValue =
  | string
  | string[]
  | {
      value?: string | null;
      label?: string | null;
    }
  | null;

export type SocialItem = {
  icon: ACFSelectValue;
  label: string;
  link: string;
};

/* =========================================================
   FOOTER
========================================================= */

type LegalLink = {
  legalText: string;
  legalLinks: string;
};

/* =========================================================
   CONTACT MODAL
========================================================= */

export type ContactModalSettings = {
  backgroundImage: MediaImage;

  detailsHeading: string | null;
  formHeading: string | null;

  showForm: boolean | null;
  showEmail: boolean | null;
  showPhoneNumber: boolean | null;
  showAddress: boolean | null;
  showSocial: boolean | null;
};

/* =========================================================
   SITE SETTINGS
========================================================= */

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

  /* =======================================================
     CONTACT MODAL
  ======================================================= */

  contactModal: ContactModalSettings | null;

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

/* =========================================================
   RESPONSE
========================================================= */

type SiteSettingsResponse = {
  siteSettings: SiteSettings;
};

/* =========================================================
   GET SITE SETTINGS
========================================================= */

export async function getSiteSettings() {
  const query = `
    query GetSiteSettings {
      siteSettings {

        # ============================================
        # BRANDING
        # ============================================

        branding {
          siteName

          primaryLogo {
            node {
              sourceUrl
              mediaItemUrl
              altText
            }
          }

          lightLogo {
            node {
              sourceUrl
              mediaItemUrl
              altText
            }
          }

          footerLogo {
            node {
              sourceUrl
              mediaItemUrl
              altText
            }
          }

          favicon {
            node {
              sourceUrl
              mediaItemUrl
              altText
            }
          }
        }

        # ============================================
        # CONTACT
        # ============================================

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

        # ============================================
        # HEADER
        # ============================================

        header {
          headerLogo {
            node {
              sourceUrl
              mediaItemUrl
              altText
            }
          }

          headerLightLogo {
            node {
              sourceUrl
              mediaItemUrl
              altText
            }
          }

          headerBackground
          headerText
        }

        # ============================================
        # SOCIAL
        # ============================================

        social {
          socialMedia {
            icon
            label
            link
          }
        }

        # ============================================
        # CONTACT MODAL
        # ============================================

        contactModal {
          backgroundImage {
            node {
              sourceUrl
              mediaItemUrl
              altText
            }
          }

          detailsHeading
          formHeading

          showForm
          showEmail
          showPhoneNumber
          showAddress
          showSocial
        }

        # ============================================
        # FOOTER
        # ============================================

        footer {
          heading
          description

          realtorLogo {
            node {
              sourceUrl
              mediaItemUrl
              altText
            }
          }

          brokerageLogo {
            node {
              sourceUrl
              mediaItemUrl
              altText
            }
          }

          legalLinks {
            legalText

            legalLinks: legalLink
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

  const data =
    await graphqlRequest<SiteSettingsResponse>({
      query,
      revalidate: 3600,
    });

  return data.siteSettings;
}