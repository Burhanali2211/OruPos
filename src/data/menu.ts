/**
 * Centralized Restaurant Menu Registry & Data Model
 * Powers individual subdomains (e.g. restaurantname.orupos.in)
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
  slug: string;
  name: string;
  tagline: string;
  rating: string;
  prepTime: string;
  location: string;
  tableNumber: string;
  themeColor?: string;
  categories: MenuCategory[];
  items: MenuItem[];
}

export const RESTAURANTS: Record<string, RestaurantData> = {
  // Demo / Default
  demo: {
    slug: "demo",
    name: "The Grand Taj Restaurant",
    tagline: "North Indian • Tandoor • Mughlai • Chinese",
    rating: "4.6 (1,240+ Diners)",
    prepTime: "15-20 Mins",
    location: "Main Road, Near Clock Tower",
    tableNumber: "Table 04",
    categories: [
      { id: "all", label: "All Items" },
      { id: "starters", label: "Starters" },
      { id: "curries", label: "Main Curries" },
      { id: "breads", label: "Tandoor & Breads" },
      { id: "biryani", label: "Biryani & Rice" },
      { id: "beverages", label: "Beverages" },
      { id: "desserts", label: "Desserts" },
    ],
    items: [
      {
        id: "s1",
        name: "Paneer Tikka Angara",
        price: 260,
        category: "starters",
        isVeg: true,
        badge: "Must Try",
        image: "/assets/dish-paneer.jpg",
        desc: "Fresh cottage cheese cubes marinated in spiced hung curd, charred in clay tandoor with capsicum and onions.",
      },
      {
        id: "s2",
        name: "Crispy Corn Pepper Salt",
        price: 190,
        category: "starters",
        isVeg: true,
        desc: "Golden sweet corn kernels tossed with freshly crushed black pepper, green chilies, and spring onions.",
      },
      {
        id: "s3",
        name: "Murgh Malai Tikka",
        price: 320,
        category: "starters",
        isVeg: false,
        badge: "Chef's Special",
        desc: "Tender boneless chicken steeped in rich cream, cashew paste, and gentle green cardamom cooked over charcoal.",
      },
      {
        id: "s4",
        name: "Tandoori Chicken (Half)",
        price: 280,
        category: "starters",
        isVeg: false,
        badge: "Spicy",
        desc: "Traditional bone-in chicken marinated in roasted degi mirch, curd, and secret spices.",
      },
      {
        id: "c1",
        name: "Dal Makhani Royal",
        price: 240,
        category: "curries",
        isVeg: true,
        badge: "All-Time Favorite",
        desc: "Black lentils slow-cooked overnight for 16 hours on clay embers, finished with farm butter and cream.",
      },
      {
        id: "c2",
        name: "Paneer Butter Masala",
        price: 280,
        category: "curries",
        isVeg: true,
        image: "/assets/dish-paneer.jpg",
        desc: "Soft paneer chunks simmered in a mildly sweet and tangy velvety tomato cashew gravy.",
      },
      {
        id: "c3",
        name: "Butter Chicken (Boneless)",
        price: 360,
        category: "curries",
        isVeg: false,
        badge: "Popular",
        desc: "Smoky shredded tandoori chicken cooked in classic satin tomato makhani gravy enriched with kasoori methi.",
      },
      {
        id: "c4",
        name: "Pindi Chana Masala",
        price: 210,
        category: "curries",
        isVeg: true,
        desc: "Authentic rustic Punjabi chickpeas cooked with roasted dry spices, ginger juliennes, and green chilies.",
      },
      {
        id: "b1",
        name: "Butter Garlic Naan",
        price: 75,
        category: "breads",
        isVeg: true,
        desc: "Leavened fine flour bread baked in tandoor, topped with minced garlic and melted Amul butter.",
      },
      {
        id: "b2",
        name: "Tandoori Butter Roti",
        price: 25,
        category: "breads",
        isVeg: true,
        desc: "100% whole wheat flatbread made fresh in clay tandoor with pure ghee glaze.",
      },
      {
        id: "r1",
        name: "Dum Chicken Biryani Handi",
        price: 340,
        category: "biryani",
        isVeg: false,
        badge: "Signature",
        image: "/assets/dish-biryani.jpg",
        desc: "Aromatic long grain basmati rice and marinated chicken slow dum-cooked in clay handi. Served with raita and salan.",
      },
      {
        id: "r2",
        name: "Hyderabadi Subz Biryani",
        price: 270,
        category: "biryani",
        isVeg: true,
        desc: "Seasonal vegetables and fresh paneer layered with aromatic spiced basmati rice and saffron. Served with raita.",
      },
      {
        id: "d1",
        name: "Fresh Lime Soda",
        price: 60,
        category: "beverages",
        isVeg: true,
        desc: "Chilled sparkling soda with freshly squeezed nimbu juice and mint (Sweet / Salt).",
      },
      {
        id: "d2",
        name: "Punjabi Sweet Lassi",
        price: 80,
        category: "beverages",
        isVeg: true,
        desc: "Thick churned creamy yogurt topped with malai and crushed pistachios.",
      },
      {
        id: "sw1",
        name: "Hot Gulab Jamun (2 Pcs)",
        price: 90,
        category: "desserts",
        isVeg: true,
        desc: "Warm melt-in-mouth milk solids dumplings soaked in rose and cardamom sugar syrup.",
      },
    ],
  },

  // Spice Route Kitchen & Bar
  spiceroute: {
    slug: "spiceroute",
    name: "Spice Route Kitchen & Bar",
    tagline: "Royal Indian Flavours • Charcoal Kebabs • Craft Mocktails",
    rating: "4.8 (2,100+ Diners)",
    prepTime: "15-20 Mins",
    location: "12th Main, Indiranagar, Bengaluru",
    tableNumber: "Table 12",
    themeColor: "#E5A93C",
    categories: [
      { id: "all", label: "All Items" },
      { id: "starters", label: "Kebabs & Platters" },
      { id: "curries", label: "Chef Curries" },
      { id: "biryani", label: "Dum Biryani" },
      { id: "breads", label: "Artisan Breads" },
      { id: "beverages", label: "Beverages" },
    ],
    items: [
      {
        id: "sr1",
        name: "Peshawari Paneer Tikka",
        price: 280,
        category: "starters",
        isVeg: true,
        badge: "Chef Pick",
        image: "/assets/dish-paneer.jpg",
        desc: "Charcoal smoked paneer stuffed with mint chutney and spiced hung curd marinade.",
      },
      {
        id: "sr2",
        name: "Galouti Kebab Melt",
        price: 360,
        category: "starters",
        isVeg: false,
        badge: "Bestseller",
        desc: "Finely minced melt-in-mouth smoked lamb patties served over mini saffron paratha.",
      },
      {
        id: "sr3",
        name: "Awadhi Gosht Dum Biryani",
        price: 420,
        category: "biryani",
        isVeg: false,
        badge: "House Special",
        image: "/assets/dish-biryani.jpg",
        desc: "Slow dum-cooked tender mutton cuts with fragrant saffron aged basmati rice.",
      },
      {
        id: "sr4",
        name: "Nalli Rogan Josh",
        price: 460,
        category: "curries",
        isVeg: false,
        desc: "Kashmiri lamb shanks braised in aromatic red chili gravy, fennel seeds, and ginger.",
      },
      {
        id: "sr5",
        name: "Paneer Lababdar",
        price: 290,
        category: "curries",
        isVeg: true,
        image: "/assets/dish-paneer.jpg",
        desc: "Cottage cheese cubes tossed with capsicum, onion tomato masala, and fresh cream.",
      },
      {
        id: "sr6",
        name: "Chur Chur Naan Platter",
        price: 110,
        category: "breads",
        isVeg: true,
        desc: "Crispy layered stuffed naan crushed with generous desi ghee and chaat masala.",
      },
      {
        id: "sr7",
        name: "Kesari Shahi Tukda",
        price: 140,
        category: "beverages",
        isVeg: true,
        desc: "Crisp golden brioche soaked in rabri with slivered almonds and saffron strands.",
      },
    ],
  },

  // Bean & Bun Cafe
  beanbun: {
    slug: "beanbun",
    name: "Bean & Bun Artisan Cafe",
    tagline: "Specialty Espresso • Sourdough Bakes • Gourmet Burgers",
    rating: "4.7 (980+ Diners)",
    prepTime: "10-15 Mins",
    location: "Road No. 36, Jubilee Hills, Hyderabad",
    tableNumber: "Table 04",
    themeColor: "#1E3A2F",
    categories: [
      { id: "all", label: "Full Menu" },
      { id: "coffee", label: "Coffee & Brews" },
      { id: "breakfast", label: "Sourdough & Toast" },
      { id: "burgers", label: "Buns & Burgers" },
      { id: "pastries", label: "Bakes & Cakes" },
    ],
    items: [
      {
        id: "bb1",
        name: "Signature Spanish Latte",
        price: 210,
        category: "coffee",
        isVeg: true,
        badge: "Top Rated",
        desc: "Double shot of single-origin espresso with steamed condensed milk and silky micro-foam.",
      },
      {
        id: "bb2",
        name: "Avocado & Feta Sourdough Toast",
        price: 290,
        category: "breakfast",
        isVeg: true,
        badge: "Healthy",
        desc: "Toasted artisan sourdough loaded with smashed Hass avocado, Danish feta, chili flakes, and toasted seeds.",
      },
      {
        id: "bb3",
        name: "Truffle Mushroom Brioche Burger",
        price: 340,
        category: "burgers",
        isVeg: true,
        desc: "Crisp grilled portobello mushroom, caramelized onions, smoked cheddar, and truffle aioli in a buttered brioche bun.",
      },
      {
        id: "bb4",
        name: "Crispy Buttermilk Chicken Bun",
        price: 360,
        category: "burgers",
        isVeg: false,
        badge: "Bestseller",
        desc: "24-hr brined crispy fried chicken breast, spicy house slaw, and pickle chips in fresh sesame brioche.",
      },
      {
        id: "bb5",
        name: "Nutella Sea Salt Croissant",
        price: 180,
        category: "pastries",
        isVeg: true,
        desc: "Flaky French butter croissant injected with warm Nutella ganache and Maldon sea salt flakes.",
      },
      {
        id: "bb6",
        name: "Iced Cold Brew Tonic",
        price: 190,
        category: "coffee",
        isVeg: true,
        desc: "18-hour steeped Ethiopian cold brew poured over sparkling tonic and an orange slice.",
      },
    ],
  },

  // Maison Alba
  maisonalba: {
    slug: "maisonalba",
    name: "Maison Alba Continental",
    tagline: "French & Italian Heritage • Handmade Pastas • Woodfired Pies",
    rating: "4.9 (1,650+ Diners)",
    prepTime: "20-25 Mins",
    location: "Park Street, Kolkata",
    tableNumber: "Table VII",
    themeColor: "#142921",
    categories: [
      { id: "all", label: "All Courses" },
      { id: "antipasti", label: "Antipasti" },
      { id: "pasta", label: "Handmade Pasta" },
      { id: "woodfired", label: "Woodfired Pizza" },
      { id: "dolci", label: "Dolci & Desserts" },
    ],
    items: [
      {
        id: "ma1",
        name: "Burrata Pugliese",
        price: 490,
        category: "antipasti",
        isVeg: true,
        badge: "Imported",
        desc: "Creamy artisanal burrata cheese with heirloom confit cherry tomatoes, basil pesto, and aged balsamic glaze.",
      },
      {
        id: "ma2",
        name: "Handmade Truffle Tagliolini",
        price: 520,
        category: "pasta",
        isVeg: true,
        badge: "Chef Signature",
        desc: "Fresh egg ribbon pasta tossed in Normandy butter, black summer truffle emulsion, and 24-month Parmigiano Reggiano.",
      },
      {
        id: "ma3",
        name: "Napoli Margherita D.O.P.",
        price: 450,
        category: "woodfired",
        isVeg: true,
        desc: "48-hour fermented slow-dough crust with San Marzano tomatoes, fresh Fior di Latte mozzarella, and sweet basil.",
      },
      {
        id: "ma4",
        name: "Pollo Alla Cacciatore",
        price: 540,
        category: "antipasti",
        isVeg: false,
        desc: "Tuscan hunter-style braised chicken thigh with kalamata olives, capers, rosemary, and white wine reduction.",
      },
      {
        id: "ma5",
        name: "Classic Espresso Tiramisu",
        price: 280,
        category: "dolci",
        isVeg: true,
        desc: "Savoiardi ladyfingers soaked in dark roast espresso and Amaretto liqueur, layered with whipped mascarpone cream.",
      },
    ],
  },
};

/**
 * Returns restaurant data by slug.
 * If the slug is not hardcoded, generates a dynamic menu profile so ANY subdomain works immediately!
 */
