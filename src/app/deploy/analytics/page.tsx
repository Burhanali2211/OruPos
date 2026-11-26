"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Users,
  QrCode,
  Link as LinkIcon,
  ShoppingBag,
  TrendingUp,
  Clock,
  Smartphone,
  Laptop,
  Tablet,
  Search,
  Utensils,
  RefreshCw,
  ArrowLeft,
  ExternalLink,
  ChevronRight,
  Flame,
  CheckCircle2,
  Calendar,
  Layers,
  Activity,
  MousePointerClick,
  Sparkles,
} from "lucide-react";
import { AnalyticsSummary, AnalyticsEvent } from "@/lib/analytics";
import { DeployedRestaurant } from "@/app/api/deploy-restaurant/route";

function AnalyticsDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSlug = searchParams.get("slug") || "diamondcafe";
  const [selectedSlug, setSelectedSlug] = useState<string>(initialSlug);
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">("day");
  const [restaurants, setRestaurants] = useState<DeployedRestaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [activeMetric, setActiveMetric] = useState<"visitors" | "scans" | "linkVisits" | "orders" | "dishClicks">("visitors");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Sync selectedSlug with URL if user navigates
  useEffect(() => {
    const slugFromUrl = searchParams.get("slug");
    if (slugFromUrl && slugFromUrl !== selectedSlug) {
      setSelectedSlug(slugFromUrl);
    }
  }, [searchParams]);

  // Load restaurants list
  useEffect(() => {
    async function loadRestaurants() {
      try {
        const res = await fetch("/api/deploy-restaurant");
        if (res.ok) {
          const json = await res.json();
          setRestaurants(json.restaurants || []);
        }
      } catch {
        // ignore
      }
    }
    loadRestaurants();
  }, []);

  // Fetch real analytics data
  const fetchAnalytics = async (showRefreshSpinner = false) => {
    try {
      if (showRefreshSpinner) setRefreshing(true);
      else setLoading(true);

      const res = await fetch(
        `/api/analytics?slug=${encodeURIComponent(selectedSlug)}&period=${period}`
      );
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setData(json.data);
        }
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [selectedSlug, period]);

  const handleSlugChange = (newSlug: string) => {
    setSelectedSlug(newSlug);
    router.push(`/deploy/analytics?slug=${encodeURIComponent(newSlug)}`);
  };

  const currentRestaurant = restaurants.find((r) => r.slug === selectedSlug);
  const displayName = currentRestaurant?.name || (selectedSlug === "all" ? "All Subdomains" : selectedSlug);
  const subdomainUrl = selectedSlug !== "all" ? `https://${selectedSlug}.orupos.in` : "https://orupos.in";

  // Chart max value calculation
  const maxChartValue = data?.timeSeries
    ? Math.max(...data.timeSeries.map((t) => t[activeMetric] || 0), 1)
    : 10;

  const formatRelativeTime = (timestamp: number) => {
    const diff = Math.max(0, Date.now() - timestamp);
    const secs = Math.floor(diff / 1000);
    if (secs < 60) return "Just now";
    const mins = Math.floor(secs / 60);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const formatTimestamp = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0F172A", color: "#F8FAFC", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Top Navigation Bar */}
      <header
        style={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          backgroundColor: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          padding: "14px 24px",
        }}
      >
        <div style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          {/* Left: Breadcrumbs & Restaurant Switcher */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href="/deploy"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#94A3B8",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 600,
                padding: "6px 10px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                transition: "all 0.15s ease",
              }}
            >
              <ArrowLeft size={14} />
              <span>Deployments</span>
            </Link>

            <span style={{ color: "#475569" }}>/</span>

            {/* Restaurant Selector */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <select
                value={selectedSlug}
                onChange={(e) => handleSlugChange(e.target.value)}
                style={{
                  backgroundColor: "#1E293B",
                  color: "#F8FAFC",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  padding: "7px 12px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="all">All Network Subdomains (*.orupos.in)</option>
                {restaurants.map((res) => (
                  <option key={res.slug} value={res.slug}>
                    {res.name} ({res.subdomain})
                  </option>
                ))}
              </select>

              {selectedSlug !== "all" && (
                <a
                  href={subdomainUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#38BDF8",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "12px",
                    fontWeight: 600,
                    textDecoration: "none",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    backgroundColor: "rgba(56, 189, 248, 0.08)",
                    border: "1px solid rgba(56, 189, 248, 0.2)",
                  }}
                  title="Open live website in new tab"
                >
                  <span>{selectedSlug}.orupos.in</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>

          {/* Right: Period Selector & Live Indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                fontWeight: 650,
                color: "#10B981",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                padding: "4px 10px",
                borderRadius: "20px",
                border: "1px solid rgba(16, 185, 129, 0.25)",
              }}
            >
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#10B981", animation: "pulse 2s infinite" }}></span>
              <span>100% Real Live Analytics</span>
            </div>

            {/* Timeframe Tabs */}
            <div style={{ display: "inline-flex", backgroundColor: "#1E293B", padding: "3px", borderRadius: "10px", border: "1px solid #334155" }}>
              {[
                { id: "day", label: "Today" },
                { id: "week", label: "7 Days" },
                { id: "month", label: "30 Days" },
                { id: "year", label: "12 Months" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setPeriod(t.id as any)}
                  style={{
                    padding: "6px 12px",
                    fontSize: "12px",
                    fontWeight: 700,
                    borderRadius: "7px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: period === t.id ? "#047857" : "transparent",
                    color: period === t.id ? "#FFFFFF" : "#94A3B8",
                    transition: "all 0.15s ease",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => fetchAnalytics(true)}
              disabled={refreshing}
              title="Refresh Analytics"
              style={{
                backgroundColor: "#1E293B",
                border: "1px solid #334155",
                color: "#94A3B8",
                cursor: "pointer",
                padding: "7px 10px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main style={{ maxWidth: "1360px", margin: "0 auto", padding: "28px 24px 60px" }}>
        {/* Title Area */}
        <div style={{ marginBottom: "28px", display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: 800, margin: 0, color: "#FFFFFF", display: "flex", alignItems: "center", gap: "10px" }}>
              <span>{displayName}</span>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#38BDF8", backgroundColor: "rgba(56, 189, 248, 0.1)", padding: "3px 10px", borderRadius: "12px", border: "1px solid rgba(56, 189, 248, 0.2)" }}>
                {period === "day" ? "Today's Live Breakdown" : period === "week" ? "Last 7 Days" : period === "month" ? "Last 30 Days" : "Last 12 Months"}
              </span>
            </h1>
            <p style={{ fontSize: "14px", color: "#94A3B8", margin: "6px 0 0" }}>
              Live customer visits, QR table scans vs link attribution, menu dish views, and orders.
            </p>
          </div>

          <div style={{ fontSize: "13px", color: "#64748B" }}>
            Peak Rush: <strong style={{ color: "#F59E0B" }}>{data?.peakHour || "Calculating..."}</strong>
          </div>
        </div>

        {/* 6 Key Metric Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "28px" }}>
          {/* Card 1: Total Visitors */}
          <div
            onClick={() => setActiveMetric("visitors")}
            style={{
              backgroundColor: "#1E293B",
              borderRadius: "14px",
              padding: "18px 20px",
              border: activeMetric === "visitors" ? "2px solid #10B981" : "1px solid #334155",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#94A3B8" }}>Total Visitors</span>
              <div style={{ padding: "8px", borderRadius: "10px", backgroundColor: "rgba(16, 185, 129, 0.12)", color: "#10B981" }}>
                <Users size={18} />
              </div>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#FFFFFF", lineHeight: 1 }}>
              {data?.totalVisitors ?? 0}
            </div>
            <div style={{ fontSize: "12px", color: "#64748B", marginTop: "8px" }}>
              100% verified customer visits
            </div>
          </div>

          {/* Card 2: QR Table Scans */}
          <div
            onClick={() => setActiveMetric("scans")}
            style={{
              backgroundColor: "#1E293B",
              borderRadius: "14px",
              padding: "18px 20px",
              border: activeMetric === "scans" ? "2px solid #8B5CF6" : "1px solid #334155",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#94A3B8" }}>QR Table Scans</span>
              <div style={{ padding: "8px", borderRadius: "10px", backgroundColor: "rgba(139, 92, 246, 0.12)", color: "#8B5CF6" }}>
                <QrCode size={18} />
              </div>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#FFFFFF", lineHeight: 1 }}>
              {data?.totalScans ?? 0}
            </div>
            <div style={{ fontSize: "12px", color: "#A78BFA", marginTop: "8px" }}>
              {data?.sourceAttribution.qrPercentage ?? 0}% of all visitors scanned table QR
            </div>
          </div>

          {/* Card 3: Link / Direct Visits */}
          <div
            onClick={() => setActiveMetric("linkVisits")}
            style={{
              backgroundColor: "#1E293B",
              borderRadius: "14px",
              padding: "18px 20px",
              border: activeMetric === "linkVisits" ? "2px solid #38BDF8" : "1px solid #334155",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#94A3B8" }}>Direct / Link Visits</span>
              <div style={{ padding: "8px", borderRadius: "10px", backgroundColor: "rgba(56, 189, 248, 0.12)", color: "#38BDF8" }}>
                <LinkIcon size={18} />
              </div>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#FFFFFF", lineHeight: 1 }}>
              {data?.totalLinkVisits ?? 0}
            </div>
            <div style={{ fontSize: "12px", color: "#38BDF8", marginTop: "8px" }}>
              {data?.sourceAttribution.linkPercentage ?? 0}% via social, maps or web
            </div>
          </div>

          {/* Card 4: Dish Views & Clicks */}
          <div
            onClick={() => setActiveMetric("dishClicks")}
            style={{
              backgroundColor: "#1E293B",
              borderRadius: "14px",
              padding: "18px 20px",
              border: activeMetric === "dishClicks" ? "2px solid #F59E0B" : "1px solid #334155",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#94A3B8" }}>Dish Clicks</span>
              <div style={{ padding: "8px", borderRadius: "10px", backgroundColor: "rgba(245, 158, 11, 0.12)", color: "#F59E0B" }}>
                <MousePointerClick size={18} />
              </div>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#FFFFFF", lineHeight: 1 }}>
              {data?.totalDishClicks ?? 0}
            </div>
            <div style={{ fontSize: "12px", color: "#FBBF24", marginTop: "8px" }}>
              Menu items clicked by customers
            </div>
          </div>

          {/* Card 5: Orders Placed */}
          <div
            onClick={() => setActiveMetric("orders")}
            style={{
              backgroundColor: "#1E293B",
              borderRadius: "14px",
              padding: "18px 20px",
              border: activeMetric === "orders" ? "2px solid #EC4899" : "1px solid #334155",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#94A3B8" }}>Orders Placed</span>
              <div style={{ padding: "8px", borderRadius: "10px", backgroundColor: "rgba(236, 72, 153, 0.12)", color: "#EC4899" }}>
                <ShoppingBag size={18} />
              </div>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#FFFFFF", lineHeight: 1 }}>
              {data?.totalOrders ?? 0}
            </div>
            <div style={{ fontSize: "12px", color: "#F472B6", marginTop: "8px" }}>
              {data?.totalVisitors ? Math.round(((data.totalOrders) / data.totalVisitors) * 100) : 0}% customer conversion
            </div>
          </div>

          {/* Card 6: Order Revenue */}
          <div
            style={{
              backgroundColor: "#1E293B",
              borderRadius: "14px",
              padding: "18px 20px",
              border: "1px solid #334155",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#94A3B8" }}>Order Volume</span>
              <div style={{ padding: "8px", borderRadius: "10px", backgroundColor: "rgba(34, 197, 94, 0.12)", color: "#22C55E" }}>
                <TrendingUp size={18} />
              </div>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#FFFFFF", lineHeight: 1 }}>
              ₹{data?.totalOrderRevenue ?? 0}
            </div>
            <div style={{ fontSize: "12px", color: "#86EFAC", marginTop: "8px" }}>
              Direct digitally transmitted sales
            </div>
          </div>
        </div>

        {/* Interactive Chart Section */}
        <div style={{ backgroundColor: "#1E293B", borderRadius: "18px", border: "1px solid #334155", padding: "24px", marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 800, margin: 0, color: "#FFFFFF" }}>
                Activity Timeline ({period === "day" ? "Hourly Today" : period === "week" ? "Last 7 Days" : period === "month" ? "Weekly Buckets" : "Monthly"})
              </h2>
              <p style={{ fontSize: "13px", color: "#94A3B8", margin: "4px 0 0" }}>
                Hover over bars to inspect real timestamps and metrics.
              </p>
            </div>

            {/* Metric Toggle Filters */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>Showing:</span>
              {[
                { key: "visitors", label: "Visitors", color: "#10B981" },
                { key: "scans", label: "QR Scans", color: "#8B5CF6" },
                { key: "linkVisits", label: "Direct Links", color: "#38BDF8" },
                { key: "dishClicks", label: "Dish Views", color: "#F59E0B" },
                { key: "orders", label: "Orders", color: "#EC4899" },
              ].map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setActiveMetric(m.key as any)}
                  style={{
                    backgroundColor: activeMetric === m.key ? m.color : "#0F172A",
                    color: activeMetric === m.key ? "#FFFFFF" : "#94A3B8",
                    border: `1px solid ${activeMetric === m.key ? m.color : "#334155"}`,
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div style={{ width: "100%", height: "240px", display: "flex", alignItems: "flex-end", gap: period === "day" ? "4px" : "12px", padding: "10px 0 24px", position: "relative" }}>
            {data?.timeSeries && data.timeSeries.length > 0 ? (
              data.timeSeries.map((t, idx) => {
                const val = t[activeMetric] || 0;
                const heightPct = maxChartValue > 0 ? Math.max((val / maxChartValue) * 100, val > 0 ? 8 : 2) : 2;
                const isHovered = hoveredIndex === idx;

                const metricColor =
                  activeMetric === "visitors"
                    ? "#10B981"
                    : activeMetric === "scans"
                    ? "#8B5CF6"
                    : activeMetric === "linkVisits"
                    ? "#38BDF8"
                    : activeMetric === "dishClicks"
                    ? "#F59E0B"
                    : "#EC4899";

                return (
                  <div
                    key={t.label}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      flex: 1,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    {/* Tooltip */}
                    {isHovered && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "calc(100% + 8px)",
                          zIndex: 20,
                          backgroundColor: "#0F172A",
                          border: "1px solid #475569",
                          borderRadius: "8px",
                          padding: "8px 12px",
                          fontSize: "11px",
                          fontWeight: 650,
                          color: "#F8FAFC",
                          whiteSpace: "nowrap",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                          pointerEvents: "none",
                        }}
                      >
                        <div style={{ fontWeight: 800, color: "#38BDF8", marginBottom: "3px" }}>{t.label}</div>
                        <div>Visitors: <strong style={{ color: "#10B981" }}>{t.visitors}</strong></div>
                        <div>QR Scans: <strong style={{ color: "#8B5CF6" }}>{t.scans}</strong></div>
                        <div>Direct Links: <strong style={{ color: "#38BDF8" }}>{t.linkVisits}</strong></div>
                        <div>Dish Views: <strong style={{ color: "#F59E0B" }}>{t.dishClicks}</strong></div>
                        <div>Orders: <strong style={{ color: "#EC4899" }}>{t.orders}</strong></div>
                      </div>
                    )}

                    {/* Bar */}
                    <div
                      style={{
                        width: "100%",
                        height: `${heightPct}%`,
                        backgroundColor: val > 0 ? (isHovered ? "#FFFFFF" : metricColor) : "#334155",
                        borderRadius: "4px 4px 0 0",
                        transition: "height 0.25s ease, background-color 0.15s ease",
                      }}
                    />

                    {/* X-axis Label */}
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-20px",
                        fontSize: "10px",
                        fontWeight: 600,
                        color: isHovered ? "#F8FAFC" : "#64748B",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {period === "day" && idx % 3 !== 0 && !isHovered ? "" : t.label}
                    </span>
                  </div>
                );
              })
            ) : (
              <div style={{ margin: "auto", color: "#64748B", fontSize: "14px" }}>No timeline data recorded yet.</div>
            )}
          </div>
        </div>

        {/* 3-Column Detailed Breakdown Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px", marginBottom: "28px" }}>
          {/* Column 1: Source Attribution (QR Scan vs Link) */}
          <div style={{ backgroundColor: "#1E293B", borderRadius: "18px", border: "1px solid #334155", padding: "20px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 800, margin: "0 0 16px", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "8px" }}>
              <QrCode size={16} color="#8B5CF6" />
              <span>Acquisition: QR Code vs Direct Link</span>
            </h3>

            {/* Split Progress Bar */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{ height: "12px", width: "100%", backgroundColor: "#334155", borderRadius: "8px", overflow: "hidden", display: "flex" }}>
                <div style={{ width: `${data?.sourceAttribution.qrPercentage || 0}%`, backgroundColor: "#8B5CF6" }} title="QR Code Scans" />
                <div style={{ width: `${data?.sourceAttribution.linkPercentage || 0}%`, backgroundColor: "#38BDF8" }} title="Direct Links" />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "12px" }}>
                <span style={{ color: "#A78BFA", fontWeight: 700 }}>
                  ● QR Scans: {data?.sourceAttribution.qrCount || 0} ({data?.sourceAttribution.qrPercentage || 0}%)
                </span>
                <span style={{ color: "#38BDF8", fontWeight: 700 }}>
                  ● Direct Links: {data?.sourceAttribution.linkCount || 0} ({data?.sourceAttribution.linkPercentage || 0}%)
                </span>
              </div>
            </div>

            {/* Top Referrer Domains */}
            <div style={{ borderTop: "1px solid #334155", paddingTop: "14px" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#94A3B8", marginBottom: "10px" }}>
                External Referrers & Channels
              </div>
              {data?.sourceAttribution.topReferrers && data.sourceAttribution.topReferrers.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {data.sourceAttribution.topReferrers.map((ref) => (
                    <div key={ref.referrer} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", padding: "6px 8px", backgroundColor: "#0F172A", borderRadius: "6px" }}>
                      <span style={{ color: "#E2E8F0" }}>{ref.referrer}</span>
                      <strong style={{ color: "#38BDF8" }}>{ref.count} visits</strong>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: "12px", color: "#64748B", fontStyle: "italic" }}>
                  Most traffic currently arrives via on-table QR code scans or direct URL navigation.
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Most Clicked Dishes */}
          <div style={{ backgroundColor: "#1E293B", borderRadius: "18px", border: "1px solid #334155", padding: "20px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 800, margin: "0 0 16px", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "8px" }}>
              <Utensils size={16} color="#F59E0B" />
              <span>Most Viewed & Clicked Menu Items</span>
            </h3>

            {data?.topDishes && data.topDishes.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {data.topDishes.map((dish, i) => (
                  <div
                    key={dish.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      backgroundColor: "#0F172A",
                      borderRadius: "8px",
                      border: "1px solid #334155",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 800, color: "#94A3B8", width: "16px" }}>#{i + 1}</span>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#FFFFFF" }}>{dish.name}</div>
                        {dish.category && (
                          <div style={{ fontSize: "11px", color: "#64748B" }}>{dish.category}</div>
                        )}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "13px", fontWeight: 800, color: "#F59E0B" }}>
                        {dish.clicks} view{dish.clicks === 1 ? "" : "s"}
                      </span>
                      {dish.orders > 0 && (
                        <div style={{ fontSize: "11px", color: "#EC4899" }}>{dish.orders} ordered</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: "13px", color: "#64748B", fontStyle: "italic", padding: "16px 0" }}>
                Dish clicks will automatically rank here as customers browse menu items.
              </div>
            )}
          </div>

          {/* Column 3: Tables Scanned & Device Share */}
          <div style={{ backgroundColor: "#1E293B", borderRadius: "18px", border: "1px solid #334155", padding: "20px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 800, margin: "0 0 16px", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "8px" }}>
              <Layers size={16} color="#10B981" />
              <span>Top Active Dining Tables</span>
            </h3>

            {data?.topTables && data.topTables.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                {data.topTables.map((t) => (
                  <div
                    key={t.table}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      backgroundColor: "#0F172A",
                      borderRadius: "8px",
                      border: "1px solid #334155",
                    }}
                  >
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#FFFFFF" }}>{t.table}</span>
                    <div style={{ display: "flex", gap: "10px", fontSize: "12px" }}>
                      <span style={{ color: "#A78BFA", fontWeight: 700 }}>{t.scans} scan{t.scans === 1 ? "" : "s"}</span>
                      {t.orders > 0 && (
                        <span style={{ color: "#EC4899", fontWeight: 700 }}>{t.orders} order{t.orders === 1 ? "" : "s"}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: "13px", color: "#64748B", fontStyle: "italic", marginBottom: "20px" }}>
                No table scans yet (scan with ?table=01 QR code to see tables here).
              </div>
            )}

            {/* Device Distribution */}
            <div style={{ borderTop: "1px solid #334155", paddingTop: "14px" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#94A3B8", marginBottom: "10px" }}>
                Customer Devices
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ flex: 1, backgroundColor: "#0F172A", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
                  <Smartphone size={16} color="#38BDF8" style={{ margin: "0 auto 4px" }} />
                  <div style={{ fontSize: "14px", fontWeight: 800 }}>{data?.deviceShare.mobile || 0}%</div>
                  <div style={{ fontSize: "10px", color: "#64748B" }}>Mobile</div>
                </div>
                <div style={{ flex: 1, backgroundColor: "#0F172A", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
                  <Laptop size={16} color="#94A3B8" style={{ margin: "0 auto 4px" }} />
                  <div style={{ fontSize: "14px", fontWeight: 800 }}>{data?.deviceShare.desktop || 0}%</div>
                  <div style={{ fontSize: "10px", color: "#64748B" }}>Desktop</div>
                </div>
                <div style={{ flex: 1, backgroundColor: "#0F172A", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
                  <Tablet size={16} color="#A78BFA" style={{ margin: "0 auto 4px" }} />
                  <div style={{ fontSize: "14px", fontWeight: 800 }}>{data?.deviceShare.tablet || 0}%</div>
                  <div style={{ fontSize: "10px", color: "#64748B" }}>Tablet</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Activity Feed Stream */}
        <div style={{ backgroundColor: "#1E293B", borderRadius: "18px", border: "1px solid #334155", padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0, color: "#FFFFFF", display: "flex", alignItems: "center", gap: "8px" }}>
                <Activity size={18} color="#10B981" />
                <span>Live Event Stream (Real-Time Customer Activity)</span>
              </h3>
              <p style={{ fontSize: "13px", color: "#94A3B8", margin: "4px 0 0" }}>
                Every visit, QR code scan, menu click, and order logged with exact timestamps.
              </p>
            </div>
            <span style={{ fontSize: "12px", color: "#64748B" }}>
              Showing last {data?.recentEvents?.length || 0} real events
            </span>
          </div>

          {data?.recentEvents && data.recentEvents.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {data.recentEvents.map((ev) => {
                const isQR = ev.source === "qr" || ev.eventType === "scan" || Boolean(ev.table);
                const isOrder = ev.eventType === "order";
                const isClick = ev.eventType === "dish_click" || ev.eventType === "cart_add";
                const isSearch = ev.eventType === "search";

                return (
                  <div
                    key={ev.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      backgroundColor: "#0F172A",
                      borderRadius: "10px",
                      border: "1px solid #334155",
                      fontSize: "13px",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      {/* Event Type Badge */}
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 750,
                          padding: "3px 8px",
                          borderRadius: "6px",
                          textTransform: "uppercase",
                          backgroundColor: isOrder
                            ? "rgba(236, 72, 153, 0.15)"
                            : isClick
                            ? "rgba(245, 158, 11, 0.15)"
                            : isSearch
                            ? "rgba(14, 165, 233, 0.15)"
                            : isQR
                            ? "rgba(139, 92, 246, 0.15)"
                            : "rgba(16, 185, 129, 0.15)",
                          color: isOrder
                            ? "#F472B6"
                            : isClick
                            ? "#FBBF24"
                            : isSearch
                            ? "#38BDF8"
                            : isQR
                            ? "#C084FC"
                            : "#34D399",
                        }}
                      >
                        {isOrder ? "Order Placed" : isClick ? "Dish Click" : isSearch ? "Search" : isQR ? "QR Scan" : "Visit"}
                      </span>

                      {/* Event Details */}
                      <span style={{ color: "#E2E8F0", fontWeight: 600 }}>
                        {isOrder && `Order submitted${ev.table ? ` for Table ${ev.table}` : ""}${ev.orderTotal ? ` • ₹${ev.orderTotal}` : ""}`}
                        {isClick && `Viewed dish details: ${ev.dishName || "Menu Item"}${ev.category ? ` (${ev.category})` : ""}`}
                        {isSearch && `Searched menu for: "${ev.query}"`}
                        {!isOrder && !isClick && !isSearch && (
                          isQR
                            ? `Customer scanned QR code on Table ${ev.table || "Dine-In"}`
                            : `Customer visited via direct link / web`
                        )}
                      </span>
                    </div>

                    {/* Metadata & Timestamp */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#64748B", fontSize: "12px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        {ev.device === "mobile" ? <Smartphone size={12} /> : <Laptop size={12} />}
                        <span style={{ textTransform: "capitalize" }}>{ev.device || "device"}</span>
                      </span>

                      <span>•</span>

                      <span title={new Date(ev.timestamp).toLocaleString()}>
                        {formatRelativeTime(ev.timestamp)} ({formatTimestamp(ev.timestamp)})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#64748B" }}>
              No customer events recorded yet in this timeframe. Visit <a href={subdomainUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#38BDF8" }}>{selectedSlug}.orupos.in</a> to generate live activity.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function AnalyticsDashboardPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF" }}>Loading analytics dashboard...</div>}>
      <AnalyticsDashboardContent />
    </Suspense>
  );
}
