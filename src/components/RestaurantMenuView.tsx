"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { MenuItem, RestaurantData } from "@/lib/restaurants";
import { CloseIcon, CheckIcon } from "@/components/Icons";
import MenuTopBar from "./menu/MenuTopBar";
import MenuHeader from "./menu/MenuHeader";
import MenuSearchBar from "./menu/MenuSearchBar";
import MenuItemCard from "./menu/MenuItemCard";
import MenuBottomBar from "./menu/MenuBottomBar";
import MenuCartDrawer from "./menu/MenuCartDrawer";
import MenuEditTableModal from "./menu/MenuEditTableModal";
import MenuOrderSuccessModal from "./menu/MenuOrderSuccessModal";

interface RestaurantMenuViewProps {
  restaurant: RestaurantData;
  initialTable?: string;
}

export default function RestaurantMenuView({ restaurant, initialTable }: RestaurantMenuViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Table number management
  const [tableNumber, setTableNumber] = useState<string>(
    initialTable ? `Table ${initialTable}` : "Table 01"
  );
  const [isEditingTable, setIsEditingTable] = useState<boolean>(false);
  const [tempTableInput, setTempTableInput] = useState<string>(
    initialTable || "01"
  );

  // Cart state: Record<dishId, quantity>
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cookingNote, setCookingNote] = useState<string>("");
  const [orderPlacedData, setOrderPlacedData] = useState<{
    items: { item: MenuItem; quantity: number }[];
    total: number;
    table: string;
    note: string;
  } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Lightweight analytics ping on customer visit / table scan
  useEffect(() => {
    try {
      const payload = JSON.stringify({
        slug: restaurant.slug,
        table: initialTable || "01",
        path: typeof window !== "undefined" ? window.location.pathname : "/",
        eventType: initialTable ? "scan" : "visit",
      });
      if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
        const blob = new Blob([payload], { type: "application/json" });
        if (navigator.sendBeacon("/api/analytics/track", blob)) {
          return;
        }
      }
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    } catch {
      // ignore
    }
  }, [restaurant.slug, initialTable]);

  // Add item
  const handleAddItem = (dish: MenuItem) => {
    setCart((prev) => {
      const current = prev[dish.id] || 0;
      return { ...prev, [dish.id]: current + 1 };
    });
    showToast(`Added ${dish.name}`);
  };

  // Increase quantity
  const handleIncrease = (dishId: string) => {
    setCart((prev) => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) + 1,
    }));
  };

  // Decrease quantity
  const handleDecrease = (dishId: string) => {
    setCart((prev) => {
      const current = prev[dishId] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[dishId];
        return copy;
      }
      return { ...prev, [dishId]: current - 1 };
    });
  };

  // Cart calculations
  const cartItems = useMemo(() => {
    const list: { item: MenuItem; quantity: number }[] = [];
    for (const [id, qty] of Object.entries(cart)) {
      if (qty > 0) {
        const dish = restaurant.items.find((i) => i.id === id);
        if (dish) {
          list.push({ item: dish, quantity: qty });
        }
      }
    }
    return list;
  }, [cart, restaurant.items]);

  const totalItemsCount = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cartItems]);

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  }, [cartItems]);

  const gstAmount = Math.round(cartSubtotal * 0.05);
  const grandTotal = cartSubtotal + gstAmount;

  // Filtered dishes
  const filteredItems = useMemo(() => {
    return restaurant.items.filter((item: MenuItem) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesVeg = !vegOnly || item.isVeg;
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesVeg && matchesSearch;
    });
  }, [restaurant.items, activeCategory, vegOnly, searchQuery]);

  // Save customized table
  const handleSaveTable = () => {
    const trimmed = tempTableInput.trim();
    if (!trimmed) {
      showToast("Please enter a table number");
      return;
    }
    const formatted = trimmed.toLowerCase().startsWith("table") ? trimmed : `Table ${trimmed}`;
    setTableNumber(formatted);
    setIsEditingTable(false);
    showToast(`Updated to ${formatted}`);
  };

  // Construct and open WhatsApp ordering message
  const handleSendWhatsAppOrder = () => {
    if (cartItems.length === 0) {
      showToast("Your cart is empty");
      return;
    }

    let text = `*New Order - ${restaurant.name}*\n`;
    text += `*${tableNumber}*\n`;
    text += `--------------------------\n`;
    for (const { item, quantity } of cartItems) {
      text += `• ${quantity}x ${item.name} - ₹${item.price * quantity}\n`;
    }
    text += `--------------------------\n`;
    text += `*Subtotal:* ₹${cartSubtotal}\n`;
    text += `*GST (5%):* ₹${gstAmount}\n`;
    text += `*Total Amount:* ₹${grandTotal}\n`;
    if (cookingNote.trim()) {
      text += `*Note:* ${cookingNote.trim()}\n`;
    }
    text += `--------------------------\n`;
    text += `Sent via OruPos Digital Menu`;

    const encoded = encodeURIComponent(text);
    const cleanPhone = (restaurant.whatsapp || restaurant.phone || "916005659527").replace(/\D/g, "");
    const waUrl = `https://wa.me/${cleanPhone}?text=${encoded}`;
    window.open(waUrl, "_blank");

    setOrderPlacedData({
      items: cartItems,
      total: grandTotal,
      table: tableNumber,
      note: cookingNote,
    });
    setCart({});
    setCookingNote("");
    setIsCartOpen(false);
  };

  // Direct In-Restaurant table order
  const handlePlaceDirectOrder = () => {
    if (cartItems.length === 0) {
      showToast("Your cart is empty");
      return;
    }

    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: restaurant.slug,
          table: tableNumber,
          eventType: "order",
          path: typeof window !== "undefined" ? window.location.pathname : "/",
          details: {
            itemsCount: totalItemsCount,
            total: grandTotal,
          },
        }),
      }).catch(() => {});
    } catch {
      // ignore
    }

    setOrderPlacedData({
      items: cartItems,
      total: grandTotal,
      table: tableNumber,
      note: cookingNote,
    });
    setCart({});
    setCookingNote("");
    setIsCartOpen(false);
    showToast(`Order placed for ${tableNumber}`);
  };

  return (
    <div
      style={{
        backgroundColor: "#F9FAFB",
        minHeight: "100vh",
        paddingBottom: "110px",
        fontFamily: "var(--font-family, system-ui, -apple-system, sans-serif)",
      }}
    >
      <MenuTopBar
        tableNumber={tableNumber}
        onEditTable={() => setIsEditingTable(true)}
      />

      <div
        style={{
          maxWidth: "540px",
          margin: "0 auto",
          backgroundColor: "#FFFFFF",
          minHeight: "100vh",
          borderLeft: "1px solid #F3F4F6",
          borderRight: "1px solid #F3F4F6",
        }}
      >
        <MenuHeader restaurant={restaurant} />

        <MenuSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          vegOnly={vegOnly}
          setVegOnly={setVegOnly}
        />

        {/* Category Tabs */}
        <nav
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            padding: "8px 20px",
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #F3F4F6",
            display: "flex",
            gap: "6px",
          }}
          aria-label="Menu categories"
        >
          {restaurant.categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: "5px 14px",
                  borderRadius: "var(--radius-full, 9999px)",
                  fontSize: "12.5px",
                  fontWeight: isSelected ? 600 : 500,
                  backgroundColor: isSelected ? "#18181B" : "#F4F4F5",
                  color: isSelected ? "#FFFFFF" : "#4B5563",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>

        {/* Menu Items List */}
        <main style={{ padding: "8px 20px" }}>
          {filteredItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 20px", color: "#6B7280" }}>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#111827" }}>No dishes found</p>
              <p style={{ fontSize: "12.5px" }}>Try searching for a different dish name or reset filters.</p>
            </div>
          ) : (
            filteredItems.map((dish: MenuItem) => (
              <MenuItemCard
                key={dish.id}
                dish={dish}
                qty={cart[dish.id] || 0}
                onAddItem={handleAddItem}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            ))
          )}
        </main>

        {/* Footer Credit & Get Digital Menu CTA */}
        <div
          style={{
            textAlign: "center",
            padding: "36px 20px 48px",
            borderTop: "1px solid #F3F4F6",
            backgroundColor: "#FFFFFF",
            fontSize: "12px",
            color: "#6B7280",
          }}
        >
          <div style={{ fontWeight: 600, color: "#111827", marginBottom: "4px" }}>
            Powered by OruPos Digital Menu
          </div>
          <p style={{ margin: "0 0 10px", lineHeight: 1.5 }}>
            Zero-subscription restaurant billing, kitchen display, and contactless QR table ordering.
          </p>
          <Link
            href="/"
            style={{ color: "#111827", fontWeight: 600, textDecoration: "underline" }}
          >
            Get OruPos for ₹199 per table
          </Link>
        </div>

        {/* Floating Bottom Bar (Dual Mode: Table Actions & Cart) */}
        <MenuBottomBar
          totalItemsCount={totalItemsCount}
          tableNumber={tableNumber}
          cartSubtotal={cartSubtotal}
          onOpenCart={() => setIsCartOpen(true)}
          onEditTable={() => setIsEditingTable(true)}
          onShowToast={showToast}
        />
      </div>

      {/* Cart & Order Review Modal / Drawer */}
      <MenuCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        restaurant={restaurant}
        tableNumber={tableNumber}
        cartItems={cartItems}
        cartSubtotal={cartSubtotal}
        gstAmount={gstAmount}
        grandTotal={grandTotal}
        cookingNote={cookingNote}
        setCookingNote={setCookingNote}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onSendWhatsAppOrder={handleSendWhatsAppOrder}
        onPlaceDirectOrder={handlePlaceDirectOrder}
      />

      {/* Edit Table Number Modal */}
      <MenuEditTableModal
        isOpen={isEditingTable}
        onClose={() => setIsEditingTable(false)}
        tempTableInput={tempTableInput}
        setTempTableInput={setTempTableInput}
        onSaveTable={handleSaveTable}
      />

      {/* Order Placed Success Modal */}
      <MenuOrderSuccessModal
        orderPlacedData={orderPlacedData}
        onClose={() => setOrderPlacedData(null)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            top: "48px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#18181B",
            color: "#FFFFFF",
            padding: "7px 16px",
            borderRadius: "var(--radius-full, 9999px)",
            fontSize: "12px",
            fontWeight: 500,
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <CheckIcon size={13} color="#10B981" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            style={{
              background: "none",
              border: "none",
              color: "#A1A1AA",
              cursor: "pointer",
              padding: "0 2px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CloseIcon size={10} color="#A1A1AA" />
          </button>
        </div>
      )}
    </div>
  );
}
