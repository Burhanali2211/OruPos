"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { DeployedRestaurant } from "@/app/api/deploy-restaurant/route";
import {
  UploadCloudIcon,
  ExternalLinkIcon,
  CheckIcon,
  TrashIcon,
  RefreshIcon,
  CloseIcon,
  InfoIcon,
} from "@/components/Icons";

interface FileItem {
  file: File;
  path: string;
}

export default function DeployPortalPage() {
  const [restaurants, setRestaurants] = useState<DeployedRestaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasVpsStorage, setHasVpsStorage] = useState<boolean>(true);
  const [isVercel, setIsVercel] = useState<boolean>(false);

  // Form State
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [selectedZip, setSelectedZip] = useState<File | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([]);
  const [sourceName, setSourceName] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const [deployedResult, setDeployedResult] = useState<DeployedRestaurant | null>(null);

  const zipInputRef = useRef<HTMLInputElement | null>(null);
  const folderInputRef = useRef<HTMLInputElement | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/deploy-restaurant");
      if (res.ok) {
        const data = await res.json();
        setRestaurants(data.restaurants || []);
        if (typeof data.hasVpsStorage === "boolean") {
          setHasVpsStorage(data.hasVpsStorage);
        }
        if (typeof data.isVercel === "boolean") {
          setIsVercel(data.isVercel);
        }
      }
    } catch {
      showToast("Could not load deployed subdomains");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Recursively read directory entries dropped into browser
  async function extractFilesFromItems(items: DataTransferItemList): Promise<FileItem[]> {
    const list: FileItem[] = [];

    async function traverseEntry(entry: any, currentPath: string): Promise<void> {
      if (!entry) return;
      if (entry.isFile) {
        return new Promise<void>((resolve) => {
          entry.file(
            (file: File) => {
              const relPath = currentPath ? `${currentPath}/${file.name}` : file.name;
              list.push({ file, path: relPath });
              resolve();
            },
            () => resolve()
          );
        });
      } else if (entry.isDirectory) {
        const reader = entry.createReader();
        const entries: any[] = await new Promise((resolve) => {
          reader.readEntries(
            (ents: any[]) => resolve(ents || []),
            () => resolve([])
          );
        });
        for (const child of entries) {
          await traverseEntry(child, currentPath ? `${currentPath}/${entry.name}` : entry.name);
        }
      }
    }

    const promises: Promise<void>[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.webkitGetAsEntry) {
        const entry = item.webkitGetAsEntry();
        if (entry) {
          promises.push(traverseEntry(entry, ""));
        }
      }
    }

    await Promise.all(promises);
    return list;
  }

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      const extracted = await extractFilesFromItems(e.dataTransfer.items);
      if (extracted.length > 0) {
        // Direct folder dropped
        handleFolderSelected(extracted, "Dropped folder");
        return;
      }
    }

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const first = e.dataTransfer.files[0];
      if (first.name.endsWith(".zip") || first.name.endsWith(".tar") || first.name.endsWith(".gz")) {
        handleZipSelected(first);
      } else {
        // Multi-file drop
        const items: FileItem[] = [];
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          const f = e.dataTransfer.files[i];
          items.push({ file: f, path: f.name });
        }
        handleFolderSelected(items, "Selected files");
      }
    }
  };

  const handleZipSelected = (file: File) => {
    setSelectedZip(file);
    setSelectedFiles([]);
    setSourceName(file.name);

    if (!slug) {
      const cleanName = file.name
        .replace(/\.(zip|tar\.gz|tar)$/i, "")
        .replace(/^(dist|build|out)[-_]?/i, "")
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, "");

      if (cleanName && cleanName !== "dist" && cleanName !== "build") {
        setSlug(cleanName);
        if (!name) {
          setName(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
        }
      }
    }
  };

  const handleFolderSelected = (items: FileItem[], label?: string) => {
    setSelectedFiles(items);
    setSelectedZip(null);

    // Normalize paths to remove outer folder name if it's "dist" or similar
    const hasIndex = items.some(
      (item) => item.path === "index.html" || item.path.endsWith("/index.html")
    );

    if (!hasIndex) {
      showToast("Warning: No index.html found. Please make sure your build output contains index.html");
    }

    const folderTitle = label || (items[0] ? items[0].path.split("/")[0] : "dist");
    setSourceName(`${folderTitle} (${items.length} file${items.length === 1 ? "" : "s"})`);

    if (!slug && folderTitle && folderTitle !== "dist" && folderTitle !== "build") {
      const cleanSlug = folderTitle.toLowerCase().replace(/[^a-z0-9_-]/g, "");
      if (cleanSlug) {
        setSlug(cleanSlug);
        if (!name) {
          setName(cleanSlug.charAt(0).toUpperCase() + cleanSlug.slice(1));
        }
      }
    }
  };

  const handleZipInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleZipSelected(e.target.files[0]);
    }
  };

  const handleFolderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const items: FileItem[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        // webkitRelativePath contains e.g. "dist/index.html"
        const relPath = file.webkitRelativePath || file.name;
        items.push({ file, path: relPath });
      }
      handleFolderSelected(items, "dist folder");
    }
  };

  const clearSelection = () => {
    setSelectedZip(null);
    setSelectedFiles([]);
    setSourceName("");
    if (zipInputRef.current) zipInputRef.current.value = "";
    if (folderInputRef.current) folderInputRef.current.value = "";
  };

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9_-]/g, "");
    if (!cleanSlug) {
      showToast("Please enter a valid subdomain name (e.g. burgerbar)");
      return;
    }

    if (!selectedZip && selectedFiles.length === 0) {
      showToast("Please drop your 'dist' folder or upload a .zip file");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress("Preparing build files for upload...");

      const formData = new FormData();
      formData.append("name", name.trim() || cleanSlug);
      formData.append("slug", cleanSlug);

      if (selectedFiles.length > 0) {
        setUploadProgress(`Uploading ${selectedFiles.length} files from folder...`);
        const paths = selectedFiles.map((item) => item.path);
        formData.append("paths", JSON.stringify(paths));
        for (const item of selectedFiles) {
          formData.append("files", item.file);
        }
      } else if (selectedZip) {
        setUploadProgress(`Uploading ${selectedZip.name}...`);
        formData.append("file", selectedZip);
      }

      const res = await fetch("/api/deploy-restaurant", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.details || data.error || "Failed to deploy website");
      }

      setDeployedResult(data.restaurant);
      showToast(`Website deployed to ${data.restaurant.subdomain}!`);
      clearSelection();
      fetchRestaurants();
    } catch (err: any) {
      showToast(err.message || "Deployment failed. Please check console.");
    } finally {
      setIsUploading(false);
      setUploadProgress("");
    }
  };

  const handleDelete = async (targetSlug: string) => {
    if (!confirm(`Are you sure you want to delete ${targetSlug}.orupos.in?`)) return;

    try {
      const res = await fetch(`/api/deploy-restaurant?slug=${targetSlug}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not delete");

      showToast(`Deleted ${targetSlug}.orupos.in`);
      if (deployedResult?.slug === targetSlug) {
        setDeployedResult(null);
      }
      fetchRestaurants();
    } catch (err: any) {
      showToast(err.message || "Failed to delete");
    }
  };

  const livePreviewDomain = slug
    ? `${slug.toLowerCase().replace(/[^a-z0-9_-]/g, "")}.orupos.in`
    : "your-restaurant.orupos.in";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9F9F8", color: "#111111" }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            backgroundColor: "#1E3A2F",
            color: "#FFFFFF",
            padding: "12px 20px",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: 600,
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <InfoIcon size={16} color="#A7F3D0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            style={{
              background: "none",
              border: "none",
              color: "#FFFFFF",
              cursor: "pointer",
              padding: "2px",
            }}
          >
            <CloseIcon size={12} color="#CBD5E1" />
          </button>
        </div>
      )}

      {/* Header */}
      <header
        style={{
          backgroundColor: "#1E3A2F",
          color: "#FFFFFF",
          padding: "16px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              backgroundColor: "#E5A93C",
              color: "#13271F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: "19px",
            }}
          >
            O
          </div>
          <div>
            <div style={{ fontSize: "16px", fontWeight: 800, letterSpacing: "-0.01em" }}>
              OruPos Deployment Portal
            </div>
            <div style={{ fontSize: "11px", color: "#A7F3D0" }}>
              Drop your Svelte / HTML build to launch dedicated subdomains
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
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
            <span>orupos.in</span>
            <ExternalLinkIcon size={12} color="#CBD5E1" />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: "1140px", margin: "0 auto", padding: "32px 20px 80px" }}>
        {/* DNS Warning if accessed through Vercel instead of VPS */}
        {(!hasVpsStorage || isVercel) && (
          <div
            style={{
              backgroundColor: "#FEF2F2",
              border: "1px solid #FECACA",
              borderRadius: "14px",
              padding: "18px 22px",
              marginBottom: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  backgroundColor: "#DC2626",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "14px",
                  flexShrink: 0,
                }}
              >
                !
              </div>
              <div>
                <h4 style={{ margin: "0 0 6px", fontSize: "14px", fontWeight: 800, color: "#991B1B" }}>
                  Hostinger DNS Setup Needed for Dedicated Subdomains
                </h4>
                <p style={{ margin: "0 0 10px", fontSize: "13px", color: "#B91C1C", lineHeight: 1.5 }}>
                  Your browser currently resolved <code>orupos.in</code> to Vercel (read-only cloud).
                  To make dedicated subdomains (<code>restaurant.orupos.in</code>) and build uploads work with persistent storage, update your Hostinger DNS records to point to your VPS:
                </p>
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #FCA5A5",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    fontSize: "12px",
                    color: "#7F1D1D",
                    fontFamily: "monospace",
                    display: "grid",
                    gap: "4px",
                  }}
                >
                  <div><strong>A Record:</strong> @ (or orupos.in) &rarr; <strong>195.35.22.110</strong></div>
                  <div><strong>A Record:</strong> * (Wildcard subdomains) &rarr; <strong>195.35.22.110</strong></div>
                  <div><strong>A Record:</strong> www &rarr; <strong>195.35.22.110</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

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
            {restaurants.length} Active Subdomain{restaurants.length === 1 ? "" : "s"}
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

        {/* Active Deployed Restaurants Dashboard */}
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

                    <div style={{ fontSize: "12px", color: "#6B7280", display: "flex", gap: "12px" }}>
                      <span>{res.filesCount} files</span>
                      <span>•</span>
                      <span>
                        {new Date(res.deployedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
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

                    <button
                      onClick={() => handleDelete(res.slug)}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#DC2626",
                        cursor: "pointer",
                        padding: "4px 8px",
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
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
