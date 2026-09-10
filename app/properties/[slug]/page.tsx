import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import {
  getListingBySlug,
  listings,
  getListingSlug,
} from "@/app/data/listings";

import PropertySingle from "@/app/components/properties/PropertySingle";

/* =========================================================
   TYPES
========================================================= */

type PropertyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* =========================================================
   STATIC PARAMS
========================================================= */

export function generateStaticParams() {
  return listings.map(
    (listing) => ({
      slug:
        getListingSlug(
          listing.url
        ),
    })
  );
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { slug } =
    await params;

  const listing =
    getListingBySlug(
      slug
    );

  if (!listing) {
    return {
      title:
        "Property Not Found",
    };
  }

  return {
    title:
      `${listing.address} | Lou Rosas`,

    description:
      listing.description ||
      `${listing.price} property located at ${listing.address}.`,
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function PropertyPage({
  params,
}: PropertyPageProps) {
  const { slug } =
    await params;

  const listing =
    getListingBySlug(
      slug
    );

  if (!listing) {
    notFound();
  }

  return (
    <main>
      <PropertySingle
        listing={listing}
      />
    </main>
  );
}