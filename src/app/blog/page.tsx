import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Calendar, Search, Sparkles, MapPin, CheckCircle2 } from "lucide-react";
import { getAllPosts } from "@/data/blogPosts";
import { ORUPOS_CONFIG } from "@/data/config";
import BlogIndexClient from "./BlogIndexClient";

export const metadata: Metadata = {
  title: "Restaurant Billing & POS Knowledge Hub | Kashmir & India Hospitality Guides | OruPos",
  description:
    "Expert restaurant management guides, POS comparisons, offline KOT billing tips, and GST compliance for cafes and dining in Srinagar, Jammu & Kashmir, and across India.",
  keywords: [
    "restaurant billing software kashmir",
    "pos system srinagar",
    "best restaurant pos india",
    "cafe billing software rajbagh lal chowk",
    "petpooja alternatives",
    "restaurant kot management",
    "restaurant gst compliance india",
    "zero subscription pos"
  ],
  alternates: {
    canonical: "https://orupos.in/blog",
  },
  openGraph: {
    title: "Restaurant Billing & POS Knowledge Hub | OruPos",
    description:
      "Actionable guides for cafe and restaurant owners in Kashmir and India: zero-subscription billing, KOT workflows, and offline POS.",
    url: "https://orupos.in/blog",
    siteName: "OruPos",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  // JSON-LD structured data for Google Blog / CollectionPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "OruPos Restaurant Billing & Hospitality Knowledge Hub",
    "description": "Guides and comparisons for restaurant owners in Kashmir and India looking for high-efficiency, zero-subscription POS software.",
    "url": "https://orupos.in/blog",
    "publisher": {
      "@type": "Organization",
      "name": "OruPos Hospitality Technologies",
      "url": "https://orupos.in",
      "logo": "https://orupos.in/icon.png",
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": posts.map((post, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "url": `https://orupos.in/blog/${post.slug}`,
        "name": post.title,
      })),
    },
  };

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", position: "relative" }}>
      {/* Schema Markup for Google Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Header Navigation */}
      <header
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border-hairline)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: "var(--zinc-950)",
                color: "#FFFFFF",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "16px",
              }}
            >
              O
            </div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
              <span
                style={{
                  fontWeight: 900,
                  letterSpacing: "-0.035em",
                  color: "var(--zinc-950)",
                  fontSize: "17px",
                  textTransform: "uppercase",
                }}
              >
                ORUPOS
              </span>
              <span
                style={{
                  fontSize: "9.5px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "var(--zinc-400)",
                  textTransform: "uppercase",
                }}
              >
                Zero-Subscription POS
              </span>
            </div>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link
              href="/"
              style={{
                fontSize: "13px",
                fontWeight: 650,
                color: "var(--zinc-600)",
                textDecoration: "none",
              }}
            >
              Back to Home
            </Link>
            <a
              href={ORUPOS_CONFIG.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                height: "38px",
                padding: "0 18px",
                backgroundColor: "var(--zinc-950)",
                color: "#FFFFFF",
                fontSize: "12px",
                fontWeight: 700,
                borderRadius: "9999px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Get OruPos</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          padding: "72px 24px 48px",
          backgroundColor: "var(--bg-subtle)",
          borderBottom: "1px solid var(--border-hairline)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "var(--emerald-50)",
              border: "1px solid var(--emerald-100)",
              padding: "6px 14px",
              borderRadius: "9999px",
              marginBottom: "20px",
            }}
          >
            <Sparkles size={14} color="var(--emerald-600)" />
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--emerald-600)", letterSpacing: "0.02em" }}>
              HOSPITALITY & RESTAURANT TECH INTELLIGENCE
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 900,
              color: "var(--zinc-950)",
              letterSpacing: "-0.04em",
              lineHeight: 1.15,
              marginBottom: "18px",
              maxWidth: "840px",
            }}
          >
            Restaurant Billing, KOT & Operations Guides for Kashmir & India
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--zinc-600)",
              lineHeight: 1.6,
              maxWidth: "720px",
              marginBottom: "0",
            }}
          >
            Practical, humanized guides for cafe owners, restaurateurs, and food entrepreneurs in Srinagar,
            Jammu & Kashmir, and across India. Learn how to eliminate expensive software fees, speed up kitchen KOTs, and scale your dining floor.
          </p>
        </div>
      </section>

      {/* Interactive Blog List & Filter (Client Component) */}
      <BlogIndexClient posts={posts} />

      {/* Bottom Conversion CTA Banner */}
      <section style={{ padding: "64px 24px 96px" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            backgroundColor: "var(--zinc-950)",
            color: "#FFFFFF",
            borderRadius: "24px",
            padding: "54px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "32px",
            boxShadow: "0 20px 48px rgba(9, 9, 11, 0.2)",
          }}
        >
          <div style={{ maxWidth: "600px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#A7F3D0",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              <CheckCircle2 size={15} />
              Zero Monthly Fees • Srinagar Doorstep & Remote Setup
            </div>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                marginBottom: "14px",
              }}
            >
              Ready to Upgrade Your Restaurant with Zero Monthly Rent?
            </h2>
            <p style={{ color: "var(--zinc-400)", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>
              Get OruPOS for just ₹199 per table one-time. Complete cloud POS, real-time kitchen KOT routing, durable acrylic table stands, and 100% menu setup done for you.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <a
              href={ORUPOS_CONFIG.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                height: "50px",
                padding: "0 28px",
                backgroundColor: "#FFFFFF",
                color: "var(--zinc-950)",
                fontSize: "14px",
                fontWeight: 750,
                borderRadius: "9999px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 14px rgba(255, 255, 255, 0.2)",
              }}
            >
              <span>Book Free Demo on WhatsApp</span>
              <ArrowRight size={16} />
            </a>
            <span style={{ fontSize: "12px", color: "var(--zinc-400)", textAlign: "center" }}>
              Replies in under 15 minutes • Call +91 60056 59527
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border-hairline)",
          padding: "36px 24px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "13px",
            color: "var(--zinc-500)",
          }}
        >
          <div>
            © {new Date().getFullYear()} OruPos Hospitality Technologies. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            <Link href="/" style={{ color: "var(--zinc-600)", textDecoration: "none" }}>
              Home
            </Link>
            <Link href="/blog" style={{ color: "var(--zinc-950)", fontWeight: 700, textDecoration: "none" }}>
              Blog & Guides
            </Link>
            <Link href="/demo" style={{ color: "var(--zinc-600)", textDecoration: "none" }}>
              Live Demo
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
