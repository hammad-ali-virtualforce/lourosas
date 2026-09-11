import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import AreaSingle from "@/app/components/areas/AreaSingle";

import {
  getAreaBySlug,
} from "@/app/lib/wordpress/grapgql/areas";

/* =========================================================
   TYPES
========================================================= */

type AreaPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* =========================================================
   STRIP HTML
========================================================= */

function stripHtml(
  value: string
) {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: AreaPageProps): Promise<Metadata> {
  const { slug } =
    await params;

  const area =
    await getAreaBySlug(
      slug
    );

  if (!area) {
    return {
      title:
        "Area Not Found",
    };
  }

  const intro =
    area.areaDetails
      ?.overviewIntroContent;

  const description =
    intro
      ? stripHtml(intro)
          .slice(0, 160)
      : undefined;

  return {
    title:
      `${area.title} Real Estate | Lou Rosas`,

    description,

    openGraph: {
      title:
        `${area.title} Real Estate`,

      description,

      images:
        area.featuredImage
          ?.node?.sourceUrl
          ? [
              {
                url:
                  area
                    .featuredImage
                    .node
                    .sourceUrl,
              },
            ]
          : [],
    },
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function AreaPage({
  params,
}: AreaPageProps) {
  const { slug } =
    await params;

  const area =
    await getAreaBySlug(
      slug
    );

  if (!area) {
    notFound();
  }

  return (
    <main>
      <AreaSingle
        area={area}
      />
    </main>
  );
}