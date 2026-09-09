import { notFound } from "next/navigation";

import SectionRenderer from "./components/sections/SectionRenderer";

import {
  getHomePage,
} from "./lib/wordpress/grapgql/page";

import {
  getSiteSettings,
} from "./lib/wordpress/grapgql/site";

export default async function HomePage() {
  const [page, settings] =
    await Promise.all([
      getHomePage(),
      getSiteSettings(),
    ]);

  if (!page) {
    notFound();
  }

  const primaryLogoUrl =
    settings?.branding?.primaryLogo?.node
      ?.sourceUrl || null;

  const primaryLogoAlt =
    settings?.branding?.primaryLogo?.node
      ?.altText ||
    settings?.branding?.siteName ||
    "Logo";

  return (
    <main>
      <SectionRenderer
        sections={
          page.pageSections?.sections
        }
        pageTitle={page.title}
        pageUri={page.uri}
        primaryLogoUrl={primaryLogoUrl}
        primaryLogoAlt={primaryLogoAlt}
      />
    </main>
  );
}