import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";
import { execSync } from "child_process";

export interface DeployedRestaurant {
  name: string;
  slug: string;
  subdomain: string;
  url: string;
  hasIndex: boolean;
  filesCount: number;
  deployedAt: string;
}

function getRestaurantsBaseDir(): string {
  if (process.env.RESTAURANTS_DIR) {
    return process.env.RESTAURANTS_DIR;
  }
  // Linux container or VPS host path
  if (fs.existsSync("/var/www/restaurants")) {
    return "/var/www/restaurants";
  }
  if (fs.existsSync("/docker/restaurants")) {
    return "/docker/restaurants";
  }
  // Local project development path
  const localDir = path.join(process.cwd(), "public", "restaurants");
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    return localDir;
  } catch {
    // If running in read-only environment like Vercel Lambda
    const tmpDir = path.join(os.tmpdir(), "orupos-restaurants");
    if (!fs.existsSync(tmpDir)) {
      try {
        fs.mkdirSync(tmpDir, { recursive: true });
      } catch {
        // ignore
      }
    }
    return tmpDir;
  }
}

// GET /api/deploy-restaurant - List all deployed restaurants
export async function GET() {
  try {
    const baseDir = getRestaurantsBaseDir();
    const hasVpsStorage = fs.existsSync("/var/www/restaurants") || fs.existsSync("/docker/restaurants");
    const isVercel = Boolean(process.env.VERCEL || process.env.NEXT_PUBLIC_VERCEL_ENV);

    if (!fs.existsSync(baseDir)) {
      return NextResponse.json({ restaurants: [], baseDir, hasVpsStorage, isVercel });
    }

    const entries = fs.readdirSync(baseDir, { withFileTypes: true });
    const restaurants: DeployedRestaurant[] = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const slug = entry.name;
        const resDir = path.join(baseDir, slug);
        const distDir = path.join(resDir, "dist");
        const metaPath = path.join(resDir, "metadata.json");

        let name = slug.charAt(0).toUpperCase() + slug.slice(1);
        let deployedAt = fs.statSync(resDir).mtime.toISOString();
        let filesCount = 0;

        if (fs.existsSync(metaPath)) {
          try {
            const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
            if (meta.name) name = meta.name;
            if (meta.deployedAt) deployedAt = meta.deployedAt;
          } catch {
            // ignore
          }
        }

        const hasDist = fs.existsSync(distDir);
        const hasIndex = hasDist && fs.existsSync(path.join(distDir, "index.html"));

        if (hasDist) {
          try {
            filesCount = fs.readdirSync(distDir).length;
          } catch {
            filesCount = 0;
          }
        }

        restaurants.push({
          name,
          slug,
          subdomain: `${slug}.orupos.in`,
          url: `https://${slug}.orupos.in`,
          hasIndex,
          filesCount,
          deployedAt,
        });
      }
    }

    // Sort newest first
    restaurants.sort((a, b) => new Date(b.deployedAt).getTime() - new Date(a.deployedAt).getTime());

    return NextResponse.json({
      restaurants,
      baseDir,
      hasVpsStorage,
      isVercel,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to list deployed restaurants", details: String(error) },
      { status: 500 }
    );
  }
}

function ensureIndexAtRoot(targetDist: string): void {
  if (fs.existsSync(path.join(targetDist, "index.html"))) {
    return;
  }

  function findIndexDir(dir: string, depth = 0): string | null {
    if (depth > 3) return null;
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const e of entries) {
        if (e.isDirectory()) {
          const sub = path.join(dir, e.name);
          if (fs.existsSync(path.join(sub, "index.html"))) {
            return sub;
          }
          const deeper = findIndexDir(sub, depth + 1);
          if (deeper) return deeper;
        }
      }
    } catch {
      // ignore
    }
    return null;
  }

  const foundDir = findIndexDir(targetDist);
  if (foundDir && foundDir !== targetDist) {
    try {
      const entries = fs.readdirSync(foundDir);
      for (const e of entries) {
        const src = path.join(foundDir, e);
        const dest = path.join(targetDist, e);
        if (fs.existsSync(dest)) {
          fs.rmSync(dest, { recursive: true, force: true });
        }
        fs.renameSync(src, dest);
      }
      fs.rmSync(foundDir, { recursive: true, force: true });
    } catch {
      // ignore
    }
  }
}

function syncTraefikSubdomains(baseDir: string): void {
  const tlsConfigPath = "/etc/traefik/tls.yml";
  if (!fs.existsSync(tlsConfigPath)) {
    return;
  }
  try {
    const entries = fs.readdirSync(baseDir, { withFileTypes: true });
    const subdomains: string[] = ["demo.orupos.in"];
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const slug = entry.name;
        if (slug !== "demo" && fs.existsSync(path.join(baseDir, slug, "dist"))) {
          subdomains.push(`${slug}.orupos.in`);
        }
      }
    }

    const hostRules = subdomains.map((s) => `Host(\`${s}\`)`).join(" || ");
    const content = `tls:
  options:
    default:
      alpnProtocols:
        - "http/1.1"

http:
  routers:
    orupos-restaurants:
      rule: "${hostRules}"
      entryPoints:
        - "websecure"
      tls:
        certResolver: "letsencrypt"
      priority: 10
      service: "orupos-restaurants-svc"
  services:
    orupos-restaurants-svc:
      loadBalancer:
        servers:
          - url: "http://127.0.0.1:3003"
`;
    fs.writeFileSync(tlsConfigPath, content, "utf8");
  } catch (err) {
    console.error("Could not sync Traefik tls.yml:", err);
  }
}

