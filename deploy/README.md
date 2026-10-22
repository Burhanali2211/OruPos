# OruPos VPS Deployment Guide

This guide explains how to deploy **OruPos** on your VPS with:
1. **The Main Marketing Website**: `https://orupos.in`
2. **Dynamic Restaurant Subdomains**: `https://<restaurant-name>.orupos.in`
   * Only subdomains where you drop a `dist/` folder will work.
   * Any unregistered subdomain automatically redirects to `https://orupos.in`!

---

## Architecture Overview

```
                      User visits *.orupos.in
                               │
                               ▼
        Cloudflare DNS (*.orupos.in -> VPS IP, Proxied 🟠)
         [Free Wildcard SSL, DDoS Protection, CDN]
                               │
                               ▼
                        Your VPS (Nginx)
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
     Main Website: orupos.in            Subdomains: *.orupos.in
  (Proxy to Next.js on port 3000)       (Check /var/www/restaurants/<name>/dist)
                                                  │
                                                  ├─ Exists?   --> Serves Svelte App
                                                  └─ No exist? --> Redirects to orupos.in
```

---

## Step 1: Cloudflare DNS (Set Once, Works Forever)

In your Cloudflare dashboard for **`orupos.in`** (or your DNS manager):

| Type | Name | Content / Value | Proxy status |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `YOUR_VPS_IP` | 🟠 **Proxied** |
| **A** | `www` | `YOUR_VPS_IP` | 🟠 **Proxied** |
| **A** | `*` | `YOUR_VPS_IP` | 🟠 **Proxied** |

> **Why Cloudflare Proxy (🟠)?**
> Cloudflare provides **free, automatic Wildcard SSL (`*.orupos.in`)**. This means every single restaurant subdomain instantly gets a green HTTPS padlock with zero Certbot commands or SSL renewal hassles!

---

## Step 2: One-Command VPS Initial Setup

SSH into your VPS as `root` or `sudo` user:

```bash
ssh root@YOUR_VPS_IP
```

Clone the repository into your user directory or `/var/www/orupos-main`:

```bash
git clone https://github.com/Burhanali2211/OruPos.git /var/www/orupos-main
cd /var/www/orupos-main
```

Run the automated setup script:

```bash
chmod +x deploy/setup-vps.sh
bash deploy/setup-vps.sh
```

This script automatically:
* Installs Nginx, Node.js 20 LTS, and PM2.
* Creates `/var/www/restaurants/` directory for your Svelte menus.
* Creates a starter demo at `/var/www/restaurants/demo/dist/`.
* Activates the Nginx wildcard routing configuration.

---

## Step 3: Start the Main Website (`orupos.in`) with PM2

Inside `/var/www/orupos-main`:

```bash
# 1. Install dependencies and build the Next.js app
npm install
npm run build

# 2. Copy static and public assets into standalone directory
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

# 3. Start the Next.js app with PM2
pm2 start deploy/ecosystem.config.js
pm2 save
```

Your main website `https://orupos.in` is now live and running 24/7!

---

## Step 4: How to Add a New Restaurant (The 10-Second Workflow)

Whenever you build a new restaurant menu in Svelte, Vue, or HTML:

1. Run build in your Svelte project:
   ```bash
   npm run build
   ```
   (This creates the `dist/` folder).

2. Upload or copy that `dist/` folder to your VPS at:
   ```bash
   /var/www/restaurants/<restaurant-slug>/dist
   ```
   *Example for Taj Restaurant:*
   `/var/www/restaurants/taj/dist/index.html`

3. **That's it!**
   * `https://taj.orupos.in` immediately opens the restaurant's menu!
   * You don't need to touch DNS.
   * You don't need to restart Nginx.
   * You don't need to configure SSL.

---

## What Happens to Random Subdomains?

If anyone tries to open `randomname.orupos.in`:
* Nginx checks if `/var/www/restaurants/randomname/dist` exists.
* Since the folder does **not** exist, Nginx **immediately rejects it and redirects them to `https://orupos.in`**!
* Zero unauthorized access.
