"use client";

import React from "react";
import { DeployedRestaurant } from "@/app/api/deploy-restaurant/route";
import { FileItem } from "../utils/fileExtraction";
import {
  UploadCloudIcon,
  CheckIcon,
  CloseIcon,
  RefreshIcon,
} from "@/components/Icons";

interface DeployEditModalProps {
  editingRestaurant: DeployedRestaurant | null;
  editName: string;
  setEditName: (val: string) => void;
  editSlug: string;
  setEditSlug: (val: string) => void;
  editSourceName: string;
  isEditDragging: boolean;
  isUpdating: boolean;
  updateProgress: string;
  closeEditModal: () => void;
  handleUpdateSubmit: (e: React.FormEvent) => void;
  handleEditZipSelected: (file: File) => void;
  handleEditFolderSelected: (items: FileItem[], label?: string) => void;
  handleEditDragOver: (e: React.DragEvent) => void;
  handleEditDragLeave: (e: React.DragEvent) => void;
  handleEditDrop: (e: React.DragEvent) => void;
  editZipInputRef: React.RefObject<HTMLInputElement | null>;
  editFolderInputRef: React.RefObject<HTMLInputElement | null>;
  clearEditSelection: () => void;
}

export default function DeployEditModal({
  editingRestaurant,
  editName,
  setEditName,
  editSlug,
  setEditSlug,
  editSourceName,
  isEditDragging,
  isUpdating,
  updateProgress,
  closeEditModal,
  handleUpdateSubmit,
  handleEditZipSelected,
  handleEditFolderSelected,
  handleEditDragOver,
  handleEditDragLeave,
  handleEditDrop,
  editZipInputRef,
  editFolderInputRef,
  clearEditSelection,
}: DeployEditModalProps) {
  if (!editingRestaurant) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isUpdating) {
          closeEditModal();
        }
      }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "18px",
          maxWidth: "600px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
          padding: "28px",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "20px",
            paddingBottom: "16px",
            borderBottom: "1px solid #E2E8F0",
          }}
        >
          <div>
            <h3 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: 800, color: "#111827" }}>
              Edit & Update: {editingRestaurant.name}
            </h3>
            <div style={{ fontSize: "12px", color: "#64748B" }}>
              Current Subdomain:{" "}
              <strong style={{ color: "#059669" }}>{editingRestaurant.subdomain}</strong>
            </div>
          </div>
          <button
            onClick={closeEditModal}
            disabled={isUpdating}
            style={{
              background: "none",
              border: "none",
              cursor: isUpdating ? "not-allowed" : "pointer",
              color: "#94A3B8",
              padding: "4px",
            }}
          >
            <CloseIcon size={18} color="#64748B" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleUpdateSubmit}>
          {/* Restaurant Name */}
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 700,
                marginBottom: "6px",
                color: "#333333",
              }}
            >
              Restaurant Name
            </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #CBD5E1",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Subdomain Slug */}
          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 700,
                marginBottom: "6px",
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
                border: "1px solid #CBD5E1",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <input
                type="text"
                value={editSlug}
                onChange={(e) =>
                  setEditSlug(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))
                }
                required
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  border: "none",
                  outline: "none",
                  fontSize: "14px",
                  backgroundColor: "transparent",
                }}
              />
              <span
                style={{
                  backgroundColor: "#F1F5F9",
                  padding: "10px 14px",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#475569",
                  borderLeft: "1px solid #CBD5E1",
                }}
              >
                .orupos.in
              </span>
            </div>
            <span style={{ fontSize: "11px", color: "#64748B", marginTop: "4px", display: "block" }}>
              Keep the same to preserve existing links, or modify to change the live subdomain.
            </span>
          </div>

          {/* Replace Build Dropzone */}
          <div style={{ marginBottom: "26px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 700,
                marginBottom: "6px",
                color: "#333333",
              }}
            >
              Update Website Build Files (Optional)
            </label>
            <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "8px" }}>
              Drop a new <strong>dist</strong> folder or .zip to replace website files. Leave empty to keep existing build.
            </div>

            {/* Hidden Inputs */}
            <input
              type="file"
              ref={editZipInputRef}
              accept=".zip,application/zip,.tar,.gz"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleEditZipSelected(e.target.files[0]);
                }
              }}
              style={{ display: "none" }}
            />
            <input
              type="file"
              ref={editFolderInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const items: FileItem[] = [];
                  for (let i = 0; i < e.target.files.length; i++) {
                    const file = e.target.files[i];
                    const relPath = file.webkitRelativePath || file.name;
                    items.push({ file, path: relPath });
                  }
                  handleEditFolderSelected(items, "dist folder");
                }
              }}
              style={{ display: "none" }}
              // @ts-expect-error webkitdirectory is standard in all modern browsers
              webkitdirectory=""
              directory=""
              multiple
            />

            <div
              onDragOver={handleEditDragOver}
              onDragLeave={handleEditDragLeave}
              onDrop={handleEditDrop}
              style={{
                border: isEditDragging ? "2px dashed #1E3A2F" : "2px dashed #CBD5E1",
                backgroundColor: isEditDragging ? "#F0FDF4" : "#F8FAFC",
                borderRadius: "10px",
                padding: "24px 16px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              {editSourceName ? (
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#059669", marginBottom: "4px" }}>
                    New Build Selected: {editSourceName}
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "10px" }}>
                    This build will replace the current website files upon saving.
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearEditSelection();
                    }}
                    style={{
                      backgroundColor: "#EF4444",
                      color: "#FFFFFF",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <UploadCloudIcon size={22} color="#475569" style={{ marginBottom: "6px" }} />
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "10px" }}>
                    Drop updated 'dist' folder or .zip here
                  </div>
                  <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (editFolderInputRef.current) editFolderInputRef.current.click();
                      }}
                      style={{
                        backgroundColor: "#1E3A2F",
                        color: "#FFFFFF",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Choose "dist" Folder
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (editZipInputRef.current) editZipInputRef.current.click();
                      }}
                      style={{
                        backgroundColor: "#FFFFFF",
                        color: "#1E3A2F",
                        border: "1px solid #CBD5E1",
                        padding: "8px 14px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Choose .ZIP File
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Progress notice */}
          {updateProgress && (
            <div style={{ fontSize: "12px", color: "#059669", fontWeight: 600, marginBottom: "14px" }}>
              {updateProgress}
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button
              type="button"
              onClick={closeEditModal}
              disabled={isUpdating}
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #CBD5E1",
                color: "#475569",
                padding: "10px 18px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: isUpdating ? "not-allowed" : "pointer",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUpdating}
              style={{
                backgroundColor: isUpdating ? "#94A3B8" : "#E5A93C",
                color: "#13271F",
                border: "none",
                padding: "10px 24px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 800,
                cursor: isUpdating ? "not-allowed" : "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 2px 8px rgba(229, 169, 60, 0.3)",
              }}
            >
              {isUpdating ? (
                <>
                  <RefreshIcon size={14} color="#13271F" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <CheckIcon size={14} color="#13271F" strokeWidth={3} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
