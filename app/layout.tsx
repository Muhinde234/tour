import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

const BASE_URL = "https://www.emmatourtravel.com";

const DESCRIPTION =
  "EMMA TOUR AND TRAVEL AGENCY (ETTA) is your trusted partner in tourism and education consultancy. We craft unforgettable travel experiences and facilitate life-changing study abroad opportunities from Kigali, Rwanda and Nairobi, Kenya.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "EMMA TOUR AND TRAVEL AGENCY | Say Yes To New World!",
    template: "%s | EMMA TOUR AND TRAVEL AGENCY",
  },
  description: DESCRIPTION,

  keywords: [
    "travel agency Rwanda",
    "tour operator Kigali",
    "study abroad consultancy",
    "education consultancy Kenya",
    "ETTA travel",
    "EMMA TOUR",
    "tourism Rwanda",
    "study abroad Africa",
    "travel packages East Africa",
    "international education consultancy",
    "job opportunities Portugal Norway Serbia Lithuania",
  ],

  authors: [{ name: "EMMA TOUR AND TRAVEL AGENCY LTD" }],
  creator: "EMMA TOUR AND TRAVEL AGENCY LTD",
  publisher: "EMMA TOUR AND TRAVEL AGENCY LTD",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "EMMA TOUR AND TRAVEL AGENCY",
    title: "EMMA TOUR AND TRAVEL AGENCY | Say Yes To New World!",
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EMMA TOUR AND TRAVEL AGENCY — Say Yes To New World!",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "EMMA TOUR AND TRAVEL AGENCY | Say Yes To New World!",
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/logo.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },

  alternates: {
    canonical: BASE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "EMMA TOUR AND TRAVEL AGENCY LTD",
  alternateName: "ETTA",
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo.png`,
  description: DESCRIPTION,
  slogan: "Say Yes To New World!",
  foundingDate: "2009",
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Kigali",
      addressCountry: "RW",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+250-785-316-178",
      contactType: "customer service",
      areaServed: "RW",
    },
    {
      "@type": "ContactPoint",
      telephone: "+254-112-538-982",
      contactType: "customer service",
      areaServed: "KE",
    },
    {
      "@type": "ContactPoint",
      telephone: "+1-817-500-3240",
      contactType: "customer service",
      areaServed: "US",
    },
  ],
  sameAs: [BASE_URL],
  serviceType: ["Tourism", "Education Consultancy", "Study Abroad Programs"],
  areaServed: ["Rwanda", "Kenya", "Africa", "America", "Asia"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mulish.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
