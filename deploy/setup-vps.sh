#!/usr/bin/env bash
# ==============================================================================
# OruPos Automated VPS Setup Script (Ubuntu / Debian)
# Sets up Nginx, Node.js 20 LTS, PM2, and Wildcard Restaurant Directories
# Run with: bash setup-vps.sh
# ==============================================================================

set -e

echo "=========================================="
echo " Starting OruPos VPS Setup"
echo "=========================================="

# 1. Update system packages
echo "--> Updating system packages..."
sudo apt update && sudo apt upgrade -y

# 2. Install essential packages (curl, git, nginx)
echo "--> Installing Nginx and utilities..."
sudo apt install -y curl git nginx ufw

# 3. Install Node.js 20 LTS (if not already installed)
if ! command -v node &> /dev/null; then
    echo "--> Installing Node.js 20 LTS..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
else
    echo "--> Node.js is already installed ($(node -v))."
fi

# 4. Install PM2 process manager
if ! command -v pm2 &> /dev/null; then
    echo "--> Installing PM2 globally..."
    sudo npm install -g pm2
    sudo pm2 startup systemd -u $USER --hp $HOME
else
    echo "--> PM2 is already installed ($(pm2 -v))."
fi

# 5. Create directory structures
echo "--> Creating directories for main site and restaurants..."
sudo mkdir -p /var/www/orupos-main
sudo mkdir -p /var/www/restaurants
sudo chown -R $USER:$USER /var/www/orupos-main
sudo chown -R $USER:$USER /var/www/restaurants
sudo chmod -R 755 /var/www

# 6. Create a sample starter demo restaurant so demo.orupos.in works immediately
mkdir -p /var/www/restaurants/demo/dist
cat << 'EOF' > /var/www/restaurants/demo/dist/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Demo Restaurant — Live Digital Menu | OruPos</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #FAF8F5; color: #1F1F1F; margin: 0; padding: 40px 20px; display: flex; align-items: center; justify-content: center; min-height: 80vh; }
    .card { background: #FFFFFF; border-radius: 16px; padding: 32px; max-width: 440px; text-align: center; border: 1px solid #ECE7E1; box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
    h1 { color: #1E3A2F; margin-top: 0; font-size: 22px; }
    p { color: #6B7280; font-size: 14px; line-height: 1.5; }
    .badge { display: inline-block; background: #ECFDF5; color: #065F46; padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 12px; margin-bottom: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">Live Restaurant Menu</div>
    <h1>The Grand Taj Restaurant</h1>
    <p>This is a sample Svelte / Static menu running on your VPS under <code>/var/www/restaurants/demo/dist</code>.</p>
    <p>Drop any Svelte or web project folder into <code>/var/www/restaurants/&lt;name&gt;/dist</code> to launch a new restaurant subdomain instantly!</p>
  </div>
</body>
</html>
EOF

# 7. Install and enable Nginx site configuration
echo "--> Configuring Nginx for orupos.in and *.orupos.in..."
sudo cp deploy/nginx-orupos.conf /etc/nginx/sites-available/orupos.conf || true

if [ -f "/etc/nginx/sites-available/orupos.conf" ]; then
    sudo ln -sf /etc/nginx/sites-available/orupos.conf /etc/nginx/sites-enabled/orupos.conf
    # Remove default nginx welcome page
    sudo rm -f /etc/nginx/sites-enabled/default
    echo "--> Testing Nginx configuration..."
    sudo nginx -t
    sudo systemctl reload nginx
fi

# 8. Configure firewall (UFW)
echo "--> Configuring UFW firewall (SSH, HTTP, HTTPS)..."
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
# Do not force enable UFW if user hasn't configured it to avoid SSH lockout

echo "=========================================="
echo " Setup Complete!"
echo " Next Steps:"
echo " 1. Set your Cloudflare DNS: A record for '*' pointing to this VPS IP (Proxied 🟠)"
echo " 2. Set your Cloudflare DNS: A record for '@' pointing to this VPS IP (Proxied 🟠)"
echo " 3. Deploy your main Next.js app to /var/www/orupos-main"
echo " 4. Drop any restaurant Svelte 'dist' into /var/www/restaurants/<name>/dist"
echo "=========================================="