// POST /api/deploy-restaurant - Upload and unpack restaurant build (supports both direct dist folder & .zip)
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = ((formData.get("name") as string) || "").trim();
    const rawSlug = ((formData.get("slug") as string) || "").trim();

    if (!rawSlug) {
      return NextResponse.json({ error: "Subdomain slug is required." }, { status: 400 });
    }

    const slug = rawSlug.toLowerCase().replace(/[^a-z0-9_-]/g, "");

    if (slug.length < 2) {
      return NextResponse.json(
        { error: "Slug must contain at least 2 alphanumeric characters." },
        { status: 400 }
      );
    }

    if (slug === "www" || slug === "api" || slug === "admin" || slug === "app") {
      return NextResponse.json(
        { error: `The subdomain "${slug}" is reserved. Please pick another name.` },
        { status: 400 }
      );
    }

    const baseDir = getRestaurantsBaseDir();
    const restaurantDir = path.join(baseDir, slug);
    const targetDist = path.join(restaurantDir, "dist");

    // Ensure target dist directory is created and cleaned
    if (fs.existsSync(targetDist)) {
      fs.rmSync(targetDist, { recursive: true, force: true });
    }
    fs.mkdirSync(targetDist, { recursive: true });

    // Mode A: Direct folder upload with multiple files
    const uploadedFiles = formData.getAll("files") as File[];
    const pathsFromAll = formData.getAll("paths") as string[];

    if (uploadedFiles && uploadedFiles.length > 0) {
      let paths: string[] = [];
      if (pathsFromAll.length > 0) {
        if (pathsFromAll.length === 1 && pathsFromAll[0].trim().startsWith("[")) {
          try {
            paths = JSON.parse(pathsFromAll[0]);
          } catch {
            paths = pathsFromAll;
          }
        } else {
          paths = pathsFromAll;
        }
      }

      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        let relPath = (paths[i] || file.name).replace(/\\/g, "/");

        // Clean path to prevent directory traversal
        relPath = relPath.replace(/^(\.\.[\/\\])+/, "").replace(/^\/+/, "");
        // Normalize: if user selected the dist folder itself, strip leading "dist/" or "build/"
        relPath = relPath.replace(/^(dist|build|out)\//i, "");

        const filePath = path.join(targetDist, relPath);
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(filePath, buffer);
      }
    } else {
      // Mode B: Archive upload (.zip file)
      const zipFile = formData.get("file") as File | null;

      if (!zipFile) {
        return NextResponse.json(
          { error: "Please drop your 'dist' folder or upload a .zip build file." },
          { status: 400 }
        );
      }

      // Save uploaded zip file to temp path
      const buffer = Buffer.from(await zipFile.arrayBuffer());
      const tempZipPath = path.join(os.tmpdir(), `orupos-${slug}-${Date.now()}.zip`);
      fs.writeFileSync(tempZipPath, buffer);

      // Extract archive
      const isWindows = process.platform === "win32";
      try {
        if (isWindows) {
          execSync(`tar -xf "${tempZipPath}" -C "${targetDist}"`);
        } else {
          execSync(`unzip -o -q "${tempZipPath}" -d "${targetDist}"`);
        }
      } catch {
        // Fallback to tar if unzip failed
        try {
          execSync(`tar -xf "${tempZipPath}" -C "${targetDist}"`);
        } catch (extractErr) {
          if (fs.existsSync(tempZipPath)) fs.unlinkSync(tempZipPath);
          return NextResponse.json(
            { error: "Could not extract archive. Ensure it is a valid .zip file or drag the 'dist' folder directly.", details: String(extractErr) },
            { status: 400 }
          );
        }
      }

      // Clean temp zip
      if (fs.existsSync(tempZipPath)) {
        fs.unlinkSync(tempZipPath);
      }
    }

    // Recursively flatten if index.html is in any subfolder
    ensureIndexAtRoot(targetDist);

    // Sync Traefik dynamic router so new subdomain immediately gets Let's Encrypt SSL
    syncTraefikSubdomains(baseDir);

    // Count files
    let filesCount = 0;
    try {
      filesCount = fs.readdirSync(targetDist).length;
    } catch {
      filesCount = 1;
    }

    // Write metadata
    const displayName = name || (slug.charAt(0).toUpperCase() + slug.slice(1));
    const deployedAt = new Date().toISOString();
    const metadata = {
      name: displayName,
      slug,
      subdomain: `${slug}.orupos.in`,
      url: `https://${slug}.orupos.in`,
      filesCount,
      deployedAt,
    };

    fs.writeFileSync(path.join(restaurantDir, "metadata.json"), JSON.stringify(metadata, null, 2));

    return NextResponse.json({
      success: true,
      message: `Website deployed successfully! Accessible on ${slug}.orupos.in`,
      restaurant: metadata,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Deployment failed", details: String(error) },
      { status: 500 }
    );
  }
}

// DELETE /api/deploy-restaurant - Remove a restaurant subdomain
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = (searchParams.get("slug") || "").toLowerCase().trim().replace(/[^a-z0-9_-]/g, "");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const baseDir = getRestaurantsBaseDir();
    const restaurantDir = path.join(baseDir, slug);

    if (fs.existsSync(restaurantDir)) {
      fs.rmSync(restaurantDir, { recursive: true, force: true });
      syncTraefikSubdomains(baseDir);
      return NextResponse.json({ success: true, message: `Removed ${slug}.orupos.in` });
    }

    return NextResponse.json({ error: "Restaurant directory not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete restaurant", details: String(error) },
      { status: 500 }
    );
  }
}
