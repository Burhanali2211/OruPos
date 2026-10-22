/**
 * Multi-Tenant Restaurant Registry & Whitelist Store
 * Only restaurants registered here will be accessible on subdomains.
 */

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  isVeg: boolean;
  desc: string;
  badge?: string;
  image?: string;
}

export interface MenuCategory {
  id: string;
  label: string;
}

export interface RestaurantData {
  slug: string; // e.g. "spiceroute" -> spiceroute.orupos.in
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  rating: string;
  prepTime: string;
  location: string;
  tableCount: number;
  themeColor: string;
  active: boolean;
  createdAt: string;
  categories: MenuCategory[];
  items: MenuItem[];
}

export interface TableOrder {
  id: string;
  restaurantSlug: string;
  tableNumber: string;
  items: { item: MenuItem; quantity: number }[];
  total: number;
  customerNote?: string;
  status: "pending" | "preparing" | "completed";
  createdAt: string;
}

// Starter packs for fast menu setup in admin
export const STARTER_MENU_PACKS: Record<
  string,
  { name: string; categories: MenuCategory[]; items: MenuItem[] }
> = {
  indian: {
    name: "North Indian & Tandoor",
    categories: [
      { id: "all", label: "All Items" },
      { id: "starters", label: "Tandoori Starters" },
      { id: "curries", label: "Main Curries" },
      { id: "breads", label: "Breads & Naan" },
      { id: "rice", label: "Biryani & Rice" },
      { id: "drinks", label: "Beverages" },
    ],
    items: [
      {
        id: "in1",
        name: "Paneer Tikka Angara",
        price: 260,
        category: "starters",
        isVeg: true,
        badge: "Bestseller",
        image: "/assets/dish-paneer.jpg",
        desc: "Fresh cottage cheese cubes marinated in spiced hung curd and charred in clay tandoor.",
      },
      {
        id: "in2",
        name: "Tandoori Murgh (Half)",
        price: 290,
        category: "starters",
        isVeg: false,
        badge: "Chef Special",
        desc: "Classic bone-in chicken marinated in degi mirch, fresh yogurt, and roasted spices.",
      },
      {
        id: "in3",
        name: "Dal Makhani Handi",
        price: 240,
        category: "curries",
        isVeg: true,
        badge: "Must Try",
        desc: "Whole black lentils slow-cooked overnight for 16 hours with butter and cream.",
      },
      {
        id: "in4",
        name: "Paneer Butter Masala",
        price: 280,
        category: "curries",
        isVeg: true,
        image: "/assets/dish-paneer.jpg",
        desc: "Soft paneer chunks simmered in a mildly sweet velvety tomato cashew gravy.",
      },
      {
        id: "in5",
        name: "Dum Chicken Biryani Handi",
        price: 340,
        category: "rice",
        isVeg: false,
        badge: "Signature",
        image: "/assets/dish-biryani.jpg",
        desc: "Aromatic basmati rice and marinated chicken slow dum-cooked in clay handi.",
      },
      {
        id: "in6",
        name: "Butter Garlic Naan",
        price: 75,
        category: "breads",
        isVeg: true,
        desc: "Leavened fine flour bread baked in tandoor with fresh minced garlic and butter.",
      },
      {
        id: "in7",
        name: "Fresh Lime Soda",
        price: 60,
        category: "drinks",
        isVeg: true,
        desc: "Chilled sparkling soda with freshly squeezed lime and mint.",
      },
    ],
  },
  cafe: {
    name: "Cafe & Bakery",
    categories: [
      { id: "all", label: "All Items" },
      { id: "coffee", label: "Specialty Coffee" },
      { id: "toast", label: "Sourdough Toast" },
      { id: "burgers", label: "Burgers & Sandwiches" },
      { id: "desserts", label: "Bakes & Cakes" },
    ],
    items: [
      {
        id: "cf1",
        name: "Spanish Vanilla Latte",
        price: 210,
        category: "coffee",
        isVeg: true,
        badge: "Top Rated",
        desc: "Double shot of specialty espresso with steamed condensed milk and silky microfoam.",
      },
      {
        id: "cf2",
        name: "Avocado & Danish Feta Toast",
        price: 280,
        category: "toast",
        isVeg: true,
        badge: "Healthy",
        desc: "Artisan sourdough toast with smashed Hass avocado, feta, and toasted pumpkin seeds.",
      },
      {
        id: "cf3",
        name: "Crispy Buttermilk Chicken Brioche",
        price: 340,
        category: "burgers",
        isVeg: false,
        badge: "Popular",
        desc: "Crispy spiced fried chicken breast with house honey mustard slaw and pickles.",
      },
      {
        id: "cf4",
        name: "Nutella Sea Salt Croissant",
        price: 180,
        category: "desserts",
        isVeg: true,
        desc: "Flaky pure French butter croissant filled with warm Nutella and Maldon salt.",
      },
    ],
  },
  continental: {
    name: "Continental & Italian",
    categories: [
      { id: "all", label: "All Courses" },
      { id: "antipasti", label: "Antipasti" },
      { id: "pasta", label: "Handmade Pasta" },
      { id: "pizza", label: "Woodfired Pizza" },
    ],
    items: [
      {
        id: "co1",
        name: "Burrata Confit Pomodorini",
        price: 490,
        category: "antipasti",
        isVeg: true,
        badge: "Imported",
        desc: "Creamy artisanal burrata with heirloom tomato confit and fresh basil pesto.",
      },
      {
        id: "co2",
        name: "Truffle Tagliolini Parmigiano",
        price: 520,
        category: "pasta",
        isVeg: true,
        badge: "Chef Signature",
        desc: "Egg ribbon tagliolini in Normandy butter and black truffle sauce.",
      },
      {
        id: "co3",
        name: "Napoli Margherita D.O.P.",
        price: 450,
        category: "pizza",
        isVeg: true,
        desc: "48-hour fermented slow dough, San Marzano tomatoes, and Fior di Latte mozzarella.",
      },
    ],
  },
};

