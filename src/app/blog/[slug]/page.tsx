import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  CheckCircle2,
  Share2,
  ChevronRight,
  MessageCircle,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/data/blogPosts";
import { ORUPOS_CONFIG } from "@/data/config";
import MarkdownContent from "@/components/MarkdownContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | OruPos",
    };
  }

  const url = `https://orupos.in/blog/${post.slug}`;

  return {
    title: `${post.seoTitle} | OruPos`,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      url,
      siteName: "OruPos",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, 2);
  const articleUrl = `https://orupos.in/blog/${post.slug}`;

  // Article JSON-LD Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role,
    },
    "publisher": {
      "@type": "Organization",
      "name": "OruPos Hospitality Technologies",
      "url": "https://orupos.in",
      "logo": "https://orupos.in/icon.png",
    },
    "keywords": post.keywords.join(", "),
    "articleSection": post.category,
  };

  // BreadcrumbList JSON-LD Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://orupos.in",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog & Guides",
        "item": "https://orupos.in/blog",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": articleUrl,
      },
    ],
  };

  // FAQPage JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", position: "relative" }}>
      {/* Search Engine Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
              }}
            >
              <img
                src="/assets/logo.png"
                alt="OruPos"
                style={{
                  height: "30px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                <span
                  style={{
                    fontWeight: 900,
                    letterSpacing: "-0.035em",
                    color: "var(--zinc-950)",
                    fontSize: "17px",
                    textTransform: "uppercase",
                  }}
                >
                  POS
                </span>
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 750,
                    letterSpacing: "0.08em",
                    color: "var(--zinc-400)",
                    textTransform: "uppercase",
                  }}
                >
                  Zero-Subscription
                </span>
              </div>
            </Link>

            <Link
              href="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: 650,
                color: "var(--zinc-600)",
                textDecoration: "none",
              }}
            >
              <ArrowLeft size={14} />
              <span>All Guides</span>
            </Link>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <a
              href={ORUPOS_CONFIG.getWhatsAppUrl({ city: "Kashmir" })}
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
              <MessageCircle size={14} />
              <span>Get OruPos POS</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* Breadcrumb Links */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12.5px",
            color: "var(--zinc-400)",
            marginBottom: "28px",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={{ color: "var(--zinc-500)", textDecoration: "none" }}>
            Home
          </Link>
          <ChevronRight size={13} />
          <Link href="/blog" style={{ color: "var(--zinc-500)", textDecoration: "none" }}>
            Hospitality Guides
          </Link>
          <ChevronRight size={13} />
          <span style={{ color: "var(--zinc-800)", fontWeight: 600 }}>{post.category}</span>
        </nav>

        {/* Article Header */}
        <header style={{ maxWidth: "860px", marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px", flexWrap: "wrap" }}>
            <span
              style={{
                backgroundColor: "var(--emerald-50)",
                color: "var(--emerald-700)",
                fontSize: "11.5px",
                fontWeight: 750,
                padding: "4px 10px",
                borderRadius: "6px",
              }}
            >
              {post.category}
            </span>
            <span style={{ fontSize: "12.5px", color: "var(--zinc-400)", display: "flex", alignItems: "center", gap: "4px" }}>
              <Clock size={13} /> {post.readTime}
            </span>
            <span style={{ fontSize: "12.5px", color: "var(--zinc-400)", display: "flex", alignItems: "center", gap: "4px" }}>
              <Calendar size={13} /> Updated: {post.updatedAt}
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 3.8vw, 3rem)",
              fontWeight: 900,
              color: "var(--zinc-950)",
              letterSpacing: "-0.04em",
              lineHeight: 1.18,
              marginBottom: "22px",
            }}
          >
            {post.title}
          </h1>

          {/* Author info card */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px 20px",
              backgroundColor: "var(--zinc-50)",
              borderRadius: "14px",
              border: "1px solid var(--zinc-200)",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                backgroundColor: "var(--zinc-950)",
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {post.author.avatarInitials}
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 750, color: "var(--zinc-900)" }}>
                {post.author.name}
              </div>
              <div style={{ fontSize: "12px", color: "var(--zinc-500)", lineHeight: 1.4 }}>
                {post.author.role} • {post.author.bio}
              </div>
            </div>
          </div>
        </header>

        {/* Content Layout with Desktop Table of Contents */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: "54px",
            alignItems: "start",
          }}
          className="blog-content-grid"
        >
          {/* Main Article Content */}
          <article style={{ minWidth: 0 }}>
            {/* Quick Summary / Key Takeaways Box */}
            <div
              style={{
                padding: "24px 28px",
                backgroundColor: "var(--emerald-50)",
                border: "1px solid var(--emerald-100)",
                borderRadius: "16px",
                marginBottom: "36px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--emerald-700)",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Sparkles size={14} />
                EXECUTIVE SUMMARY
              </div>
              <p
                style={{
                  fontSize: "15px",
                  color: "var(--zinc-800)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {post.summary}
              </p>
            </div>

            {/* Render formatted content */}
            <MarkdownContent content={post.content} />

            {/* Frequently Asked Questions Section */}
            {post.faqs.length > 0 && (
              <section id="faqs" style={{ marginTop: "54px", scrollMarginTop: "100px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--emerald-600)",
                    fontSize: "12px",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  <HelpCircle size={15} />
                  FREQUENTLY ASKED QUESTIONS
                </div>
                <h2
                  style={{
                    fontSize: "1.7rem",
                    fontWeight: 900,
                    color: "var(--zinc-950)",
                    letterSpacing: "-0.03em",
                    marginBottom: "24px",
                  }}
                >
                  Common Questions for Restaurant Owners
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {post.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "20px 24px",
                        borderRadius: "14px",
                        border: "1px solid var(--zinc-200)",
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 750,
                          color: "var(--zinc-900)",
                          marginBottom: "10px",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {faq.question}
                      </h3>
                      <p
                        style={{
                          fontSize: "14.5px",
                          color: "var(--zinc-600)",
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Lead Conversion CTA Banner within Article */}
            <div
              style={{
                marginTop: "54px",
                padding: "36px",
                borderRadius: "20px",
                backgroundColor: "var(--zinc-950)",
                color: "#FFFFFF",
                boxShadow: "0 12px 32px rgba(9, 9, 11, 0.15)",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#A7F3D0",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                <Zap size={14} />
                STOP PAYING MONTHLY SOFTWARE RENT
              </div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.25,
                  marginBottom: "12px",
                }}
              >
                Switch Your Restaurant to OruPOS for Just ₹199/Table
              </h3>
              <p
                style={{
                  fontSize: "14.5px",
                  color: "var(--zinc-400)",
                  lineHeight: 1.6,
                  marginBottom: "24px",
                }}
              >
                Zero monthly subscription, full cloud POS software, real-time KOT kitchen routing, durable 3mm acrylic QR table stations, and 100% menu digitization. Doorstep onboarding available in Srinagar and across India.
              </p>
              <a
                href={ORUPOS_CONFIG.getWhatsAppUrl({ restaurantName: "Kashmir Inquiry" })}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#FFFFFF",
                  color: "var(--zinc-950)",
                  padding: "0 24px",
                  height: "46px",
                  borderRadius: "9999px",
                  fontSize: "13px",
                  fontWeight: 750,
                  textDecoration: "none",
                }}
              >
                <MessageCircle size={15} color="var(--emerald-600)" />
                <span>Chat with an Onboarding Specialist on WhatsApp</span>
              </a>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <section style={{ marginTop: "64px" }}>
                <h3
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--zinc-400)",
                    marginBottom: "20px",
                  }}
                >
                  Recommended Reading for Restaurateurs
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  {relatedPosts.map((rPost) => (
                    <Link
                      key={rPost.slug}
                      href={`/blog/${rPost.slug}`}
                      style={{
                        textDecoration: "none",
                        backgroundColor: "var(--zinc-50)",
                        border: "1px solid var(--zinc-200)",
                        borderRadius: "14px",
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: "10.5px",
                            fontWeight: 700,
                            color: "var(--zinc-500)",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            display: "block",
                            marginBottom: "8px",
                          }}
                        >
                          {rPost.category} • {rPost.readTime}
                        </span>
                        <h4
                          style={{
                            fontSize: "14px",
                            fontWeight: 800,
                            color: "var(--zinc-950)",
                            lineHeight: 1.35,
                            letterSpacing: "-0.01em",
                            marginBottom: "10px",
                          }}
                        >
                          {rPost.title}
                        </h4>
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "var(--emerald-600)",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <span>Read Guide</span>
                        <ArrowRight size={12} />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Right Sticky Sidebar (Table of Contents & Quick Conversion) */}
          <aside
            style={{
              position: "sticky",
              top: "90px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
            className="hidden-mobile"
          >
            {/* Table of contents */}
            <div
              style={{
                backgroundColor: "var(--zinc-50)",
                border: "1px solid var(--zinc-200)",
                borderRadius: "16px",
                padding: "24px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--zinc-400)",
                  marginBottom: "16px",
                }}
              >
                TABLE OF CONTENTS
              </div>
              <nav aria-label="Table of contents">
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {post.tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="toc-nav-link"
                        style={{
                          fontSize: "12.5px",
                          color: "var(--zinc-600)",
                          textDecoration: "none",
                          lineHeight: 1.4,
                          display: "block",
                          transition: "color 0.15s ease",
                        }}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Sidebar POS Conversion Widget */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--zinc-200)",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.03)",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "var(--emerald-600)",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                <ShieldCheck size={14} />
                ZERO-SUBSCRIPTION POS
              </div>
              <h4
                style={{
                  fontSize: "15px",
                  fontWeight: 850,
                  color: "var(--zinc-950)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.3,
                  marginBottom: "8px",
                }}
              >
                Only ₹199 / Table (One-Time)
              </h4>
              <p
                style={{
                  fontSize: "12.5px",
                  color: "var(--zinc-500)",
                  lineHeight: 1.5,
                  marginBottom: "16px",
                }}
              >
                No annual software rent. Includes physical acrylic QR stands, instant KOT, and full billing.
              </p>
              <a
                href={ORUPOS_CONFIG.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  width: "100%",
                  height: "38px",
                  backgroundColor: "var(--zinc-950)",
                  color: "#FFFFFF",
                  borderRadius: "9999px",
                  fontSize: "12px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <span>Get Instant Quote</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </aside>
        </div>
      </main>

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
