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
  getWhatsAppUrl: (data?: { tables?: number; restaurantName?: string; ownerName?: string; city?: string; customMessage?: string }) => string;
}

export const ORUPOS_CONFIG: OruPosConfig = {
  businessName: "OruPos",
  tagline: "The Zero-Subscription Restaurant POS & Table Management System",
  legalEntity: "OruPos Hospitality Technologies",

  pricing: {
    pricePerTable: 199,
    currencySymbol: "₹",
    setupFee: 0,
    unitText: "per table (one-time)",
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
      note: "Doorstep delivery & remote POS onboarding across all Indian states and union territories."
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
      id: "pos-software",
      title: "Full Restaurant POS Software",
      desc: "Cloud POS for dine-in table management, staff order punching, bill generation, GST calculation, and daily sales tracking with zero monthly subscription fees."
    },
    {
      id: "kot-system",
      title: "Real-Time Kitchen KOT Routing",
      desc: "Orders punch directly into the kitchen display with table number and special cooking notes, eliminating lost paper slips and waiter confusion."
    },
    {
      id: "qr-ordering",
      title: "Contactless QR Table Ordering",
      desc: "Diners scan the table QR code to browse high-res photos and place orders in 1 second on mobile without downloading any app."
    },
    {
      id: "table-stand",
      title: "Physical Acrylic Table Station",
      desc: "Durable clear 3mm acrylic T-stand built to withstand spills, hot food, and restaurant cleaning, featuring clear dual-sided table numbers."
    },
    {
      id: "gst-billing",
      title: "GST Billing & Digital Invoices",
      desc: "Automated 5% restaurant GST calculations, split-bills, WhatsApp digital receipts, and UPI payment reconciliation."
    },
    {
      id: "menu-setup",
      title: "100% Done-For-You Menu Setup",
      desc: "Send us photos of your paper menu on WhatsApp. Our onboarding specialists digitize your dishes, categories, dietary tags, and prices for you."
    }
  ],

  calculateTotal(tables: number): number {
    const qty = Math.max(1, Math.min(200, tables || 1));
    return qty * this.pricing.pricePerTable;
  },

  formatCurrency(amount: number): string {
    return this.pricing.currencySymbol + Number(amount).toLocaleString("en-IN");
  },

  getWhatsAppUrl(data: { tables?: number; restaurantName?: string; ownerName?: string; city?: string; customMessage?: string } = {}): string {
    if (data.customMessage) {
      return `${this.urls.whatsappBase}${this.contact.whatsappNumber}?text=${encodeURIComponent(data.customMessage)}`;
    }

    const tables = data.tables || this.pricing.defaultTables;
    const total = this.calculateTotal(tables);
    const restaurantName = data.restaurantName ? `Restaurant: ${data.restaurantName}` : "";
    const ownerName = data.ownerName ? `Owner: ${data.ownerName}` : "";
    const city = data.city ? `City: ${data.city}` : "";

    let text = `Namaste OruPos Team!\nI am interested in getting the OruPos Zero-Subscription POS System for my restaurant.\n\n`;
    text += `• Tables in my restaurant: ${tables} tables\n`;
    text += `• Total One-Time Setup: ${this.formatCurrency(total)} (@ ₹199/table)\n`;
    text += `• Includes: Complete POS software + KOT + QR table stands + Menu setup\n`;
    if (restaurantName) text += `• ${restaurantName}\n`;
    if (ownerName) text += `• ${ownerName}\n`;
    if (city) text += `• ${city}\n`;
    text += `\nPlease guide me on the onboarding process to get our restaurant POS live.`;

    return `${this.urls.whatsappBase}${this.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }
};
