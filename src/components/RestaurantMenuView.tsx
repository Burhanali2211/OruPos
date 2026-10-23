"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { MenuItem, RestaurantData } from "@/lib/restaurants";
import {
  StarIcon,
  ClockIcon,
  MapPinIcon,
  BellIcon,
  ReceiptIcon,
  WhatsAppIcon,
  CheckIcon,
  EditIcon,
  CloseIcon,
  OrderIcon,
  ExternalLinkIcon,
} from "@/components/Icons";

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

  // Save table change
  const handleSaveTable = () => {
    const formatted = tempTableInput.trim()
      ? `Table ${tempTableInput.replace(/^table\s*/i, "")}`
      : "Table 01";
    setTableNumber(formatted);
    setIsEditingTable(false);
    showToast(`Updated to ${formatted}`);
  };

  // Send order to Kitchen via WhatsApp
  const handleSendWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    const itemsSummary = cartItems
      .map(
        (c) =>
          `- ${c.quantity}x ${c.item.name} (INR ${c.item.price * c.quantity})`
      )
      .join("\n");

    const message = [
      `*NEW DINE-IN ORDER*`,
      `*Restaurant:* ${restaurant.name}`,
      `*Table:* ${tableNumber}`,
      `--------------------------------`,
      itemsSummary,
      `--------------------------------`,
      `*Subtotal:* INR ${cartSubtotal}`,
      `*GST (5%):* INR ${gstAmount}`,
      `*Total Amount:* INR ${grandTotal}`,
      cookingNote.trim() ? `*Special Instructions:* ${cookingNote.trim()}` : null,
      `*Time:* ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      `--------------------------------`,
      `Sent via OruPos QR Menu`,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappNumber = (restaurant.whatsapp || restaurant.phone || "916005659527").replace(/[^0-9]/g, "");
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encoded}`;

    setOrderPlacedData({
      items: [...cartItems],
      total: grandTotal,
      table: tableNumber,
      note: cookingNote,
    });
    setCart({});
    setIsCartOpen(false);

    window.open(waUrl, "_blank");
  };

  // Direct table order placement
  const handlePlaceDirectOrder = () => {
    if (cartItems.length === 0) return;

    setOrderPlacedData({
      items: [...cartItems],
      total: grandTotal,
      table: tableNumber,
      note: cookingNote,
    });
    setCart({});
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
      {/* Top Minimalist Session Bar */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          color: "var(--color-text-main, #111827)",
          padding: "8px 16px",
          fontSize: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 60,
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <button
          type="button"
          onClick={() => setIsEditingTable(true)}
          style={{
            background: "#F3F4F6",
            border: "1px solid #E5E7EB",
            borderRadius: "var(--radius-full, 9999px)",
            color: "var(--color-text-main, #111827)",
            fontSize: "12px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
            padding: "4px 10px",
            fontWeight: 600,
          }}
          title="Click to change table"
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10B981", display: "inline-block" }} />
          <span>{tableNumber}</span>
          <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: 400 }}>· Change</span>
        </button>

        <Link
          href="/"
          target="_blank"
          style={{
            color: "#6B7280",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "11.5px",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span>OruPos</span>
          <ExternalLinkIcon size={10} color="#9CA3AF" />
        </Link>
      </div>

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
        {/* Restaurant Header: Clean Light Canvas */}
        <header
          style={{
            backgroundColor: "#FFFFFF",
            padding: "24px 20px 18px",
            borderBottom: "1px solid #F3F4F6",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#111827",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              {restaurant.name}
            </h1>

            <span
              style={{
                fontSize: "11px",
                color: "#059669",
                backgroundColor: "#ECFDF5",
                padding: "3px 8px",
                borderRadius: "var(--radius-full, 9999px)",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#10B981" }} />
              <span>Open</span>
            </span>
          </div>

          <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "14px", lineHeight: 1.5, margin: "0 0 14px" }}>
            {restaurant.tagline}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", fontSize: "12px" }}>
            <span style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", padding: "4px 8px", borderRadius: "6px", display: "inline-flex", alignItems: "center", gap: "4px", color: "#374151" }}>
              <StarIcon size={12} color="#D97706" />
              <span>{restaurant.rating}</span>
            </span>
            <span style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", padding: "4px 8px", borderRadius: "6px", display: "inline-flex", alignItems: "center", gap: "4px", color: "#374151" }}>
              <ClockIcon size={12} color="#6B7280" />
              <span>{restaurant.prepTime}</span>
            </span>
            <span style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", padding: "4px 8px", borderRadius: "6px", display: "inline-flex", alignItems: "center", gap: "4px", color: "#374151" }}>
              <MapPinIcon size={12} color="#6B7280" />
              <span>{restaurant.location}</span>
            </span>
          </div>
        </header>

        {/* Search & Veg Filter */}
        <div
          style={{
            padding: "12px 20px 10px",
            backgroundColor: "#FFFFFF",
            position: "sticky",
            top: "37px",
            zIndex: 40,
            borderBottom: "1px solid #F3F4F6",
          }}
        >
          <div style={{ position: "relative", marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Search dishes (e.g. Paneer, Biryani, Coffee)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 14px",
                border: "1px solid #E5E7EB",
                borderRadius: "var(--radius-full, 9999px)",
                fontSize: "13.5px",
                backgroundColor: "#F9FAFB",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "space-between" }}>
            <button
              type="button"
              onClick={() => setVegOnly(!vegOnly)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 12px",
                borderRadius: "var(--radius-full, 9999px)",
                fontSize: "12px",
                fontWeight: 500,
                border: vegOnly ? "1px solid #10B981" : "1px solid #E5E7EB",
                backgroundColor: vegOnly ? "#ECFDF5" : "#FFFFFF",
                color: vegOnly ? "#065F46" : "#4B5563",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <span className="food-symbol veg" style={{ width: "12px", height: "12px", borderWidth: "1.5px" }}>
                <span className="inner-dot" style={{ width: "5px", height: "5px" }} />
              </span>
              <span>Pure Veg Only</span>
            </button>

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{
                  fontSize: "11.5px",
                  color: "#6B7280",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Clear Search
              </button>
            )}
          </div>
        </div>

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
            filteredItems.map((dish: MenuItem) => {
              const qty = cart[dish.id] || 0;

              return (
                <article
                  key={dish.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "14px",
                    padding: "16px 0",
                    borderBottom: "1px solid #F3F4F6",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                      <span className={`food-symbol ${dish.isVeg ? "veg" : "nonveg"}`}>
                        <span className="inner-dot" />
                      </span>
                      {dish.badge && (
                        <span
                          style={{
                            backgroundColor: "#FEF3C7",
                            color: "#92400E",
                            fontSize: "10px",
                            fontWeight: 600,
                            padding: "1px 6px",
                            borderRadius: "4px",
                          }}
                        >
                          {dish.badge}
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontSize: "14.5px", fontWeight: 650, color: "#111827", marginBottom: "3px" }}>
                      {dish.name}
                    </h3>
                    <div style={{ fontSize: "14px", fontWeight: 650, color: "#111827", marginBottom: "4px" }}>
                      ₹{dish.price}
                    </div>
                    <p style={{ fontSize: "12px", color: "#6B7280", lineHeight: 1.5, margin: 0 }}>
                      {dish.desc}
                    </p>
                  </div>

                  {/* Right side: Dish image + Add / Quantity Button */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "88px", flexShrink: 0 }}>
                    {dish.image ? (
                      <div
                        style={{
                          width: "84px",
                          height: "84px",
                          borderRadius: "10px",
                          overflow: "hidden",
                          position: "relative",
                          backgroundColor: "#F3F4F6",
                          border: "1px solid #E5E7EB",
                          marginBottom: "8px",
                        }}
                      >
                        <Image
                          src={dish.image}
                          alt={dish.name}
                          fill
                          sizes="84px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ) : (
                      <div style={{ height: "8px" }} />
                    )}

                    {/* Quantity Selector / Add button */}
                    {qty > 0 ? (
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          backgroundColor: "#18181B",
                          borderRadius: "var(--radius-full, 9999px)",
                          overflow: "hidden",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleDecrease(dish.id)}
                          style={{
                            backgroundColor: "transparent",
                            color: "#FFFFFF",
                            border: "none",
                            width: "26px",
                            height: "28px",
                            fontSize: "14px",
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span
                          style={{
                            color: "#FFFFFF",
                            fontSize: "12px",
                            fontWeight: 600,
                            minWidth: "18px",
                            textAlign: "center",
                          }}
                        >
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleIncrease(dish.id)}
                          style={{
                            backgroundColor: "transparent",
                            color: "#FFFFFF",
                            border: "none",
                            width: "26px",
                            height: "28px",
                            fontSize: "14px",
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAddItem(dish)}
                        style={{
                          backgroundColor: "#FFFFFF",
                          color: "#111827",
                          border: "1px solid #D1D5DB",
                          borderRadius: "var(--radius-full, 9999px)",
                          padding: "5px 16px",
                          fontSize: "11.5px",
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <span>ADD</span>
                        <span style={{ fontSize: "13px", lineHeight: 1 }}>+</span>
                      </button>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </main>

        {/* Footer Credit & Get Digital Menu CTA */}
        <div
          style={{
            textAlign: "center",
            padding: "24px 20px 16px",
            borderTop: "1px solid #F3F4F6",
            fontSize: "11.5px",
            color: "#9CA3AF",
          }}
        >
          <p style={{ marginBottom: "4px" }}>
            Want a live table ordering digital menu for your restaurant?
          </p>
          <Link
            href="/"
            style={{ color: "#111827", fontWeight: 600, textDecoration: "underline" }}
          >
            Get OruPos for ₹199 per table
          </Link>
        </div>

        {/* Floating Bottom Bar (Dual Mode: Table Actions & Cart) */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(255, 255, 255, 0.94)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderTop: "1px solid #E5E7EB",
            padding: "8px 16px",
            zIndex: 50,
            boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              maxWidth: "540px",
              margin: "0 auto",
            }}
          >
            {/* When items are in cart -> show High-priority Order Bar */}
            {totalItemsCount > 0 ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#18181B",
                  borderRadius: "var(--radius-full, 9999px)",
                  padding: "8px 16px",
                  color: "#FFFFFF",
                }}
              >
                <div>
                  <div style={{ fontSize: "10.5px", color: "#9CA3AF", textTransform: "uppercase", fontWeight: 600 }}>
                    {tableNumber} · {totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"}
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 700 }}>
                    ₹{cartSubtotal}
                    <span style={{ fontSize: "11px", fontWeight: 400, color: "#9CA3AF", marginLeft: "4px" }}>
                      + GST
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#111827",
                    border: "none",
                    borderRadius: "var(--radius-full, 9999px)",
                    padding: "8px 16px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>View Order</span>
                  <span style={{ fontSize: "14px" }}>→</span>
                </button>
              </div>
            ) : (
              /* Idle Table Bar (Call Waiter / Bill) */
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "10.5px", color: "#9CA3AF", fontWeight: 500 }}>
                    Current Table
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditingTable(true)}
                    style={{
                      fontSize: "14px",
                      fontWeight: 650,
                      color: "#111827",
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span>{tableNumber}</span>
                    <EditIcon size={11} color="#9CA3AF" />
                  </button>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => showToast(`Staff notified for ${tableNumber}.`)}
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "#374151",
                      border: "1px solid #D1D5DB",
                      padding: "6px 12px",
                      borderRadius: "var(--radius-full, 9999px)",
                      fontSize: "12px",
                      fontWeight: 500,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <BellIcon size={13} color="#4B5563" />
                    <span>Call Staff</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => showToast(`Bill requested for ${tableNumber}.`)}
                    style={{
                      backgroundColor: "#18181B",
                      color: "#FFFFFF",
                      border: "none",
                      padding: "6px 14px",
                      borderRadius: "var(--radius-full, 9999px)",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <ReceiptIcon size={13} color="#FFFFFF" />
                    <span>Get Bill</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart & Order Review Modal / Drawer */}
      {isCartOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(17, 24, 39, 0.5)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            zIndex: 120,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
          onClick={() => setIsCartOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              maxWidth: "540px",
              width: "100%",
              margin: "0 auto",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 -8px 30px rgba(0,0,0,0.12)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid #F3F4F6",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2 style={{ fontSize: "16px", fontWeight: 650, color: "#111827", margin: 0 }}>
                  Order Summary
                </h2>
                <div style={{ fontSize: "12px", color: "#6B7280" }}>
                  {tableNumber} · {restaurant.name}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: "#F3F4F6",
                  border: "none",
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Close order details"
              >
                <CloseIcon size={13} color="#4B5563" />
              </button>
            </div>

            {/* Itemized Order List */}
            <div style={{ padding: "16px 20px", overflowY: "auto", flex: 1 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                {cartItems.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: "10px",
                      borderBottom: "1px solid #F3F4F6",
                    }}
                  >
                    <div style={{ flex: 1, paddingRight: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span className={`food-symbol ${item.isVeg ? "veg" : "nonveg"}`}>
                          <span className="inner-dot" />
                        </span>
                        <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#111827" }}>
                          {item.name}
                        </span>
                      </div>
                      <div style={{ fontSize: "12px", color: "#6B7280", marginLeft: "20px" }}>
                        ₹{item.price} each
                      </div>
                    </div>

                    {/* Stepper */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        backgroundColor: "#F4F4F5",
                        borderRadius: "var(--radius-full, 9999px)",
                        marginRight: "12px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleDecrease(item.id)}
                        style={{
                          background: "none",
                          border: "none",
                          width: "24px",
                          height: "24px",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: "11.5px", fontWeight: 600, minWidth: "16px", textAlign: "center" }}>
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleIncrease(item.id)}
                        style={{
                          background: "none",
                          border: "none",
                          width: "24px",
                          height: "24px",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        +
                      </button>
                    </div>

                    <div style={{ fontSize: "13.5px", fontWeight: 650, color: "#111827", minWidth: "50px", textAlign: "right" }}>
                      ₹{item.price * quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Special Cooking Note */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "5px" }}>
                  Cooking Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Less spicy, no onion..."
                  value={cookingNote}
                  onChange={(e) => setCookingNote(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #E5E7EB",
                    borderRadius: "var(--radius-sm, 8px)",
                    fontSize: "12.5px",
                    backgroundColor: "#F9FAFB",
                    outline: "none",
                  }}
                />
              </div>

              {/* Bill Breakdown */}
              <div
                style={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: "10px",
                  padding: "12px 14px",
                  border: "1px solid #E5E7EB",
                  fontSize: "12.5px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", color: "#4B5563" }}>
                  <span>Items Subtotal</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", color: "#4B5563" }}>
                  <span>GST (5%)</span>
                  <span>₹{gstAmount}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "6px",
                    borderTop: "1px solid #E5E7EB",
                    fontSize: "14.5px",
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  <span>Grand Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons in Drawer */}
            <div
              style={{
                padding: "12px 20px 20px",
                borderTop: "1px solid #F3F4F6",
                backgroundColor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <button
                type="button"
                onClick={handleSendWhatsAppOrder}
                style={{
                  backgroundColor: "#059669",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "var(--radius-full, 9999px)",
                  padding: "11px 20px",
                  fontSize: "13.5px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                }}
              >
                <WhatsAppIcon size={16} color="#FFFFFF" />
                <span>Send Order via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handlePlaceDirectOrder}
                style={{
                  backgroundColor: "#18181B",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "var(--radius-full, 9999px)",
                  padding: "11px 20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <OrderIcon size={14} color="#FFFFFF" />
                <span>Place Table Order</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Table Number Modal */}
      {isEditingTable && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(17, 24, 39, 0.5)",
            zIndex: 130,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={() => setIsEditingTable(false)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              maxWidth: "340px",
              width: "100%",
              padding: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              border: "1px solid #E5E7EB",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: "15px", fontWeight: 650, color: "#111827", marginBottom: "6px" }}>
              Select Table Number
            </h3>
            <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "14px" }}>
              Dishes and bill requests are mapped to this table.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px", marginBottom: "14px" }}>
              {Array.from({ length: 8 }, (_, i) => {
                const num = String(i + 1).padStart(2, "0");
                const isSelected = tempTableInput === num;

                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setTempTableInput(num)}
                    style={{
                      padding: "7px 0",
                      borderRadius: "6px",
                      border: isSelected ? "1.5px solid #18181B" : "1px solid #E5E7EB",
                      backgroundColor: isSelected ? "#F4F4F5" : "#FFFFFF",
                      color: isSelected ? "#111827" : "#4B5563",
                      fontSize: "12px",
                      fontWeight: isSelected ? 650 : 500,
                      cursor: "pointer",
                    }}
                  >
                    T-{num}
                  </button>
                );
              })}
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label style={{ fontSize: "11px", fontWeight: 600, color: "#4B5563", display: "block", marginBottom: "4px" }}>
                Or Custom Table / Room:
              </label>
              <input
                type="text"
                value={tempTableInput}
                onChange={(e) => setTempTableInput(e.target.value)}
                placeholder="e.g. 04, VIP 2, Balcony"
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  border: "1px solid #E5E7EB",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={() => setIsEditingTable(false)}
                style={{
                  flex: 1,
                  padding: "8px 0",
                  borderRadius: "var(--radius-full, 9999px)",
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#FFFFFF",
                  color: "#4B5563",
                  fontSize: "12.5px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveTable}
                style={{
                  flex: 1,
                  padding: "8px 0",
                  borderRadius: "var(--radius-full, 9999px)",
                  border: "none",
                  backgroundColor: "#18181B",
                  color: "#FFFFFF",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Set Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Placed Success Modal */}
      {orderPlacedData && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(17, 24, 39, 0.6)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            zIndex: 140,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={() => setOrderPlacedData(null)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              maxWidth: "380px",
              width: "100%",
              padding: "24px 20px",
              textAlign: "center",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
              border: "1px solid #E5E7EB",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#ECFDF5",
                color: "#059669",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
              }}
            >
              <CheckIcon size={22} color="#059669" strokeWidth={2.5} />
            </div>

            <h3 style={{ fontSize: "17px", fontWeight: 650, color: "#111827", marginBottom: "4px" }}>
              Order Received
            </h3>
            <p style={{ fontSize: "12.5px", color: "#6B7280", marginBottom: "16px" }}>
              Serving to <strong>{orderPlacedData.table}</strong> · Approx 15-20 mins
            </p>

            <div
              style={{
                backgroundColor: "#F9FAFB",
                borderRadius: "10px",
                padding: "10px 14px",
                border: "1px solid #E5E7EB",
                textAlign: "left",
                fontSize: "12px",
                marginBottom: "16px",
              }}
            >
              {orderPlacedData.items.map((i) => (
                <div key={i.item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span>{i.quantity}x {i.item.name}</span>
                  <span style={{ fontWeight: 600 }}>₹{i.item.price * i.quantity}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #E5E7EB", marginTop: "6px", paddingTop: "6px", display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "13px", color: "#111827" }}>
                <span>Total Amount</span>
                <span>₹{orderPlacedData.total}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOrderPlacedData(null)}
              style={{
                width: "100%",
                backgroundColor: "#18181B",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "var(--radius-full, 9999px)",
                padding: "10px 20px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Done / Return to Menu
            </button>
          </div>
        </div>
      )}

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
            zIndex: 100,
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
