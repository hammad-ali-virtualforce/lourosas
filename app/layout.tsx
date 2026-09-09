import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Montserrat,
} from "next/font/google";


import "./globals.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: [
    "300",
    "400",
    "500",
    "600",
    "700",
  ],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: [
    "300",
    "400",
    "500",
    "600",
    "700",
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lou Rosas",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
    className={`
        ${cormorant.variable}
        ${montserrat.variable}
      `}
    >
      <body>
        <Header />

        {children}
        <Footer />
      </body>
    </html>
  );
}