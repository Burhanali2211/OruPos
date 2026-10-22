"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RestaurantData, STARTER_MENU_PACKS } from "@/lib/restaurants";
import {
  ShieldIcon,
  InfoIcon,
  ExternalLinkIcon,
  CloseIcon,
  RefreshIcon,
  CheckIcon,
} from "@/components/Icons";

export default function AdminDashboardPage() {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form state
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [location, setLocation] = useState("");
  const [tableCount, setTableCount] = useState("12");
  const [starterPack, setStarterPack] = useState("indian");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdRestaurant, setCreatedRestaurant] = useState<RestaurantData | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Fetch registered restaurants
  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/restaurants");
      if (res.ok) {
        const data = await res.json();
        setRestaurants(data.restaurants || []);
      }
    } catch {
      showToast("Failed to load restaurants from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Form submit: Register new restaurant subdomain
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedSlug = slug.toLowerCase().trim().replace(/[^a-z0-9_-]/g, "");
    if (!normalizedSlug) {
      showToast("Please enter a valid subdomain slug");
      return;
    }
    if (!name.trim()) {
      showToast("Please enter the restaurant name");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: normalizedSlug,
          name: name.trim(),
          tagline: tagline.trim(),
          phone: whatsapp.trim(),
          whatsapp: whatsapp.trim(),
          location: location.trim(),
          tableCount: Number(tableCount) || 12,
          starterPack,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCreatedRestaurant(data.restaurant);
        showToast(`Subdomain "${normalizedSlug}.orupos.in" whitelisted successfully.`);
        // Reset form
        setSlug("");
        setName("");
        setTagline("");
        setWhatsapp("");
        setLocation("");
        fetchRestaurants();
      } else {
        showToast(data.error || "Failed to register subdomain");
      }
    } catch {
      showToast("Network error registering subdomain");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle restaurant active status (strict whitelist gating)
  const handleToggleActive = async (targetSlug: string) => {
    try {
      const res = await fetch("/api/restaurants", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: targetSlug, action: "toggle" }),
      });

      if (res.ok) {
        const data = await res.json();
        showToast(`Status updated: ${targetSlug} is now ${data.active ? "ACTIVE" : "INACTIVE"}`);
        fetchRestaurants();
      }
    } catch {
      showToast("Failed to update status");
    }
  };

  // Delete restaurant
  const handleDelete = async (targetSlug: string) => {
    if (!confirm(`Are you sure you want to remove "${targetSlug}.orupos.in" from the whitelist?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/restaurants?slug=${targetSlug}`, {
        method: "DELETE",
      });

      if (res.ok) {
        showToast(`Removed "${targetSlug}" from whitelist`);
        fetchRestaurants();
      }
    } catch {
      showToast("Failed to delete restaurant");
    }
  };

  const filteredRestaurants = restaurants.filter((r) => {
    const q = searchFilter.toLowerCase().trim();
    return (
      r.slug.toLowerCase().includes(q) ||
      r.name.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q)
    );
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAF8F5",
        color: "#1F1F1F",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Top Admin Bar */}
      <header
        style={{
          backgroundColor: "#13271F",
          color: "#FFFFFF",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: "#E5A93C",
              color: "#13271F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: "18px",
            }}
          >
            O
          </div>
          <div>
            <div style={{ fontSize: "16px", fontWeight: 800, letterSpacing: "-0.01em" }}>
              OruPos Subdomain Manager
            </div>
            <div style={{ fontSize: "11px", color: "#A7F3D0" }}>
              Strict Domain Whitelist & Multi-Tenant Registry
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <Link
            href="/"
            style={{
              color: "#CBD5E1",
              fontSize: "13px",
              textDecoration: "none",
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span>View orupos.in</span>
            <ExternalLinkIcon size={12} color="#CBD5E1" />
          </Link>
          <Link
            href="/demo"
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "#FFFFFF",
              padding: "6px 14px",
              borderRadius: "8px",
              fontSize: "12px",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Preview Demo Menu
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 20px 60px" }}>
        {/* Banner Alert: Strict Whitelist Status */}
        <div
          style={{
            backgroundColor: "#ECFDF5",
            border: "1px solid #A7F3D0",
            borderRadius: "14px",
            padding: "16px 20px",
            marginBottom: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ShieldIcon size={20} color="#065F46" />
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#065F46" }}>
                Strict Subdomain Gating Active
              </div>
              <div style={{ fontSize: "12px", color: "#047857" }}>
                Only domains listed below can serve live digital menus. Unregistered subdomains are automatically rejected with a 404 page.
              </div>
            </div>
          </div>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#065F46" }}>
            {restaurants.filter((r) => r.active).length} Active Subdomains
          </div>
        </div>

        {/* Success Alert after creating a restaurant */}
        {createdRestaurant && (
          <div
            style={{
              backgroundColor: "#FFFBEB",
              border: "1px solid #FDE68A",
              borderRadius: "14px",
              padding: "18px 22px",
              marginBottom: "28px",
              boxShadow: "0 4px 15px rgba(229, 169, 60, 0.15)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                  <CheckIcon size={16} color="#92400E" />
                  <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#92400E", margin: 0 }}>
                    New Restaurant Whitelisted Successfully
                  </h3>
                </div>
                <p style={{ fontSize: "13px", color: "#B45309", margin: "0 0 12px" }}>
                  <strong>{createdRestaurant.name}</strong> is now live on subdomain:{" "}
                  <code style={{ background: "#FEF3C7", padding: "2px 6px", borderRadius: "4px" }}>
                    {createdRestaurant.slug}.orupos.in
                  </code>
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  <Link
                    href={`/r/${createdRestaurant.slug}`}
                    target="_blank"
                    style={{
                      backgroundColor: "#1E3A2F",
                      color: "#FFFFFF",
                      padding: "7px 14px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 700,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>Open Menu View (/r/{createdRestaurant.slug})</span>
                    <ExternalLinkIcon size={12} color="#FFFFFF" />
                  </Link>
                  <Link
                    href={`/r/${createdRestaurant.slug}?table=01`}
                    target="_blank"
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "#1E3A2F",
                      border: "1px solid #1E3A2F",
                      padding: "7px 14px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 700,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>Test Table 01 (Instant Order)</span>
                    <ExternalLinkIcon size={12} color="#1E3A2F" />
                  </Link>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCreatedRestaurant(null)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Close message"
              >
                <CloseIcon size={14} color="#92400E" />
              </button>
            </div>
          </div>
        )}

        {/* Two-Column Grid: Form on Left, Whitelist Table on Right */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "28px" }}>
          {/* Left Column: Register New Restaurant Subdomain */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "18px",
              padding: "26px",
              border: "1px solid #ECE7E1",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#1E3A2F", marginBottom: "4px" }}>
                Add New Restaurant Domain
              </h2>
              <p style={{ fontSize: "13px", color: "#6B7280" }}>
                Whitelist a new subdomain and configure restaurant details for live ordering.
              </p>
            </div>

            <form onSubmit={handleRegister}>
              {/* Subdomain Slug */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "6px" }}>
                  Subdomain Slug <span style={{ color: "#EF4444" }}>*</span>
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="text"
                    required
                    placeholder="e.g. royalbiryani"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                    style={{
                      flex: 1,
                      padding: "10px 12px",
                      border: "1px solid #D1D5DB",
                      borderTopLeftRadius: "8px",
                      borderBottomLeftRadius: "8px",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                  <span
                    style={{
                      backgroundColor: "#F3F4F6",
                      color: "#4B5563",
                      padding: "10px 12px",
                      fontSize: "13px",
                      fontWeight: 700,
                      border: "1px solid #D1D5DB",
                      borderLeft: "none",
                      borderTopRightRadius: "8px",
                      borderBottomRightRadius: "8px",
                    }}
                  >
                    .orupos.in
                  </span>
                </div>
                <div style={{ fontSize: "11px", color: "#6B7280", marginTop: "4px" }}>
                  {slug ? (
                    <span>
                      Live address: <strong>{slug}.orupos.in</strong>
                    </span>
                  ) : (
                    <span>Only lowercase letters, numbers, and hyphens.</span>
                  )}
                </div>
              </div>

              {/* Restaurant Name */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "6px" }}>
                  Restaurant Name <span style={{ color: "#EF4444" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Biryani & Kebab Palace"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              {/* Tagline / Cuisines */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "6px" }}>
                  Tagline / Cuisines
                </label>
                <input
                  type="text"
                  placeholder="e.g. Authentic Hyderabadi Dum Biryani • Mughlai Kebabs"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              {/* WhatsApp Order Receiving Number */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "6px" }}>
                  WhatsApp Number (To Receive Orders) <span style={{ color: "#EF4444" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 916005659527 (with country code)"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
                <div style={{ fontSize: "11px", color: "#6B7280", marginTop: "4px" }}>
                  Customer table orders will be sent directly to this WhatsApp number.
                </div>
              </div>

              {/* Location & Tables Count */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "6px" }}>
                    Location / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Indiranagar, Bengaluru"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #D1D5DB",
                      borderRadius: "8px",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "6px" }}>
                    Table Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    placeholder="12"
                    value={tableCount}
                    onChange={(e) => setTableCount(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #D1D5DB",
                      borderRadius: "8px",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Starter Menu Pack */}
              <div style={{ marginBottom: "22px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "6px" }}>
                  Initial Menu Starter Pack
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {Object.entries(STARTER_MENU_PACKS).map(([key, pack]) => (
                    <label
                      key={key}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "9px 12px",
                        borderRadius: "8px",
                        border: starterPack === key ? "1.5px solid #1E3A2F" : "1px solid #E5E7EB",
                        backgroundColor: starterPack === key ? "#ECFDF5" : "#FFFFFF",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      <input
                        type="radio"
                        name="starterPack"
                        value={key}
                        checked={starterPack === key}
                        onChange={() => setStarterPack(key)}
                      />
                      <div>
                        <strong>{pack.name}</strong>
                        <span style={{ fontSize: "11px", color: "#6B7280", marginLeft: "6px" }}>
                          ({pack.items.length} items pre-configured)
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  backgroundColor: "#1E3A2F",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "10px",
                  padding: "13px 20px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <span>{isSubmitting ? "Whitelisting Subdomain..." : "Whitelist & Activate Subdomain"}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Active Whitelisted Subdomains */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "18px",
              padding: "26px",
              border: "1px solid #ECE7E1",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#1E3A2F", margin: 0 }}>
                  Whitelisted Subdomains
                </h2>
                <div style={{ fontSize: "12px", color: "#6B7280" }}>
                  {restaurants.length} registered restaurant profiles
                </div>
              </div>

              <button
                type="button"
                onClick={fetchRestaurants}
                style={{
                  backgroundColor: "#F3F4F6",
                  border: "1px solid #D1D5DB",
                  borderRadius: "8px",
                  padding: "6px 12px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <RefreshIcon size={12} color="#374151" />
                <span>Refresh</span>
              </button>
            </div>

            {/* Filter Search */}
            <div style={{ marginBottom: "16px" }}>
              <input
                type="text"
                placeholder="Filter by name, slug, or city..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 14px",
                  border: "1px solid #D1D5DB",
                  borderRadius: "8px",
                  fontSize: "13px",
                  backgroundColor: "#F9FAFB",
                  outline: "none",
                }}
              />
            </div>

            {/* Restaurant List */}
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
              {loading ? (
                <div style={{ textAlign: "center", padding: "40px", color: "#6B7280", fontSize: "13px" }}>
                  Loading registered domains...
                </div>
              ) : filteredRestaurants.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", color: "#6B7280", fontSize: "13px" }}>
                  No restaurants match your search.
                </div>
              ) : (
                filteredRestaurants.map((res) => (
                  <div
                    key={res.slug}
                    style={{
                      border: "1px solid #ECE7E1",
                      borderRadius: "12px",
                      padding: "16px",
                      backgroundColor: res.active ? "#FFFFFF" : "#F9FAFB",
                      opacity: res.active ? 1 : 0.75,
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span
                            style={{
                              backgroundColor: "#F3F4F6",
                              color: "#1E3A2F",
                              fontFamily: "monospace",
                              fontSize: "12px",
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: "6px",
                              border: "1px solid #E5E7EB",
                            }}
                          >
                            {res.slug}.orupos.in
                          </span>

                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 700,
                              padding: "2px 7px",
                              borderRadius: "4px",
                              backgroundColor: res.active ? "#ECFDF5" : "#FEF2F2",
                              color: res.active ? "#065F46" : "#991B1B",
                            }}
                          >
                            {res.active ? "ACTIVE" : "GATED / INACTIVE"}
                          </span>
                        </div>

                        <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#111827", margin: "6px 0 2px" }}>
                          {res.name}
                        </h3>
                        <div style={{ fontSize: "12px", color: "#6B7280" }}>
                          {res.location} • {res.tableCount} Tables • {res.items.length} Dishes
                        </div>
                      </div>

                      {/* Toggle Active status */}
                      <button
                        type="button"
                        onClick={() => handleToggleActive(res.slug)}
                        style={{
                          backgroundColor: res.active ? "#FEE2E2" : "#DCFCE7",
                          color: res.active ? "#991B1B" : "#166534",
                          border: "none",
                          borderRadius: "6px",
                          padding: "5px 10px",
                          fontSize: "11px",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                        title={res.active ? "Deactivate to block subdomain access" : "Activate to whitelist subdomain access"}
                      >
                        {res.active ? "Deactivate" : "Activate"}
                      </button>
                    </div>

                    {/* Action Links */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "10px",
                        borderTop: "1px dashed #E5E7EB",
                        marginTop: "10px",
                        fontSize: "12px",
                      }}
                    >
                      <div style={{ display: "flex", gap: "12px" }}>
                        <Link
                          href={`/r/${res.slug}`}
                          target="_blank"
                          style={{
                            color: "#1E3A2F",
                            fontWeight: 700,
                            textDecoration: "underline",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "3px",
                          }}
                        >
                          <span>Preview Menu</span>
                          <ExternalLinkIcon size={11} color="#1E3A2F" />
                        </Link>
                        <Link
                          href={`/r/${res.slug}?table=01`}
                          target="_blank"
                          style={{
                            color: "#059669",
                            fontWeight: 600,
                            textDecoration: "underline",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "3px",
                          }}
                        >
                          <span>Test Table 01</span>
                          <ExternalLinkIcon size={11} color="#059669" />
                        </Link>
                      </div>

                      {res.slug !== "demo" && (
                        <button
                          type="button"
                          onClick={() => handleDelete(res.slug)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#EF4444",
                            fontSize: "11px",
                            cursor: "pointer",
                            padding: 0,
                            textDecoration: "underline",
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Informational Architecture Guide */}
        <div
          style={{
            marginTop: "40px",
            backgroundColor: "#FFFFFF",
            borderRadius: "18px",
            padding: "28px",
            border: "1px solid #ECE7E1",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <InfoIcon size={20} color="#1E3A2F" />
            <h2 style={{ fontSize: "17px", fontWeight: 800, color: "#1E3A2F", margin: 0 }}>
              Architecture Guide: Cloudflare R2 vs. VPS for OruPos
            </h2>
          </div>
          <p style={{ fontSize: "13px", color: "#4B5563", lineHeight: 1.6, marginBottom: "16px" }}>
            You asked whether you should use <strong>Cloudflare R2</strong> or your <strong>VPS</strong> for this platform.
            Here is the exact production recommendation:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            <div style={{ backgroundColor: "#F0FDF4", padding: "16px", borderRadius: "12px", border: "1px solid #BBF7D0" }}>
              <div style={{ fontWeight: 800, color: "#166534", fontSize: "14px", marginBottom: "6px" }}>
                1. Wildcard Subdomains: Keep on Vercel
              </div>
              <div style={{ fontSize: "12px", color: "#15803D", lineHeight: 1.5 }}>
                Vercel provides automatic wildcard SSL (<code>*.orupos.in</code>) with zero renewal headaches or Nginx maintenance. On a VPS, you would need complex Certbot DNS-01 API hooks and Nginx proxy setups that break if not monitored.
              </div>
            </div>

            <div style={{ backgroundColor: "#EFF6FF", padding: "16px", borderRadius: "12px", border: "1px solid #BFDBFE" }}>
              <div style={{ fontWeight: 800, color: "#1E40AF", fontSize: "14px", marginBottom: "6px" }}>
                2. Dish Images & Media: Use Cloudflare R2
              </div>
              <div style={{ fontSize: "12px", color: "#1D4ED8", lineHeight: 1.5 }}>
                Cloudflare R2 has <strong>$0 egress bandwidth fees</strong>, free 10 GB storage, and a global edge CDN. Dish photos won&apos;t consume VPS disk space or bandwidth limits.
              </div>
            </div>

            <div style={{ backgroundColor: "#FAF5FF", padding: "16px", borderRadius: "12px", border: "1px solid #E9D5FF" }}>
              <div style={{ fontWeight: 800, color: "#6B21A8", fontSize: "14px", marginBottom: "6px" }}>
                3. Your VPS: Best for Central Database
              </div>
              <div style={{ fontSize: "12px", color: "#7E22CE", lineHeight: 1.5 }}>
                Use your VPS to host a central <strong>PostgreSQL database</strong> or a <strong>WebSocket server</strong> for instant kitchen display screens (KDS), keeping frontend serverless on Vercel.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            backgroundColor: "#111827",
            color: "#FFFFFF",
            padding: "12px 24px",
            borderRadius: "30px",
            fontSize: "13px",
            fontWeight: 600,
            zIndex: 100,
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
