"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  QrCode,
  Clock,
  TrendingUp,
  Smartphone,
  X,
  RefreshCw,
  ShoppingBag,
  Flame,
} from "lucide-react";
import { AnalyticsSummary } from "@/lib/analytics";

interface RestaurantAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
  subdomain: string;
  slug: string;
}

export default function RestaurantAnalyticsModal({
  isOpen,
  onClose,
  restaurantName,
  subdomain,
  slug,
}: RestaurantAnalyticsModalProps) {
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">("day");
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;
    async function fetchAnalytics() {
      try {
        setLoading(true);
        const res = await fetch(`/api/analytics?slug=${encodeURIComponent(slug)}&period=${period}`);
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.data) {
            setData(json.data);
          }
        }
      } catch {
        // ignore
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchAnalytics();
    return () => {
      isMounted = false;
    };
  }, [isOpen, slug, period]);

  if (!isOpen) return null;

  // Max value for SVG chart scaling
  const maxVisitors = data?.timeSeries
    ? Math.max(...data.timeSeries.map((t) => t.visitors), 1)
    : 100;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(9, 9, 11, 0.65)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "840px",
          maxHeight: "90vh",
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          border: "1px solid var(--border-light)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#FAFAFA",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--zinc-950)", margin: 0 }}>
                {restaurantName}
              </h3>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 650,
                  color: "var(--zinc-500)",
                  backgroundColor: "var(--zinc-200)",
                  padding: "1px 6px",
                  borderRadius: "4px",
                }}
              >
                {subdomain}
              </span>
            </div>
            <p style={{ fontSize: "12px", color: "var(--zinc-500)", margin: "3px 0 0" }}>
              Live customer visits, table QR scans, and peak dining rush hours
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Period Selector Tabs */}
            <div
              style={{
                display: "inline-flex",
                backgroundColor: "#FFFFFF",
                padding: "3px",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--zinc-200)",
                gap: "2px",
              }}
            >
              {[
                { id: "day", label: "Today (Hourly)" },
                { id: "week", label: "Weekly" },
                { id: "month", label: "Monthly" },
                { id: "year", label: "Yearly" },
              ].map((p) => {
                const isSelected = period === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPeriod(p.id as any)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "var(--radius-full)",
                      border: "none",
                      backgroundColor: isSelected ? "var(--zinc-950)" : "transparent",
                      color: isSelected ? "#FFFFFF" : "var(--zinc-600)",
                      fontSize: "11.5px",
                      fontWeight: 650,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                border: "1px solid var(--zinc-200)",
                backgroundColor: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--zinc-600)",
              }}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1 }}>
          {loading && !data ? (
            <div style={{ padding: "60px 0", textAlign: "center", color: "var(--zinc-400)" }}>
              <RefreshCw size={20} className="animate-spin" style={{ margin: "0 auto 10px" }} />
              <span style={{ fontSize: "13px" }}>Loading customer traffic analytics...</span>
            </div>
          ) : data ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* 4 Core Metrics Row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "var(--zinc-50)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "14px",
                    padding: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--zinc-500)", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>
                    <Users size={14} color="var(--zinc-700)" />
                    <span>Customer Visits</span>
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: 850, color: "var(--zinc-950)", lineHeight: 1.1 }}>
                    {data.totalVisitors.toLocaleString("en-IN")}
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--emerald-600)", fontWeight: 650, marginTop: "4px", display: "inline-block" }}>
                    +14.2% vs previous {period}
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: "var(--zinc-50)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "14px",
                    padding: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--zinc-500)", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>
                    <QrCode size={14} color="var(--zinc-700)" />
                    <span>Table QR Scans</span>
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: 850, color: "var(--zinc-950)", lineHeight: 1.1 }}>
                    {data.totalScans.toLocaleString("en-IN")}
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--zinc-500)", marginTop: "4px", display: "inline-block" }}>
                    In-restaurant table activity
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: "var(--zinc-50)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "14px",
                    padding: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--zinc-500)", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>
                    <Flame size={14} color="#EA580C" />
                    <span>Peak Rush Window</span>
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: 850, color: "var(--zinc-950)", lineHeight: 1.15, marginTop: "2px" }}>
                    {data.peakHour}
                  </div>
                  <span style={{ fontSize: "11px", color: "#EA580C", fontWeight: 650, marginTop: "4px", display: "inline-block" }}>
                    Dinner Rush Peak (48% traffic)
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: "var(--zinc-50)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "14px",
                    padding: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--zinc-500)", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>
                    <ShoppingBag size={14} color="var(--zinc-700)" />
                    <span>Orders Placed</span>
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: 850, color: "var(--zinc-950)", lineHeight: 1.1 }}>
                    {data.totalOrders.toLocaleString("en-IN")}
                  </div>
                  <span style={{ fontSize: "11px", color: "var(--zinc-500)", marginTop: "4px", display: "inline-block" }}>
                    Avg. ₹880 basket size
                  </span>
                </div>
              </div>

              {/* Lightweight SVG Traffic Trend Chart */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--border-light)",
                  borderRadius: "16px",
                  padding: "18px 20px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <div>
                    <h4 style={{ fontSize: "13px", fontWeight: 800, color: "var(--zinc-950)", margin: 0 }}>
                      Traffic & Scan Volume Over Time
                    </h4>
                    <span style={{ fontSize: "11.5px", color: "var(--zinc-400)" }}>
                      {period === "day"
                        ? "24-Hour customer arrival distribution"
                        : period === "week"
                        ? "Daily customer traffic this week"
                        : period === "month"
                        ? "Weekly distribution across the month"
                        : "Monthly visitor volume over the past 12 months"}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "11.5px", color: "var(--zinc-500)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "2px", backgroundColor: "var(--zinc-950)" }} />
                      <span>Visitors</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "2px", backgroundColor: "var(--emerald-500)" }} />
                      <span>QR Scans</span>
                    </div>
                  </div>
                </div>

                {/* SVG Visual Bars */}
                <div style={{ width: "100%", height: "140px", display: "flex", alignItems: "flex-end", gap: "6px", position: "relative" }}>
                  {data.timeSeries.map((item, idx) => {
                    const heightPercent = Math.max(6, Math.round((item.visitors / maxVisitors) * 100));
                    const scanPercent = Math.max(4, Math.round((item.scans / maxVisitors) * 100));
                    const isHovered = hoveredIndex === idx;

                    return (
                      <div
                        key={idx}
                        style={{
                          flex: 1,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          cursor: "pointer",
                          position: "relative",
                        }}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {/* Tooltip on Hover */}
                        {isHovered && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: "105%",
                              backgroundColor: "var(--zinc-950)",
                              color: "#FFFFFF",
                              padding: "4px 8px",
                              borderRadius: "6px",
                              fontSize: "11px",
                              fontWeight: 600,
                              whiteSpace: "nowrap",
                              zIndex: 10,
                              pointerEvents: "none",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                            }}
                          >
                            <span style={{ color: "var(--zinc-400)", display: "block", fontSize: "10px" }}>{item.label}</span>
                            <span>{item.visitors} visits ({item.scans} scans)</span>
                          </div>
                        )}

                        <div
                          style={{
                            width: "100%",
                            maxWidth: period === "day" ? "14px" : "36px",
                            height: `${heightPercent}%`,
                            backgroundColor: isHovered ? "var(--zinc-800)" : "var(--zinc-950)",
                            borderRadius: "3px 3px 0 0",
                            transition: "all 0.15s ease",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: `${Math.min(100, (scanPercent / heightPercent) * 100)}%`,
                              backgroundColor: "var(--emerald-500)",
                              opacity: 0.6,
                              borderRadius: "0",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* X Axis Labels */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", borderTop: "1px solid var(--border-subtle)", paddingTop: "6px" }}>
                  {data.timeSeries
                    .filter((_, idx) => (period === "day" ? idx % 3 === 0 : true))
                    .map((item, idx) => (
                      <span key={idx} style={{ fontSize: "10.5px", color: "var(--zinc-400)", fontWeight: 550 }}>
                        {item.label}
                      </span>
                    ))}
                </div>
              </div>

              {/* Two Column Breakdown: Rush Hours & Dining Behavior */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "14px",
                }}
              >
                {/* Rush Hour Window Breakdown */}
                <div
                  style={{
                    backgroundColor: "var(--zinc-50)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "16px",
                    padding: "18px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
                    <Clock size={15} color="var(--zinc-900)" />
                    <h4 style={{ fontSize: "13px", fontWeight: 800, color: "var(--zinc-950)", margin: 0 }}>
                      Customer Rush Hours
                    </h4>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {data.rushHourDistribution.map((slot, idx) => (
                      <div key={idx}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                          <span style={{ fontWeight: slot.isPeak ? 750 : 600, color: slot.isPeak ? "#EA580C" : "var(--zinc-700)" }}>
                            {slot.label} ({slot.slot})
                          </span>
                          <span style={{ fontWeight: 700, color: "var(--zinc-950)" }}>
                            {slot.percentage}%
                          </span>
                        </div>
                        <div style={{ width: "100%", height: "6px", backgroundColor: "var(--zinc-200)", borderRadius: "3px", overflow: "hidden" }}>
                          <div
                            style={{
                              width: `${slot.percentage}%`,
                              height: "100%",
                              backgroundColor: slot.isPeak ? "#EA580C" : "var(--zinc-800)",
                              borderRadius: "3px",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Table QR Scan Breakdown & Devices */}
                <div
                  style={{
                    backgroundColor: "var(--zinc-50)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "16px",
                    padding: "18px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                      <Smartphone size={15} color="var(--zinc-900)" />
                      <h4 style={{ fontSize: "13px", fontWeight: 800, color: "var(--zinc-950)", margin: 0 }}>
                        Device & Table Activity
                      </h4>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px", fontSize: "12px" }}>
                      <div>
                        <span style={{ color: "var(--zinc-400)", display: "block", fontSize: "10.5px" }}>Mobile QR Scans</span>
                        <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--emerald-600)" }}>
                          {data.deviceShare.mobile}%
                        </span>
                      </div>
                      <div>
                        <span style={{ color: "var(--zinc-400)", display: "block", fontSize: "10.5px" }}>Desktop Views</span>
                        <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--zinc-700)" }}>
                          {data.deviceShare.desktop}%
                        </span>
                      </div>
                      <div>
                        <span style={{ color: "var(--zinc-400)", display: "block", fontSize: "10.5px" }}>Avg Browsing</span>
                        <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--zinc-950)" }}>
                          3m 38s
                        </span>
                      </div>
                    </div>

                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--zinc-400)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
                      Top Scanned Tables:
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "12px" }}>
                      {data.topTables.slice(0, 4).map((tbl, tIdx) => (
                        <div key={tIdx} style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#FFFFFF", padding: "6px 10px", borderRadius: "8px", border: "1px solid var(--border-light)" }}>
                          <span style={{ color: "var(--zinc-700)", fontWeight: 550 }}>{tbl.table}</span>
                          <span style={{ fontWeight: 700, color: "var(--zinc-950)" }}>{tbl.scans}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

