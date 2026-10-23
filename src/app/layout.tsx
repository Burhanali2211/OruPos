import type { Metadata } from "next";
import "./globals.css";
import { ORUPOS_CONFIG } from "@/data/config";

export const metadata: Metadata = {
  title: "OruPos — Digital Menu & QR Table Stands for Indian Restaurants (₹199/Table)",
  description: "Complete digital menu website, individual table QR codes, and durable physical acrylic QR stands for restaurants, cafes, dhabas, bakeries, and hotels in India. ₹199 per table with complete menu setup.",
  metadataBase: new URL(ORUPOS_CONFIG.urls.website),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "OruPos — Digital Menu & QR Table Stands for Indian Restaurants",
    description: "Give your restaurant customers an instant QR digital menu. Get high-quality acrylic table stands and a mobile-friendly menu for just ₹199 per table.",
    url: ORUPOS_CONFIG.urls.website,
    siteName: "OruPos",
    images: [
      {
        url: "/assets/hero-table-stand.jpg",
        width: 1200,
        height: 900,
        alt: "OruPos Acrylic QR Table Stand on Restaurant Dining Table",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OruPos — Digital Menu & QR Table Stands for Indian Restaurants",
    description: "Digital menu website + physical acrylic QR stands for ₹199 per table. Complete menu setup done for you.",
    images: ["/assets/hero-table-stand.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD Structured Data Schema for LocalBusiness, Product, and FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": "https://orupos.in/#product",
        "name": "OruPos Restaurant QR Table Stand & Digital Menu Package",
        "image": "https://orupos.in/assets/hero-table-stand.jpg",
        "description": "Physical acrylic QR table stand with custom table numbers and fast mobile-friendly digital menu website for Indian food businesses.",
        "brand": {
          "@type": "Brand",
          "name": "OruPos"
        },
        "offers": {
          "@type": "Offer",
          "price": "199",
          "priceCurrency": "INR",
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "seller": {
            "@type": "Organization",
            "name": "OruPos Hospitality Solutions"
          }
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://orupos.in/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do customers need an app?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Customers do not need to download any application. They scan the QR code using any normal phone camera, Google Lens, Paytm, PhonePe, or WhatsApp, and the menu opens immediately in their mobile browser."
            }
          },
          {
            "@type": "Question",
            "name": "Does every table get a separate QR code?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Every single table gets its own QR stand with its specific table number printed clearly (e.g. Table 01, Table 02, Table 03). The QR code is directly mapped to that table."
            }
          },
          {
            "@type": "Question",
            "name": "What does ₹199 per table include?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The ₹199 per table package includes: your digital menu website, unique QR code for the table, table number, physical acrylic QR table stand, mobile-friendly menu layout, your restaurant branding, and complete menu setup done by our team."
            }
          },
          {
            "@type": "Question",
            "name": "Do I receive a physical QR stand?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, absolutely. You receive real, high-quality transparent acrylic T-stands delivered to your restaurant. They are durable, water-resistant, spill-proof, and designed specifically for dining tables."
            }
          },
          {
            "@type": "Question",
            "name": "Can I change my menu later?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. You can update dish prices, add new items, or mark items as unavailable according to our service terms. You never have to reprint the physical table stands when prices or dishes change."
            }
          },
          {
            "@type": "Question",
            "name": "How do I order?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Click 'Get Your Digital Menu', select the number of tables in your dining area, enter your restaurant name and phone number, and send us your current menu photos on WhatsApp. We take care of everything from there."
            }
          },
          {
            "@type": "Question",
            "name": "Can I see a demo before buying?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! You can click 'See Demo' or scan the QR code in the Demo section above to test the exact menu experience on your own phone right now."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
