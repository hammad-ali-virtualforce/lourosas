export type ListingStatus =
  | "for_sale"
  | "sold";

export type Listing = {
  id: number;

  title: string;
  address: string;

  price: string;

  beds?: number | null;
  baths?: number | null;
  sqft?: string | null;

  image: string;

  status: ListingStatus;

  url: string;
};

export const listings: Listing[] = [
  {
    id: 1,
    title: "Houston Commercial Property",
    address: "3630 Willowick, Houston, TX 77019",
    price: "PRICE UPON REQUEST",
    beds: null,
    baths: null,
    sqft: null,
    image: "/images/listings/listing-1.webp",
    status: "sold",
    url: "#",
  },

  {
    id: 2,
    title: "Harbor Side Property",
    address:
      "18980 Harbor Side Boulevard, Montgomery, TX 77356",
    price: "PRICE UPON REQUEST",
    beds: 6,
    baths: 8,
    sqft: "8,192",
    image: "/images/listings/listing-2.webp",
    status: "sold",
    url: "#",
  },

  {
    id: 3,
    title: "Pine Hollow Property",
    address:
      "275 Pine Hollow Lane, Houston, TX 77056",
    price: "PRICE UPON REQUEST",
    beds: 5,
    baths: 7,
    sqft: "7,860",
    image: "/images/listings/listing-3.webp",
    status: "sold",
    url: "#",
  },

  {
    id: 4,
    title: "Commercial Opportunity",
    address: "Houston, TX",
    price: "$1,950,000",
    image: "/images/listings/listing-4.webp",
    status: "for_sale",
    url: "#",
  },

  {
    id: 5,
    title: "Retail Investment Property",
    address: "Katy, TX",
    price: "$2,400,000",
    image: "/images/listings/listing-1.webp",
    status: "for_sale",
    url: "#",
  },

  {
    id: 6,
    title: "Office Property",
    address: "Sugar Land, TX",
    price: "$1,750,000",
    image: "/images/listings/listing-2.webp",
    status: "for_sale",
    url: "#",
  },
   {
    id: 7,
    title: "Houston Commercial Property",
    address: "3630 Willowick, Houston, TX 77019",
    price: "PRICE UPON REQUEST",
    beds: null,
    baths: null,
    sqft: null,
    image: "/images/listings/listing-1.webp",
    status: "sold",
    url: "#",
  },

  {
    id: 8,
    title: "Harbor Side Property",
    address:
      "18980 Harbor Side Boulevard, Montgomery, TX 77356",
    price: "PRICE UPON REQUEST",
    beds: 6,
    baths: 8,
    sqft: "8,192",
    image: "/images/listings/listing-2.webp",
    status: "sold",
    url: "#",
  },

  {
    id: 9,
    title: "Pine Hollow Property",
    address:
      "275 Pine Hollow Lane, Houston, TX 77056",
    price: "PRICE UPON REQUEST",
    beds: 5,
    baths: 7,
    sqft: "7,860",
    image: "/images/listings/listing-3.webp",
    status: "sold",
    url: "#",
  },

  {
    id: 10,
    title: "Commercial Opportunity",
    address: "Houston, TX",
    price: "$1,950,000",
    image: "/images/listings/listing-4.webp",
    status: "for_sale",
    url: "#",
  },

  {
    id: 11,
    title: "Retail Investment Property",
    address: "Katy, TX",
    price: "$2,400,000",
    image: "/images/listings/listing-1.webp",
    status: "for_sale",
    url: "#",
  },

  {
    id: 12,
    title: "Office Property",
    address: "Sugar Land, TX",
    price: "$1,750,000",
    image: "/images/listings/listing-2.webp",
    status: "for_sale",
    url: "#",
  },
];