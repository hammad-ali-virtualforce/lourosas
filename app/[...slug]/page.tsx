import { notFound } from "next/navigation";

import { getPageByUri } from "@/app/lib/wordpress/grapgql/pages";
import { getSiteSettings } from "@/app/lib/wordpress/grapgql/site";

import SectionRenderer from "@/app/components/sections/SectionRenderer";

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function DynamicPage({
  params,
}: PageProps) {
  const { slug } = await params;

  /* =========================================================
     BUILD WORDPRESS URI
  ========================================================= */

  const uri = `/${slug.join("/")}/`;

  /* =========================================================
     FETCH PAGE + GLOBAL SETTINGS
  ========================================================= */

  const [page, settings] =
    await Promise.all([
      getPageByUri(uri),
      getSiteSettings(),
    ]);

  /* =========================================================
     404
  ========================================================= */

  if (!page) {
    notFound();
  }

  /* =========================================================
     GLOBAL BRANDING
  ========================================================= */

  const primaryLogo =
    settings.branding.primaryLogo?.node;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main>
      <SectionRenderer
        sections={
          page.pageSections?.sections
        }
        pageTitle={page.title}
        pageUri={page.uri}
        primaryLogoUrl={
          primaryLogo?.sourceUrl ??
          null
        }
        primaryLogoAlt={
          primaryLogo?.altText ??
          settings.branding.siteName ??
          ""
        }
      />
    </main>
  );
}