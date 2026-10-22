/**
 * Demo Indian Restaurant Menu Data
 * Restaurant: The Grand Taj Family Restaurant & Dhaba (Table 04)
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

export const DEMO_RESTAURANT = {
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
    { id: "desserts", label: "Desserts" }
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
      desc: "Fresh cottage cheese cubes marinated in spiced hung curd, charred in clay tandoor with capsicum and onions."
    },
    {
      id: "s2",
      name: "Crispy Corn Pepper Salt",
      price: 190,
      category: "starters",
      isVeg: true,
      desc: "Golden sweet corn kernels tossed with freshly crushed black pepper, green chilies, and spring onions."
    },
    {
      id: "s3",
      name: "Murgh Malai Tikka",
      price: 320,
      category: "starters",
      isVeg: false,
      badge: "Chef's Special",
      desc: "Tender boneless chicken steeped in rich cream, cashew paste, and gentle green cardamom cooked over charcoal."
    },
    {
      id: "s4",
      name: "Tandoori Chicken (Half)",
      price: 280,
      category: "starters",
      isVeg: false,
      badge: "Spicy",
      desc: "Traditional bone-in chicken marinated in roasted degi mirch, curd, and secret spices."
    },
    {
      id: "c1",
      name: "Dal Makhani Royal",
      price: 240,
      category: "curries",
      isVeg: true,
      badge: "All-Time Favorite",
      desc: "Black lentils slow-cooked overnight for 16 hours on clay embers, finished with farm butter and cream."
    },
    {
      id: "c2",
      name: "Paneer Butter Masala",
      price: 280,
      category: "curries",
      isVeg: true,
      image: "/assets/dish-paneer.jpg",
      desc: "Soft paneer chunks simmered in a mildly sweet and tangy velvety tomato cashew gravy."
    },
    {
      id: "c3",
      name: "Butter Chicken (Boneless)",
      price: 360,
      category: "curries",
      isVeg: false,
      badge: "Popular",
      desc: "Smoky shredded tandoori chicken cooked in classic satin tomato makhani gravy enriched with kasoori methi."
    },
    {
      id: "c4",
      name: "Pindi Chana Masala",
      price: 210,
      category: "curries",
      isVeg: true,
      desc: "Authentic rustic Punjabi chickpeas cooked with roasted dry spices, ginger juliennes, and green chilies."
    },
    {
      id: "b1",
      name: "Butter Garlic Naan",
      price: 75,
      category: "breads",
      isVeg: true,
      desc: "Leavened fine flour bread baked in tandoor, topped with minced garlic and melted Amul butter."
    },
    {
      id: "b2",
      name: "Tandoori Butter Roti",
      price: 25,
      category: "breads",
      isVeg: true,
      desc: "100% whole wheat flatbread made fresh in clay tandoor with pure ghee glaze."
    },
    {
      id: "r1",
      name: "Dum Chicken Biryani Handi",
      price: 340,
      category: "biryani",
      isVeg: false,
      badge: "Signature",
      image: "/assets/dish-biryani.jpg",
      desc: "Aromatic long grain basmati rice and marinated chicken slow dum-cooked in clay handi. Served with raita and salan."
    },
    {
      id: "r2",
      name: "Hyderabadi Subz Biryani",
      price: 270,
      category: "biryani",
      isVeg: true,
      desc: "Seasonal vegetables and fresh paneer layered with aromatic spiced basmati rice and saffron. Served with raita."
    },
    {
      id: "d1",
      name: "Fresh Lime Soda",
      price: 60,
      category: "beverages",
      isVeg: true,
      desc: "Chilled sparkling soda with freshly squeezed nimbu juice and mint (Sweet / Salt)."
    },
    {
      id: "d2",
      name: "Punjabi Sweet Lassi",
      price: 80,
      category: "beverages",
      isVeg: true,
      desc: "Thick churned creamy yogurt topped with malai and crushed pistachios."
    },
    {
      id: "sw1",
      name: "Hot Gulab Jamun (2 Pcs)",
      price: 90,
      category: "desserts",
      isVeg: true,
      desc: "Warm melt-in-mouth milk solids dumplings soaked in rose and cardamom sugar syrup."
    }
  ]
};
