"use client";

import React from "react";
import Link from "next/link";
import { DeployedRestaurant } from "@/app/api/deploy-restaurant/route";
import { BarChart3 } from "lucide-react";
import {
  ExternalLinkIcon,
  TrashIcon,
  RefreshIcon,
  EditIcon,
} from "@/components/Icons";

interface DeployRestaurantListProps {
  restaurants: DeployedRestaurant[];
  loading: boolean;
  fetchRestaurants: () => Promise<void>;
  openEditModal: (res: DeployedRestaurant) => void;
  handleDelete: (slug: string) => Promise<void>;
}

export default function DeployRestaurantList({
  restaurants,
  loading,
  fetchRestaurants,
  openEditModal,
  handleDelete,
}: DeployRestaurantListProps) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 4px" }}>
            Active Deployed Subdomains
          </h3>
          <p style={{ fontSize: "13px", color: "#666666", margin: 0 }}>
            Every restaurant website hosted on its own <code>.orupos.in</code> domain
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Link
            href="/deploy/analytics"
            style={{
              backgroundColor: "#0F172A",
              color: "#FFFFFF",
              border: "none",
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: 650,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              textDecoration: "none",
              boxShadow: "0 2px 6px rgba(15, 23, 42, 0.15)",
            }}
          >
            <BarChart3 size={13} color="#10B981" />
            <span>Live Analytics Dashboard</span>
          </Link>

          <button
            onClick={fetchRestaurants}
            disabled={loading}
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#334155",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <RefreshIcon size={14} color="#334155" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "14px",
            padding: "36px",
            textAlign: "center",
            color: "#94A3B8",
            fontSize: "14px",
            border: "1px solid #E8E8E6",
          }}
        >
          Loading active subdomains...
        </div>
      ) : restaurants.length === 0 ? (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "14px",
            padding: "40px 20px",
            textAlign: "center",
            color: "#64748B",
            border: "1px solid #E8E8E6",
          }}
        >
          <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>
            No custom subdomains deployed yet
          </div>
          <div style={{ fontSize: "13px", color: "#94A3B8" }}>
            Drop your restaurant build folder above to launch your first dedicated subdomain.
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {restaurants.map((res) => (
            <div
              key={res.slug}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "14px",
                border: "1px solid #E8E8E6",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#111827" }}>
                    {res.name}
                  </h4>
                  <span
                    style={{
                      backgroundColor: "#ECFDF5",
                      color: "#059669",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    Live
                  </span>
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <Link
                    href={res.url}
                    target="_blank"
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#1E3A2F",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span>{res.subdomain}</span>
                    <ExternalLinkIcon size={12} color="#1E3A2F" />
                  </Link>
                </div>

                <div style={{ fontSize: "12px", color: "#6B7280", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  <span>{res.filesCount} files</span>
                  <span>•</span>
                  <span>
                    {new Date(res.deployedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                  {res.updatedAt && (
                    <>
                      <span>•</span>
                      <span style={{ color: "#059669", fontWeight: 600 }}>Updated</span>
                    </>
                  )}
                </div>
              </div>

              <div
                style={{
                  marginTop: "18px",
                  paddingTop: "14px",
                  borderTop: "1px solid #F1F5F9",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Link
                  href={res.url}
                  target="_blank"
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#047857",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span>Visit Site</span>
                  <ExternalLinkIcon size={12} color="#047857" />
                </Link>

                <div style={{ display: "flex", gap: "8px" }}>
                  <Link
                    href={`/deploy/analytics?slug=${encodeURIComponent(res.slug)}`}
                    style={{
                      backgroundColor: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                      color: "#0F172A",
                      textDecoration: "none",
                      padding: "6px 12px",
                      fontSize: "12px",
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      borderRadius: "6px",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <BarChart3 size={12} color="#0F172A" />
                    <span>Analytics</span>
                  </Link>

                  <button
                    onClick={() => openEditModal(res)}
                    style={{
                      backgroundColor: "#F1F5F9",
                      border: "none",
                      color: "#1E293B",
                      cursor: "pointer",
                      padding: "6px 12px",
                      fontSize: "12px",
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      borderRadius: "6px",
                      transition: "background 0.2s ease",
                    }}
                  >
                    <EditIcon size={12} color="#1E293B" />
                    <span>Edit / Update</span>
                  </button>

                  <button
                    onClick={() => handleDelete(res.slug)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#DC2626",
                      cursor: "pointer",
                      padding: "6px 8px",
                      fontSize: "12px",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      borderRadius: "6px",
                    }}
                  >
                    <TrashIcon size={12} color="#DC2626" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
