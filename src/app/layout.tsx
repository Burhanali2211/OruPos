import type { Metadata } from "next";
import "./globals.css";
import { ORUPOS_CONFIG } from "@/data/config";

export const metadata: Metadata = {
  title: "OruPos — Zero-Subscription Restaurant POS System (₹0 Monthly Fee)",
  description: "India's zero-subscription restaurant POS system. Includes real-time table management, instant QR contactless ordering, kitchen KOTs, GST billing, daily analytics, and custom acrylic table stands for ₹199/table one-time.",
  metadataBase: new URL(ORUPOS_CONFIG.urls.website),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "OruPos — Zero-Subscription Restaurant POS System",
    description: "Cloud-based restaurant POS with real-time table management, kitchen KOT, instant contactless QR ordering, and GST billing. No monthly software fees. ₹199 per table once.",
    url: ORUPOS_CONFIG.urls.website,
    siteName: "OruPos",
    images: [
      {
        url: "/assets/hero-table-stand.jpg",
        width: 1200,
        height: 900,
        alt: "OruPos Zero-Subscription Restaurant POS and Table Ordering System",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OruPos — Zero-Subscription Restaurant POS System",
    description: "Complete cloud POS software + table ordering + kitchen KOT + custom acrylic stands for ₹199 per table one-time. Zero monthly fees forever.",
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
  // JSON-LD Structured Data Schema for SoftwareApplication, Product, and FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://orupos.in/#software",
        "name": "OruPos Restaurant POS System",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, Android, iOS, Windows, macOS",
        "description": "Zero-subscription restaurant POS system featuring real-time table management, contactless dine-in QR ordering, kitchen order ticketing (KOT), GST invoicing, and revenue analytics.",
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
            "name": "OruPos Hospitality Technologies"
          }
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://orupos.in/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is OruPos a complete Restaurant POS system?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. OruPos is a complete restaurant POS that manages your floor tables, routes orders in real time to the kitchen (KOT), handles billing with 5% restaurant GST, and generates daily sales analytics — all with zero monthly software subscription fees."
            }
          },
          {
            "@type": "Question",
            "name": "Why is there zero monthly subscription?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Legacy POS systems charge ₹1,500 to ₹4,500 every month in recurring fees. OruPos operates on an affordable one-time onboarding fee of ₹199 per table, which covers your cloud POS software forever with no monthly rent."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to purchase expensive POS billing machines?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No expensive proprietary hardware is needed. OruPos runs directly on any phone, iPad, Android tablet, laptop, or desktop computer you already own."
            }
          },
          {
            "@type": "Question",
            "name": "How does kitchen KOT order routing work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "When customers scan and order from their table (or your staff punches an order), the KOT appears immediately on your kitchen screen or WhatsApp with exact table numbers and special cooking notes."
            }
          },
          {
            "@type": "Question",
            "name": "Are physical acrylic table stands included?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Every single table receives a custom-printed, 3mm heavy-duty acrylic QR stand mapped to that specific table number, delivered directly to your restaurant door across India."
            }
          },
          {
            "@type": "Question",
            "name": "Can I update dish prices and mark items sold out?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. You can 86 sold-out dishes during rush hours and update prices instantly from your admin dashboard, or simply text our WhatsApp support team."
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
