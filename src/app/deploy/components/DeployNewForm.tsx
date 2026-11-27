"use client";

import React from "react";
import Link from "next/link";
import { DeployedRestaurant } from "@/app/api/deploy-restaurant/route";
import { FileItem } from "../utils/fileExtraction";
import {
  UploadCloudIcon,
  ExternalLinkIcon,
  CheckIcon,
  RefreshIcon,
} from "@/components/Icons";

interface DeployNewFormProps {
  name: string;
  setName: (val: string) => void;
  slug: string;
  setSlug: (val: string) => void;
  selectedZip: File | null;
  selectedFiles: FileItem[];
  sourceName: string;
  isDragging: boolean;
  isUploading: boolean;
  uploadProgress: string;
  deployedResult: DeployedRestaurant | null;
  setDeployedResult: (val: DeployedRestaurant | null) => void;
  activeCount: number;
  livePreviewDomain: string;
  handleDeploy: (e: React.FormEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleZipInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFolderInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSelection: () => void;
  zipInputRef: React.RefObject<HTMLInputElement | null>;
  folderInputRef: React.RefObject<HTMLInputElement | null>;
}

export default function DeployNewForm({
  name,
  setName,
  slug,
  setSlug,
  selectedZip,
  selectedFiles,
  sourceName,
  isDragging,
  isUploading,
  uploadProgress,
  deployedResult,
  setDeployedResult,
  activeCount,
  livePreviewDomain,
  handleDeploy,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleZipInputChange,
  handleFolderInputChange,
  clearSelection,
  zipInputRef,
  folderInputRef,
}: DeployNewFormProps) {
  return (
    <>
      {/* Top Feature Notice */}
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
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#10B981" }} />
          <div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#065F46" }}>
              Dedicated Subdomain Hosting Ready
            </div>
            <div style={{ fontSize: "12px", color: "#047857" }}>
              Drop your raw <strong>dist</strong> folder directly (no zip needed) or upload a <strong>.zip</strong>. Every site launches on <strong>restaurantname.orupos.in</strong>.
            </div>
          </div>
        </div>
        <div style={{ fontSize: "12px", fontWeight: 700, color: "#065F46" }}>
          {activeCount} Active Subdomain{activeCount === 1 ? "" : "s"}
        </div>
      </div>

      {/* Success Alert after Deployment */}
      {deployedResult && (
        <div
          style={{
            backgroundColor: "#FFFBEB",
            border: "1px solid #FDE68A",
            borderRadius: "14px",
            padding: "20px 24px",
            marginBottom: "28px",
            boxShadow: "0 6px 20px rgba(229, 169, 60, 0.15)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <CheckIcon size={18} color="#92400E" strokeWidth={3} />
                <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#92400E", margin: 0 }}>
                  Website Deployed to Dedicated Subdomain!
                </h3>
              </div>
              <p style={{ fontSize: "13px", color: "#B45309", margin: "0 0 14px" }}>
                <strong>{deployedResult.name}</strong> is live at:{" "}
                <code style={{ background: "#FEF3C7", padding: "3px 8px", borderRadius: "6px", fontWeight: 700 }}>
                  {deployedResult.subdomain}
                </code>
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <Link
                  href={deployedResult.url}
                  target="_blank"
                  style={{
                    backgroundColor: "#1E3A2F",
                    color: "#FFFFFF",
                    padding: "9px 18px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 2px 8px rgba(30, 58, 47, 0.25)",
                  }}
                >
                  <span>Open Live Website ({deployedResult.subdomain})</span>
                  <ExternalLinkIcon size={12} color="#FFFFFF" />
                </Link>
                <button
                  type="button"
                  onClick={() => setDeployedResult(null)}
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #D97706",
                    color: "#B45309",
                    padding: "9px 16px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Form Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "18px",
          border: "1px solid #E8E8E6",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          padding: "32px",
          marginBottom: "40px",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.01em" }}>
            Deploy a New Restaurant Website
          </h2>
          <p style={{ fontSize: "14px", color: "#666666", margin: 0 }}>
            Enter the restaurant details and drop the build output. It will be served directly at{" "}
            <code style={{ backgroundColor: "#F3F3F1", padding: "2px 6px", borderRadius: "4px" }}>
              https://{livePreviewDomain}
            </code>
          </p>
        </div>

        <form onSubmit={handleDeploy}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginBottom: "24px",
            }}
          >
            {/* Restaurant Name */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 700,
                  marginBottom: "8px",
                  color: "#333333",
                }}
              >
                Restaurant Name
              </label>
              <input
                type="text"
                placeholder="e.g. Spice Garden, Burger Bar"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!slug) {
                    setSlug(
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9_-]/g, "")
                    );
                  }
                }}
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #E2E8F0",
                  fontSize: "14px",
                  outline: "none",
                  backgroundColor: "#FAFAFA",
                  boxSizing: "border-box",
                }}
              />
              <span style={{ fontSize: "11px", color: "#888888", marginTop: "4px", display: "block" }}>
                The formal title displayed on your restaurant dashboard.
              </span>
            </div>

            {/* Subdomain Slug */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 700,
                  marginBottom: "8px",
                  color: "#333333",
                }}
              >
                Subdomain Slug
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#FAFAFA",
                  border: "1px solid #E2E8F0",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <input
                  type="text"
                  placeholder="spicegarden"
                  value={slug}
                  onChange={(e) =>
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))
                  }
                  required
                  style={{
                    flex: 1,
                    padding: "12px 14px",
                    border: "none",
                    outline: "none",
                    fontSize: "14px",
                    backgroundColor: "transparent",
                  }}
                />
                <span
                  style={{
                    backgroundColor: "#F1F5F9",
                    padding: "12px 14px",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#475569",
                    borderLeft: "1px solid #E2E8F0",
                    userSelect: "none",
                  }}
                >
                  .orupos.in
                </span>
              </div>
              <span style={{ fontSize: "11px", color: "#10B981", marginTop: "4px", display: "block", fontWeight: 600 }}>
                Live URL: https://{livePreviewDomain}
              </span>
            </div>
          </div>

          {/* Drag & Drop Area */}
          <div style={{ marginBottom: "26px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 700,
                marginBottom: "8px",
                color: "#333333",
              }}
            >
              Website Build Files (Drop 'dist' Folder OR .zip)
            </label>

            {/* Hidden Inputs */}
            <input
              type="file"
              ref={zipInputRef}
              accept=".zip,application/zip,.tar,.gz"
              onChange={handleZipInputChange}
              style={{ display: "none" }}
            />
            <input
              type="file"
              ref={folderInputRef}
              onChange={handleFolderInputChange}
              style={{ display: "none" }}
              // @ts-expect-error webkitdirectory is standard in all modern browsers
              webkitdirectory=""
              directory=""
              multiple
            />

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                border: isDragging ? "2px dashed #1E3A2F" : "2px dashed #CBD5E1",
                backgroundColor: isDragging ? "#F0FDF4" : "#F8FAFC",
                borderRadius: "14px",
                padding: "36px 20px",
                textAlign: "center",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
            >
              {sourceName ? (
                <div>
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      backgroundColor: "#ECFDF5",
                      color: "#059669",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 12px",
                    }}
                  >
                    <CheckIcon size={26} color="#059669" strokeWidth={3} />
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>
                    Ready to Deploy: {sourceName}
                  </div>
                  <div style={{ fontSize: "13px", color: "#6B7280", marginBottom: "16px" }}>
                    {selectedFiles.length > 0
                      ? `${selectedFiles.length} files will be extracted directly into https://${livePreviewDomain}`
                      : `${selectedZip?.name} will be unpacked directly into https://${livePreviewDomain}`}
                  </div>
                  <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearSelection();
                      }}
                      style={{
                        backgroundColor: "#EF4444",
                        color: "#FFFFFF",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Remove / Choose Another
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      backgroundColor: "#F1F5F9",
                      color: "#475569",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 14px",
                    }}
                  >
                    <UploadCloudIcon size={28} color="#1E3A2F" />
                  </div>

                  <div style={{ fontSize: "16px", fontWeight: 800, color: "#1E293B", marginBottom: "6px" }}>
                    Drag & Drop your <span style={{ color: "#E5A93C" }}>dist</span> folder or <span style={{ color: "#E5A93C" }}>.zip</span> here
                  </div>
                  <div style={{ fontSize: "13px", color: "#64748B", maxWidth: "480px", margin: "0 auto 20px", lineHeight: 1.5 }}>
                    You can drop your raw <strong>dist</strong> folder directly without zipping, or pick it from your computer.
                  </div>

                  {/* Dual Action Buttons */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (folderInputRef.current) folderInputRef.current.click();
                      }}
                      style={{
                        backgroundColor: "#1E3A2F",
                        color: "#FFFFFF",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        boxShadow: "0 2px 8px rgba(30, 58, 47, 0.2)",
                      }}
                    >
                      <UploadCloudIcon size={16} color="#FFFFFF" />
                      <span>Choose "dist" Folder</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (zipInputRef.current) zipInputRef.current.click();
                      }}
                      style={{
                        backgroundColor: "#FFFFFF",
                        color: "#1E3A2F",
                        border: "1px solid #CBD5E1",
                        padding: "10px 18px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Or Choose .ZIP File
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "14px" }}>
            <div style={{ fontSize: "12px", color: "#64748B" }}>
              {uploadProgress ? (
                <span style={{ color: "#059669", fontWeight: 600 }}>{uploadProgress}</span>
              ) : (
                <span>Ready to deploy to <strong>{livePreviewDomain}</strong></span>
              )}
            </div>

            <button
              type="submit"
              disabled={isUploading || (!selectedZip && selectedFiles.length === 0)}
              style={{
                backgroundColor: isUploading || (!selectedZip && selectedFiles.length === 0) ? "#94A3B8" : "#E5A93C",
                color: "#13271F",
                border: "none",
                padding: "14px 32px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 800,
                cursor: isUploading || (!selectedZip && selectedFiles.length === 0) ? "not-allowed" : "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 14px rgba(229, 169, 60, 0.35)",
                transition: "background 0.2s ease",
              }}
            >
              {isUploading ? (
                <>
                  <RefreshIcon size={16} color="#13271F" />
                  <span>Deploying Website...</span>
                </>
              ) : (
                <>
                  <CheckIcon size={16} color="#13271F" strokeWidth={3} />
                  <span>Deploy Website to {livePreviewDomain}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
