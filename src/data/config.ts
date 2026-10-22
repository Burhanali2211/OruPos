/**
 * Centralized OruPos Business Configuration (TypeScript)
 * Single source of truth for pricing, branding, contact info, and deliverables.
 */

export interface PricingConfig {
  pricePerTable: number;
  currencySymbol: string;
  setupFee: number;
  unitText: string;
  defaultTables: number;
  minTables: number;
  maxTables: number;
  presets: number[];
}

export interface ContactConfig {
  phoneDisplay: string;
  phoneTel: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  address: {
    line1: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    note: string;
  };
  operatingHours: string;
  responseTime: string;
}

export interface PackageDeliverable {
  id: string;
  title: string;
  desc: string;
}

export interface OruPosConfig {
  businessName: string;
  tagline: string;
  legalEntity: string;
  pricing: PricingConfig;
  contact: ContactConfig;
  urls: {
    demoMenu: string;
    website: string;
    whatsappBase: string;
  };
  packageIncludes: PackageDeliverable[];
  calculateTotal: (tables: number) => number;
  formatCurrency: (amount: number) => string;
  getWhatsAppUrl: (data?: { tables?: number; restaurantName?: string; ownerName?: string; city?: string }) => string;
}

export const ORUPOS_CONFIG: OruPosConfig = {
  businessName: "OruPos",
  tagline: "Digital Menu & QR Table Stands for Indian Food Businesses",
  legalEntity: "OruPos Hospitality Solutions",

  pricing: {
    pricePerTable: 199,
    currencySymbol: "₹",
    setupFee: 0,
    unitText: "per table",
    defaultTables: 10,
    minTables: 1,
    maxTables: 200,
    presets: [5, 10, 15, 20, 30, 50],
  },

  contact: {
    phoneDisplay: "+91 60056 59527",
    phoneTel: "+916005659527",
    whatsappNumber: "916005659527",
    whatsappDisplay: "+91 60056 59527",
    email: "faheem@easyio.tech",
    address: {
      line1: "OruPos Hospitality Technologies",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      pincode: "560001",
      note: "Doorstep delivery across all Indian states and union territories."
    },
    operatingHours: "Monday to Sunday: 9:00 AM – 9:00 PM IST",
    responseTime: "Usually replies in under 15 minutes on WhatsApp"
  },

  urls: {
    demoMenu: "/demo",
    website: "https://orupos.in",
    whatsappBase: "https://wa.me/"
  },

  packageIncludes: [
    {
      id: "table-stand",
      title: "Physical QR Table Stand",
      desc: "Durable clear acrylic T-stand built to withstand spills, hot food, and daily restaurant cleaning."
    },
    {
      id: "table-number",
      title: "Table Number Printed",
      desc: "Clear individual table numbers (Table 01, Table 02...) printed on each stand so staff knows where orders come from."
    },
    {
      id: "qr-code",
      title: "Dedicated QR Code",
      desc: "Scannable with any phone camera, Google Lens, Paytm, PhonePe, or browser without installing any app."
    },
    {
      id: "digital-menu",
      title: "Digital Menu Website",
      desc: "Opens instantly in 1 second on your customer's mobile browser with full dish photos, categories, and prices."
    },
    {
      id: "restaurant-branding",
      title: "Restaurant Branding",
      desc: "Your restaurant name, logo, banner, address, phone number, and timings customized cleanly."
    },
    {
      id: "menu-setup",
      title: "Menu Setup Done For You",
      desc: "Send us a photo of your current paper menu on WhatsApp. Our team enters all your dishes, categories, and prices for you."
    }
  ],

  calculateTotal(tables: number): number {
    const qty = Math.max(1, Math.min(200, tables || 1));
    return qty * this.pricing.pricePerTable;
  },

  formatCurrency(amount: number): string {
    return this.pricing.currencySymbol + Number(amount).toLocaleString("en-IN");
  },

  getWhatsAppUrl(data = {}): string {
    const tables = data.tables || this.pricing.defaultTables;
    const total = this.calculateTotal(tables);
    const restaurantName = data.restaurantName ? `Restaurant: ${data.restaurantName}` : "";
    const ownerName = data.ownerName ? `Owner: ${data.ownerName}` : "";
    const city = data.city ? `City: ${data.city}` : "";

    let text = `Namaste OruPos Team!\nI am interested in getting digital menus and QR table stands for my food business.\n\n`;
    text += `• Tables needed: ${tables} tables\n`;
    text += `• Estimated Total: ${this.formatCurrency(total)} (@ ₹199/table)\n`;
    if (restaurantName) text += `• ${restaurantName}\n`;
    if (ownerName) text += `• ${ownerName}\n`;
    if (city) text += `• ${city}\n`;
    text += `\nPlease guide me on how to send my menu and get started.`;

    return `${this.urls.whatsappBase}${this.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }
};