export function getRestaurantBySlug(slug: string, tableParam?: string): RestaurantData {
  const normalized = (slug || "demo").toLowerCase().replace(/[^a-z0-9_-]/g, "");

  if (RESTAURANTS[normalized]) {
    const res = RESTAURANTS[normalized];
    return {
      ...res,
      tableNumber: tableParam ? `Table ${tableParam}` : res.tableNumber,
    };
  }

  // Generate dynamic restaurant data for any new registered restaurant slug!
  const formattedName = normalized
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    slug: normalized,
    name: `${formattedName}`,
    tagline: "Fine Dining • Multi-Cuisine • Online QR Digital Menu",
    rating: "4.7 (Verified OruPos Outlet)",
    prepTime: "15-20 Mins",
    location: "Dine-In Restaurant",
    tableNumber: tableParam ? `Table ${tableParam}` : "Table 01",
    themeColor: "#1E3A2F",
    categories: [
      { id: "all", label: "All Items" },
      { id: "starters", label: "Starters & Appetizers" },
      { id: "mains", label: "Main Courses" },
      { id: "beverages", label: "Beverages & Drinks" },
      { id: "desserts", label: "Desserts" },
    ],
    items: [
      {
        id: "dyn1",
        name: "Paneer Tikka Charcoal Special",
        price: 260,
        category: "starters",
        isVeg: true,
        badge: "Chef's Special",
        image: "/assets/dish-paneer.jpg",
        desc: "Charred fresh cottage cheese cubes with bell peppers, onions, and traditional royal spices.",
      },
      {
        id: "dyn2",
        name: "Special Dum Chicken Biryani",
        price: 340,
        category: "mains",
        isVeg: false,
        badge: "Bestseller",
        image: "/assets/dish-biryani.jpg",
        desc: "Slow-cooked long grain aromatic basmati rice layered with spiced tender meat and brown onions.",
      },
      {
        id: "dyn3",
        name: "Dal Makhani Deluxe",
        price: 240,
        category: "mains",
        isVeg: true,
        desc: "Slow-simmered black lentils with butter, cream, and fragrant spices.",
      },
      {
        id: "dyn4",
        name: "Butter Garlic Naan",
        price: 75,
        category: "mains",
        isVeg: true,
        desc: "Freshly baked clay oven bread brushed with rich garlic butter.",
      },
      {
        id: "dyn5",
        name: "Chilled Fresh Lime Soda",
        price: 60,
        category: "beverages",
        isVeg: true,
        desc: "Sparkling soda with freshly squeezed lime, mint, and rock salt.",
      },
      {
        id: "dyn6",
        name: "Hot Gulab Jamun (2 Pcs)",
        price: 90,
        category: "desserts",
        isVeg: true,
        desc: "Traditional warm milk-solid dumplings steeped in rose cardamom syrup.",
      },
    ],
  };
}

export const DEMO_RESTAURANT = RESTAURANTS.demo;