// Default pre-approved restaurants (Whitelist)
export const DEFAULT_RESTAURANTS: Record<string, RestaurantData> = {
  demo: {
    slug: "demo",
    name: "The Grand Taj Restaurant",
    tagline: "North Indian • Tandoor • Mughlai • Chinese",
    phone: "+919876543210",
    whatsapp: "919876543210",
    rating: "4.6",
    prepTime: "15-20 Mins",
    location: "Main Road, Near Clock Tower",
    tableCount: 15,
    themeColor: "#1E3A2F",
    active: true,
    createdAt: "2026-01-01",
    categories: STARTER_MENU_PACKS.indian.categories,
    items: STARTER_MENU_PACKS.indian.items,
  },

  spiceroute: {
    slug: "spiceroute",
    name: "Spice Route Kitchen & Bar",
    tagline: "Royal Indian Flavours • Charcoal Kebabs • Craft Mocktails",
    phone: "+919876543211",
    whatsapp: "919876543211",
    rating: "4.8",
    prepTime: "15-20 Mins",
    location: "12th Main, Indiranagar, Bengaluru",
    tableCount: 20,
    themeColor: "#E5A93C",
    active: true,
    createdAt: "2026-02-10",
    categories: STARTER_MENU_PACKS.indian.categories,
    items: STARTER_MENU_PACKS.indian.items,
  },

  beanbun: {
    slug: "beanbun",
    name: "Bean & Bun Artisan Cafe",
    tagline: "Specialty Espresso • Sourdough Bakes • Gourmet Burgers",
    phone: "+919876543212",
    whatsapp: "919876543212",
    rating: "4.7",
    prepTime: "10-15 Mins",
    location: "Jubilee Hills, Hyderabad",
    tableCount: 12,
    themeColor: "#1E3A2F",
    active: true,
    createdAt: "2026-03-01",
    categories: STARTER_MENU_PACKS.cafe.categories,
    items: STARTER_MENU_PACKS.cafe.items,
  },

  maisonalba: {
    slug: "maisonalba",
    name: "Maison Alba Continental",
    tagline: "French & Italian Heritage • Handmade Pastas • Woodfired Pies",
    phone: "+919876543213",
    whatsapp: "919876543213",
    rating: "4.9",
    prepTime: "20-25 Mins",
    location: "Park Street, Kolkata",
    tableCount: 18,
    themeColor: "#142921",
    active: true,
    createdAt: "2026-03-15",
    categories: STARTER_MENU_PACKS.continental.categories,
    items: STARTER_MENU_PACKS.continental.items,
  },
};

// Global memory registry to persist dynamically registered domains across Next.js server calls
declare global {
  // eslint-disable-next-line no-var
  var __orupos_restaurants: Record<string, RestaurantData> | undefined;
}

