/* =========================================================
   LISTING STATUS
========================================================= */

export type ListingStatus =
  | "for_sale"
  | "sold";

/* =========================================================
   LISTING TYPE
========================================================= */

export type Listing = {
   id: number;

  title: string;
  address: string;
  price: string;

  beds?: number | null;
  baths?: number | null;

  rooms?: number | null;

  sqft?: string | null;
  lotSize?: string | null;

  parking?: string | null;
  yearBuilt?: number | null;

  propertyType?: string | null;

  description?: string | null;

  image: string;

  status: ListingStatus;

  url: string;
};

/* =========================================================
   LISTINGS
========================================================= */

export const listings: Listing[] = [
  {
  id: 1,

  title:
    "Houston Commercial Property",

  address:
    "7410 Westview Dr, Houston, TX 77055",

  price:
    "$1,250,000",

  beds: 4,
  baths: 3.5,

  rooms: 8,

  sqft:
    "3,850",

  lotSize:
    "0.42 Acres",

  parking:
    "2 Cars",

  yearBuilt:
    2018,

  propertyType:
    "Single Family",

  image:
    "/images/listings/listing-1.webp",

  status:
    "for_sale",

  url:
    "/properties/houston-commercial-property-1/",
},

  {
    id: 2,

    title:
      "Harbor Side Property",

    address:
      "18980 Harbor Side Boulevard, Montgomery, TX 77356",

    price:
      "PRICE UPON REQUEST",

   beds: 4,
  baths: 3.5,

  rooms: 8,

  sqft:
    "3,850",

  lotSize:
    "0.42 Acres",

  parking:
    "2 Cars",

  yearBuilt:
    2018,

  propertyType:
    "Single Family",

    image:
      "/images/listings/listing-2.webp",

    status:
      "sold",

    url:
      "/properties/harbor-side-property-2/",
  },

  {
    id: 3,

    title:
      "Pine Hollow Property",

    address:
      "275 Pine Hollow Lane, Houston, TX 77056",

    price:
      "PRICE UPON REQUEST",

    beds: 4,
  baths: 3.5,

  rooms: 8,

  sqft:
    "3,850",

  lotSize:
    "0.42 Acres",

  parking:
    "2 Cars",

  yearBuilt:
    2018,

  propertyType:
    "Single Family",

    image:
      "/images/listings/listing-3.webp",

    status:
      "sold",

    url:
      "/properties/pine-hollow-property-3/",
  },

  {
    id: 4,

    title:
      "Commercial Opportunity",

    address:
      "Houston, TX",

    price:
      "$1,950,000",

    beds: 4,
  baths: 3.5,

  rooms: 8,

  sqft:
    "3,850",

  lotSize:
    "0.42 Acres",

  parking:
    "2 Cars",

  yearBuilt:
    2018,

  propertyType:
    "Single Family",

    image:
      "/images/listings/listing-4.webp",

    status:
      "for_sale",

    url:
      "/properties/commercial-opportunity-4/",
  },

  {
    id: 5,

    title:
      "Retail Investment Property",

    address:
      "Katy, TX",

    price:
      "$2,400,000",

    beds: 4,
  baths: 3.5,

  rooms: 8,

  sqft:
    "3,850",

  lotSize:
    "0.42 Acres",

  parking:
    "2 Cars",

  yearBuilt:
    2018,

  propertyType:
    "Single Family",

    image:
      "/images/listings/listing-1.webp",

    status:
      "for_sale",

    url:
      "/properties/retail-investment-property-5/",
  },

  {
    id: 6,

    title:
      "Office Property",

    address:
      "Sugar Land, TX",

    price:
      "$1,750,000",

   beds: 4,
  baths: 3.5,

  rooms: 8,

  sqft:
    "3,850",

  lotSize:
    "0.42 Acres",

  parking:
    "2 Cars",

  yearBuilt:
    2018,

  propertyType:
    "Single Family",
    image:
      "/images/listings/listing-2.webp",

    status:
      "for_sale",

    url:
      "/properties/office-property-6/",
  },

  {
    id: 7,

    title:
      "Houston Commercial Property",

    address:
      "3630 Willowick, Houston, TX 77019",

    price:
      "PRICE UPON REQUEST",
beds: 4,
  baths: 3.5,

  rooms: 8,

  sqft:
    "3,850",

  lotSize:
    "0.42 Acres",

  parking:
    "2 Cars",

  yearBuilt:
    2018,

  propertyType:
    "Single Family",

    image:
      "/images/listings/listing-1.webp",

    status:
      "sold",

    url:
      "/properties/houston-commercial-property-7/",
  },

  {
    id: 8,

    title:
      "Harbor Side Property",

    address:
      "18980 Harbor Side Boulevard, Montgomery, TX 77356",

    price:
      "PRICE UPON REQUEST",

   beds: 4,
  baths: 3.5,

  rooms: 8,

  sqft:
    "3,850",

  lotSize:
    "0.42 Acres",

  parking:
    "2 Cars",

  yearBuilt:
    2018,

  propertyType:
    "Single Family",

    image:
      "/images/listings/listing-2.webp",

    status:
      "sold",

    url:
      "/properties/harbor-side-property-8/",
  },

  {
    id: 9,

    title:
      "Pine Hollow Property",

    address:
      "275 Pine Hollow Lane, Houston, TX 77056",

    price:
      "PRICE UPON REQUEST",

    beds: 4,
  baths: 3.5,

  rooms: 8,

  sqft:
    "3,850",

  lotSize:
    "0.42 Acres",

  parking:
    "2 Cars",

  yearBuilt:
    2018,

  propertyType:
    "Single Family",

    image:
      "/images/listings/listing-3.webp",

    status:
      "sold",

    url:
      "/properties/pine-hollow-property-9/",
  },

  {
    id: 10,

    title:
      "Commercial Opportunity",

    address:
      "Houston, TX",

    price:
      "$1,950,000",

   beds: 4,
  baths: 3.5,

  rooms: 8,

  sqft:
    "3,850",

  lotSize:
    "0.42 Acres",

  parking:
    "2 Cars",

  yearBuilt:
    2018,

  propertyType:
    "Single Family",

    image:
      "/images/listings/listing-4.webp",

    status:
      "for_sale",

    url:
      "/properties/commercial-opportunity-10/",
  },

  {
    id: 11,

    title:
      "Retail Investment Property",

    address:
      "Katy, TX",

    price:
      "$2,400,000",

   beds: 4,
  baths: 3.5,

  rooms: 8,

  sqft:
    "3,850",

  lotSize:
    "0.42 Acres",

  parking:
    "2 Cars",

  yearBuilt:
    2018,

  propertyType:
    "Single Family",
    image:
      "/images/listings/listing-1.webp",

    status:
      "for_sale",

    url:
      "/properties/retail-investment-property-11/",
  },

  {
    id: 12,

    title:
      "Office Property",

    address:
      "Sugar Land, TX",

    price:
      "$1,750,000",

    beds: 4,
  baths: 3.5,

  rooms: 8,

  sqft:
    "3,850",

  lotSize:
    "0.42 Acres",

  parking:
    "2 Cars",

  yearBuilt:
    2018,

  propertyType:
    "Single Family",

    image:
      "/images/listings/listing-2.webp",

    status:
      "for_sale",

    url:
      "/properties/office-property-12/",
  },
];

/* =========================================================
   GET SLUG FROM LISTING URL
========================================================= */

export function getListingSlug(
  url: string
) {
  return (
    url
      .replace(
        /^\/+|\/+$/g,
        ""
      )
      .split("/")
      .pop() || ""
  );
}

/* =========================================================
   GET LISTING BY SLUG
========================================================= */

export function getListingBySlug(
  slug: string
): Listing | null {
  return (
    listings.find(
      (listing) =>
        getListingSlug(
          listing.url
        ) === slug
    ) || null
  );
}

/* =========================================================
   GET LISTING BY ID
========================================================= */

export function getListingById(
  id: number
): Listing | null {
  return (
    listings.find(
      (listing) =>
        listing.id === id
    ) || null
  );
}

/* =========================================================
   GET RELATED LISTINGS
========================================================= */

export function getRelatedListings(
  currentListing: Listing,
  limit = 3
): Listing[] {
  const sameStatus = listings.filter(
    (listing) =>
      listing.id !== currentListing.id &&
      listing.status === currentListing.status
  );

  const otherListings = listings.filter(
    (listing) =>
      listing.id !== currentListing.id &&
      listing.status !== currentListing.status
  );

  return [
    ...sameStatus,
    ...otherListings,
  ].slice(0, limit);
}