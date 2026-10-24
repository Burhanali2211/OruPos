"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, Search, MapPin, Tag } from "lucide-react";
import { BlogPost } from "@/data/blogPosts";

interface BlogIndexClientProps {
  posts: BlogPost[];
}

export default function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Kashmir & Regional", "POS Comparisons", "Operations & KOT", "Tax & Compliance"];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.keywords.some((k) => k.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = posts[0];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px 0" }}>
      {/* Category Pills & Search Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {/* Category Pills */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  height: "36px",
                  padding: "0 16px",
                  borderRadius: "9999px",
                  fontSize: "13px",
                  fontWeight: active ? 750 : 600,
                  backgroundColor: active ? "var(--zinc-950)" : "var(--zinc-100)",
                  color: active ? "#FFFFFF" : "var(--zinc-700)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div
          style={{
            position: "relative",
            minWidth: "260px",
            maxWidth: "340px",
            width: "100%",
          }}
        >
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--zinc-400)",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            placeholder="Search guides, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: "38px",
              paddingRight: "14px",
              borderRadius: "9999px",
              border: "1px solid var(--zinc-200)",
              backgroundColor: "#FFFFFF",
              fontSize: "13px",
              color: "var(--zinc-900)",
              outline: "none",
              transition: "border-color 0.15s ease",
            }}
          />
        </div>
      </div>

      {/* Featured Post Card (Show when category is All and no active search) */}
      {selectedCategory === "All" && !searchQuery && featuredPost && (
        <div style={{ marginBottom: "54px" }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--emerald-600)",
              marginBottom: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <MapPin size={13} />
            FEATURED REGIONAL GUIDE
          </div>

          <Link
            href={`/blog/${featuredPost.slug}`}
            style={{
              textDecoration: "none",
              display: "block",
              borderRadius: "24px",
              border: "1px solid var(--zinc-200)",
              backgroundColor: "#FFFFFF",
              padding: "40px",
              transition: "all 0.25s ease",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--zinc-400)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.07)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--zinc-200)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.03)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span
                style={{
                  backgroundColor: "var(--emerald-50)",
                  color: "var(--emerald-700)",
                  fontSize: "11px",
                  fontWeight: 750,
                  padding: "4px 10px",
                  borderRadius: "6px",
                }}
              >
                {featuredPost.category}
              </span>
              <span style={{ fontSize: "12px", color: "var(--zinc-400)", display: "flex", alignItems: "center", gap: "4px" }}>
                <Clock size={13} /> {featuredPost.readTime}
              </span>
              <span style={{ fontSize: "12px", color: "var(--zinc-400)", display: "flex", alignItems: "center", gap: "4px" }}>
                <Calendar size={13} /> {featuredPost.updatedAt}
              </span>
            </div>

            <h2
              style={{
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                fontWeight: 900,
                color: "var(--zinc-950)",
                letterSpacing: "-0.03em",
                lineHeight: 1.25,
                marginBottom: "14px",
              }}
            >
              {featuredPost.title}
            </h2>

            <p
              style={{
                fontSize: "15px",
                color: "var(--zinc-600)",
                lineHeight: 1.6,
                maxWidth: "880px",
                marginBottom: "24px",
              }}
            >
              {featuredPost.summary}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: "1px solid var(--zinc-100)",
                paddingTop: "20px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "var(--zinc-900)",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {featuredPost.author.avatarInitials}
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--zinc-900)" }}>
                    {featuredPost.author.name}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--zinc-400)" }}>{featuredPost.author.role}</div>
                </div>
              </div>

              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--emerald-600)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>Read Full Guide</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Grid of Articles */}
      <div style={{ marginBottom: "20px" }}>
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
          {searchQuery
            ? `Search Results (${filteredPosts.length})`
            : selectedCategory === "All"
            ? "All Practical Hospitality Guides"
            : `${selectedCategory} Guides (${filteredPosts.length})`}
        </h3>

        {filteredPosts.length === 0 ? (
          <div
            style={{
              padding: "60px 24px",
              textAlign: "center",
              backgroundColor: "var(--zinc-50)",
              borderRadius: "16px",
              color: "var(--zinc-500)",
            }}
          >
            <p style={{ fontSize: "15px", marginBottom: "12px" }}>No guides found matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              style={{
                fontSize: "13px",
                fontWeight: 650,
                color: "var(--emerald-600)",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "28px",
            }}
          >
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{
                  textDecoration: "none",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--zinc-200)",
                  borderRadius: "20px",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--zinc-400)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--zinc-200)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.02)";
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                    <span
                      style={{
                        backgroundColor: "var(--zinc-100)",
                        color: "var(--zinc-700)",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: "5px",
                      }}
                    >
                      {post.category}
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--zinc-400)", display: "flex", alignItems: "center", gap: "4px" }}>
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.18rem",
                      fontWeight: 800,
                      color: "var(--zinc-950)",
                      letterSpacing: "-0.025em",
                      lineHeight: 1.35,
                      marginBottom: "12px",
                    }}
                  >
                    {post.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "13.5px",
                      color: "var(--zinc-600)",
                      lineHeight: 1.55,
                      marginBottom: "20px",
                    }}
                  >
                    {post.summary}
                  </p>
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      marginBottom: "16px",
                    }}
                  >
                    {post.keywords.slice(0, 3).map((kw, kwIdx) => (
                      <span
                        key={kwIdx}
                        style={{
                          fontSize: "10.5px",
                          color: "var(--zinc-500)",
                          backgroundColor: "var(--zinc-50)",
                          border: "1px solid var(--zinc-200)",
                          padding: "2px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        #{kw.replace(/\s+/g, "-")}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderTop: "1px solid var(--zinc-100)",
                      paddingTop: "14px",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "var(--zinc-400)" }}>{post.updatedAt}</span>
                    <span
                      style={{
                        fontSize: "12.5px",
                        fontWeight: 750,
                        color: "var(--zinc-900)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <span>Read Guide</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
