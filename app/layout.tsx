import type { Metadata } from "next";
import "./globals.css";
import { HOTEL_INFO } from "@/lib/hotel-data";

export const metadata: Metadata = {
  title: {
    default: "City Boutique Hotel Sarajevo | 4-Star Boutique Hotel in the Heart of Sarajevo",
    template: "%s | City Boutique Hotel Sarajevo",
  },
  description:
    "Experience authentic Bosnian hospitality at City Boutique Hotel Sarajevo. Located at Mula Mustafe Bašeskije 2, just 5 minutes from Baščaršija, featuring 24 soundproof rooms, suites, and a panoramic rooftop Turkish breakfast.",
  keywords: [
    "City Boutique Hotel Sarajevo",
    "Hotel Sarajevo Old Town",
    "Boutique Hotel Baščaršija",
    "Mula Mustafe Bašeskije 2 Hotel",
    "Halal Hotel Sarajevo",
    "Turkish Breakfast Sarajevo",
  ],
  openGraph: {
    title: "City Boutique Hotel Sarajevo — Stay in the Heart of Sarajevo",
    description:
      "Refined 4-star boutique hotel steps from Baščaršija and the National Theater. 24 soundproof rooms & suites, rooftop Turkish breakfast, and 24/7 reception.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: HOTEL_INFO.fullName,
    description:
      "4-star boutique hotel in the historic heart of Sarajevo, steps from Baščaršija, offering 24 soundproof rooms and suites, Halal-certified rooftop Turkish breakfast, and 24-hour reception.",
    starRating: {
      "@type": "Rating",
      ratingValue: "4",
    },
    AggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      bestRating: "5",
      reviewCount: "490",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: HOTEL_INFO.address.street,
      addressLocality: HOTEL_INFO.address.city,
      postalCode: HOTEL_INFO.address.postalCode,
      addressCountry: "BA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: HOTEL_INFO.address.coordinates.lat,
      longitude: HOTEL_INFO.address.coordinates.lng,
    },
    telephone: HOTEL_INFO.contact.phone,
    email: HOTEL_INFO.contact.email,
    numberOfRooms: HOTEL_INFO.totalRooms,
    checkinTime: "14:00",
    checkoutTime: "11:00",
  };

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter+Tight:wght@300;400;500;600&family=Manrope:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#FFFFFF] text-[#171715]"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
