import HeroSection from "./HeroSection";
import ContentMediaSection from "./ContentMediaSection";
import TestimonialsSection from "./TestimonialsSection";
import AreasSection from "./AreasSection";
import ClientResourcesSection from "./ClientResourcesSection";
import FeaturedPropertiesSection from "./FeaturedPropertiesSection";
import AgentProfileSection from "./AgentProfileSection";
import type {
  PageSection,
} from "@/app/lib/wordpress/grapgql/pages";

import {
  getTestimonials,
} from "@/app/lib/wordpress/grapgql/testimonials";

import {
  getAreas,
} from "@/app/lib/wordpress/grapgql/areas";

type SectionRendererProps = {
  sections?: PageSection[] | null;

  pageTitle: string;
  pageUri: string;

  primaryLogoUrl?: string | null;
  primaryLogoAlt?: string | null;
};

export default async function SectionRenderer({
  sections,
  pageTitle,
  pageUri,
  primaryLogoUrl,
  primaryLogoAlt,
}: SectionRendererProps) {
  if (!sections?.length) {
    return null;
  }

  const needsTestimonials =
    sections.some(
      (section) =>
        section.__typename ===
        "PageSectionsHeroTestimonialsLayout"
    );

  const needsAreas =
    sections.some(
      (section) =>
        section.__typename ===
        "PageSectionsHeroAreasLayout"
    );

  const [
    testimonials,
    areas,
  ] = await Promise.all([
    needsTestimonials
      ? getTestimonials()
      : Promise.resolve([]),

    needsAreas
      ? getAreas()
      : Promise.resolve([]),
  ]);

  return (
    <>
      {sections.map(
        (section, index) => {
          console.log(
  "RENDER SECTION:",
  section.__typename
);
          switch (
            section.__typename
          ) {
            case "PageSectionsHeroHeroLayout":
              return (
                <HeroSection
                  key={`hero-${index}`}
                  section={section}
                  pageTitle={pageTitle}
                  pageUri={pageUri}
                />
              );

            case "PageSectionsHeroContentMediaLayout":
              return (
                <ContentMediaSection
                  key={`content-media-${index}`}
                  section={section}
                  primaryLogoUrl={
                    primaryLogoUrl
                  }
                  primaryLogoAlt={
                    primaryLogoAlt
                  }
                />
              );

            case "PageSectionsHeroTestimonialsLayout":
              return (
                <TestimonialsSection
                  key={`testimonials-${index}`}
                  section={section}
                  testimonials={
                    testimonials
                  }
                />
              );

            case "PageSectionsHeroAreasLayout":
              return (
                <AreasSection
                  key={`areas-${index}`}
                  section={section}
                  areas={areas}
                />
              );
            case "PageSectionsHeroClientResourcesLayout":
              return (
                <ClientResourcesSection
                  key={`client-resources-${index}`}
                  section={section}
                />
              );
            case "PageSectionsHeroFeaturedPropertiesLayout":
              return (
                <FeaturedPropertiesSection
                  key={`featured-properties-${index}`}
                  section={section}
                />
              );

            case "PageSectionsHeroAgentProfileLayout":
              return (
                <AgentProfileSection
                  key={`agent-profile-${index}`}
                  section={section}
                />
              );
            default:
              return null;
          }
        }
      )}
    </>
  );
}