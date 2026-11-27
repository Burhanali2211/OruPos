"use client";

import React, { useState, useEffect, useRef } from "react";
import { DeployedRestaurant } from "@/app/api/deploy-restaurant/route";
import RestaurantAnalyticsModal from "@/components/RestaurantAnalyticsModal";
import DeployAuthGate from "@/components/DeployAuthGate";
import { InfoIcon, CloseIcon } from "@/components/Icons";
import { FileItem, extractFilesFromItems } from "./utils/fileExtraction";
import DeployHeader from "./components/DeployHeader";
import DeployNewForm from "./components/DeployNewForm";
import DeployRestaurantList from "./components/DeployRestaurantList";
import DeployEditModal from "./components/DeployEditModal";

export default function DeployPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  const [restaurants, setRestaurants] = useState<DeployedRestaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Deploy New Form State
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [selectedZip, setSelectedZip] = useState<File | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([]);
  const [sourceName, setSourceName] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const [deployedResult, setDeployedResult] = useState<DeployedRestaurant | null>(null);

  // Edit / Update State
  const [editingRestaurant, setEditingRestaurant] = useState<DeployedRestaurant | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editSlug, setEditSlug] = useState<string>("");
  const [editSelectedZip, setEditSelectedZip] = useState<File | null>(null);
  const [editSelectedFiles, setEditSelectedFiles] = useState<FileItem[]>([]);
  const [editSourceName, setEditSourceName] = useState<string>("");
  const [isEditDragging, setIsEditDragging] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateProgress, setUpdateProgress] = useState<string>("");

  // Customer Analytics Modal State
  const [analyticsModalData, setAnalyticsModalData] = useState<{
    isOpen: boolean;
    restaurantName: string;
    subdomain: string;
    slug: string;
  }>({
    isOpen: false,
    restaurantName: "",
    subdomain: "",
    slug: "all",
  });

  const zipInputRef = useRef<HTMLInputElement | null>(null);
  const folderInputRef = useRef<HTMLInputElement | null>(null);
  const editZipInputRef = useRef<HTMLInputElement | null>(null);
  const editFolderInputRef = useRef<HTMLInputElement | null>(null);

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
      }
    } catch {
      showToast("Could not load deployed subdomains");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = sessionStorage.getItem("orupos_deploy_access");
        if (stored === "granted") {
          setIsAuthenticated(true);
        }
      }
    } catch {
      // ignore
    } finally {
      setCheckingAuth(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchRestaurants();
    }
  }, [isAuthenticated]);

  // Main Drag & Drop Handlers
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
        handleFolderSelected(extracted, "Dropped folder");
        return;
      }
    }

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const first = e.dataTransfer.files[0];
      if (first.name.endsWith(".zip") || first.name.endsWith(".tar") || first.name.endsWith(".gz")) {
        handleZipSelected(first);
      } else {
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

    const hasIndex = items.some(
      (item) => item.path === "index.html" || item.path.endsWith("/index.html")
    );

    if (!hasIndex) {
      showToast("Notice: Make sure your build output contains an index.html file");
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

  // Edit Modal Handlers
  const openEditModal = (res: DeployedRestaurant) => {
    setEditingRestaurant(res);
    setEditName(res.name);
    setEditSlug(res.slug);
    setEditSelectedZip(null);
    setEditSelectedFiles([]);
    setEditSourceName("");
    setIsEditDragging(false);
    setUpdateProgress("");
  };

  const closeEditModal = () => {
    setEditingRestaurant(null);
    setEditName("");
    setEditSlug("");
    setEditSelectedZip(null);
    setEditSelectedFiles([]);
    setEditSourceName("");
    setIsEditDragging(false);
    setUpdateProgress("");
  };

  const clearEditSelection = () => {
    setEditSelectedZip(null);
    setEditSelectedFiles([]);
    setEditSourceName("");
    if (editZipInputRef.current) editZipInputRef.current.value = "";
    if (editFolderInputRef.current) editFolderInputRef.current.value = "";
  };

  const handleEditZipSelected = (file: File) => {
    setEditSelectedZip(file);
    setEditSelectedFiles([]);
    setEditSourceName(file.name);
  };

  const handleEditFolderSelected = (items: FileItem[], label?: string) => {
    setEditSelectedFiles(items);
    setEditSelectedZip(null);
    const folderTitle = label || (items[0] ? items[0].path.split("/")[0] : "dist");
    setEditSourceName(`${folderTitle} (${items.length} file${items.length === 1 ? "" : "s"})`);
  };

  const handleEditDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditDragging(true);
  };

  const handleEditDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditDragging(false);
  };

  const handleEditDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditDragging(false);

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      const extracted = await extractFilesFromItems(e.dataTransfer.items);
      if (extracted.length > 0) {
        handleEditFolderSelected(extracted, "Dropped folder");
        return;
      }
    }

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const first = e.dataTransfer.files[0];
      if (first.name.endsWith(".zip") || first.name.endsWith(".tar") || first.name.endsWith(".gz")) {
        handleEditZipSelected(first);
      } else {
        const items: FileItem[] = [];
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          const f = e.dataTransfer.files[i];
          items.push({ file: f, path: f.name });
        }
        handleEditFolderSelected(items, "Selected files");
      }
    }
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
        for (const item of selectedFiles) {
          formData.append("files", item.file);
          formData.append("paths", item.path);
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
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Deployment failed. Please check console.";
      showToast(msg);
    } finally {
      setIsUploading(false);
      setUploadProgress("");
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRestaurant) return;

    const currentSlug = editingRestaurant.slug;
    const newSlug = editSlug.toLowerCase().trim().replace(/[^a-z0-9_-]/g, "");
    const updatedName = editName.trim();

    if (!updatedName) {
      showToast("Please enter a restaurant name");
      return;
    }

    try {
      setIsUpdating(true);
      setUpdateProgress("Updating restaurant details...");

      const formData = new FormData();
      formData.append("slug", currentSlug);
      formData.append("name", updatedName);
      if (newSlug && newSlug !== currentSlug) {
        formData.append("newSlug", newSlug);
      }

      if (editSelectedFiles.length > 0) {
        setUpdateProgress(`Uploading ${editSelectedFiles.length} updated build files...`);
        for (const item of editSelectedFiles) {
          formData.append("files", item.file);
          formData.append("paths", item.path);
        }
      } else if (editSelectedZip) {
        setUpdateProgress(`Uploading ${editSelectedZip.name}...`);
        formData.append("file", editSelectedZip);
      }

      const res = await fetch("/api/deploy-restaurant", {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.details || data.error || "Update failed");
      }

      showToast(`Updated '${data.restaurant.name}' successfully!`);
      closeEditModal();
      fetchRestaurants();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update restaurant";
      showToast(msg);
    } finally {
      setIsUpdating(false);
      setUpdateProgress("");
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
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete";
      showToast(msg);
    }
  };

  const livePreviewDomain = slug
    ? `${slug.toLowerCase().replace(/[^a-z0-9_-]/g, "")}.orupos.in`
    : "your-restaurant.orupos.in";

  if (checkingAuth) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#09090B",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-sans)",
        }}
      >
        <span style={{ fontSize: "13px", color: "var(--zinc-500)" }}>
          Checking access authorization...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <DeployAuthGate onSuccess={() => setIsAuthenticated(true)} />;
  }

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
      <DeployHeader
        onLock={() => {
          sessionStorage.removeItem("orupos_deploy_access");
          setIsAuthenticated(false);
        }}
      />

      {/* Main Container */}
      <main style={{ maxWidth: "1140px", margin: "0 auto", padding: "32px 20px 80px" }}>
        <DeployNewForm
          name={name}
          setName={setName}
          slug={slug}
          setSlug={setSlug}
          selectedZip={selectedZip}
          selectedFiles={selectedFiles}
          sourceName={sourceName}
          isDragging={isDragging}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
          deployedResult={deployedResult}
          setDeployedResult={setDeployedResult}
          activeCount={restaurants.length}
          livePreviewDomain={livePreviewDomain}
          handleDeploy={handleDeploy}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
          handleZipInputChange={handleZipInputChange}
          handleFolderInputChange={handleFolderInputChange}
          clearSelection={clearSelection}
          zipInputRef={zipInputRef}
          folderInputRef={folderInputRef}
        />

        <DeployRestaurantList
          restaurants={restaurants}
          loading={loading}
          fetchRestaurants={fetchRestaurants}
          openEditModal={openEditModal}
          handleDelete={handleDelete}
        />
      </main>

      {/* Edit & Update Modal */}
      <DeployEditModal
        editingRestaurant={editingRestaurant}
        editName={editName}
        setEditName={setEditName}
        editSlug={editSlug}
        setEditSlug={setEditSlug}
        editSourceName={editSourceName}
        isEditDragging={isEditDragging}
        isUpdating={isUpdating}
        updateProgress={updateProgress}
        closeEditModal={closeEditModal}
        handleUpdateSubmit={handleUpdateSubmit}
        handleEditZipSelected={handleEditZipSelected}
        handleEditFolderSelected={handleEditFolderSelected}
        handleEditDragOver={handleEditDragOver}
        handleEditDragLeave={handleEditDragLeave}
        handleEditDrop={handleEditDrop}
        editZipInputRef={editZipInputRef}
        editFolderInputRef={editFolderInputRef}
        clearEditSelection={clearEditSelection}
      />

      {/* Analytics Modal */}
      <RestaurantAnalyticsModal
        isOpen={analyticsModalData.isOpen}
        onClose={() =>
          setAnalyticsModalData((prev) => ({ ...prev, isOpen: false }))
        }
        restaurantName={analyticsModalData.restaurantName}
        subdomain={analyticsModalData.subdomain}
        slug={analyticsModalData.slug}
      />
    </div>
  );
}