function getMemoryStore(): Record<string, RestaurantData> {
  if (typeof globalThis !== "undefined") {
    if (!globalThis.__orupos_restaurants) {
      globalThis.__orupos_restaurants = { ...DEFAULT_RESTAURANTS };
    }
    return globalThis.__orupos_restaurants;
  }
  return { ...DEFAULT_RESTAURANTS };
}

/**
 * Returns all registered restaurants (both pre-approved and dynamically added)
 */
export function getAllRestaurants(): RestaurantData[] {
  const store = getMemoryStore();

  // If in browser, merge with localStorage
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("orupos_custom_restaurants");
      if (stored) {
        const parsed = JSON.parse(stored);
        Object.assign(store, parsed);
      }
    } catch {
      // ignore
    }
  }

  return Object.values(store);
}

/**
 * STRICT ACCESS CONTROL:
 * Returns restaurant data ONLY if the slug is explicitly registered and marked active.
 * If the subdomain has not been registered in the dashboard, returns null!
 */
export function getRestaurantBySlug(slug: string, tableParam?: string): RestaurantData | null {
  if (!slug) return null;
  const normalized = slug.toLowerCase().trim().replace(/[^a-z0-9_-]/g, "");

  const store = getMemoryStore();

  // Also check client localStorage if running in browser
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("orupos_custom_restaurants");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed[normalized]) {
          store[normalized] = parsed[normalized];
        }
      }
    } catch {
      // ignore
    }
  }

  const found = store[normalized];

  if (found && found.active) {
    return {
      ...found,
      location: found.location || "Dine-In Area",
      tableCount: found.tableCount || 10,
    };
  }

  // Not registered or inactive -> return null for strict whitelist gating!
  return null;
}

/**
 * Register a new restaurant subdomain
 */
export function registerRestaurant(
  data: {
    slug: string;
    name: string;
    tagline?: string;
    phone?: string;
    whatsapp?: string;
    location?: string;
    tableCount?: number;
    themeColor?: string;
    starterPack?: string;
  }
): RestaurantData {
  const normalizedSlug = data.slug.toLowerCase().trim().replace(/[^a-z0-9_-]/g, "");
  const packKey = data.starterPack && STARTER_MENU_PACKS[data.starterPack] ? data.starterPack : "indian";
  const pack = STARTER_MENU_PACKS[packKey];

  const newRestaurant: RestaurantData = {
    slug: normalizedSlug,
    name: data.name.trim(),
    tagline: data.tagline?.trim() || "Digital QR Menu • Live Table Ordering",
    phone: data.phone?.trim() || "+919876543210",
    whatsapp: (data.whatsapp || data.phone || "919876543210").replace(/[^0-9]/g, ""),
    rating: "4.8 (New)",
    prepTime: "15-20 Mins",
    location: data.location?.trim() || "Main Dining Area",
    tableCount: Number(data.tableCount) || 12,
    themeColor: data.themeColor || "#1E3A2F",
    active: true,
    createdAt: new Date().toISOString().split("T")[0],
    categories: pack.categories,
    items: pack.items,
  };

  const store = getMemoryStore();
  store[normalizedSlug] = newRestaurant;

  // Persist to browser localStorage
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("orupos_custom_restaurants");
      const current = stored ? JSON.parse(stored) : {};
      current[normalizedSlug] = newRestaurant;
      localStorage.setItem("orupos_custom_restaurants", JSON.stringify(current));
    } catch {
      // ignore
    }
  }

  return newRestaurant;
}

/**
 * Toggle restaurant active status (for whitelist gating)
 */
export function toggleRestaurantActive(slug: string): boolean {
  const normalized = slug.toLowerCase().trim();
  const store = getMemoryStore();

  if (store[normalized]) {
    store[normalized].active = !store[normalized].active;

    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("orupos_custom_restaurants");
        const current = stored ? JSON.parse(stored) : {};
        current[normalized] = store[normalized];
        localStorage.setItem("orupos_custom_restaurants", JSON.stringify(current));
      } catch {
        // ignore
      }
    }
    return store[normalized].active;
  }
  return false;
}

/**
 * Delete a restaurant from the registry
 */
export function deleteRestaurant(slug: string): boolean {
  const normalized = slug.toLowerCase().trim();
  const store = getMemoryStore();

  if (store[normalized]) {
    delete store[normalized];

    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("orupos_custom_restaurants");
        if (stored) {
          const current = JSON.parse(stored);
          delete current[normalized];
          localStorage.setItem("orupos_custom_restaurants", JSON.stringify(current));
        }
      } catch {
        // ignore
      }
    }
    return true;
  }
  return false;
}
