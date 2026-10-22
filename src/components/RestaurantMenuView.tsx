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
    }, 3200);
  };

  // Add item
  const handleAddItem = (dish: MenuItem) => {
    setCart((prev) => {
      const current = prev[dish.id] || 0;
      return { ...prev, [dish.id]: current + 1 };
    });
    showToast(`Added ${dish.name} to order`);
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

  // Send order to Kitchen via WhatsApp (Zero emojis)
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

    const whatsappNumber = (restaurant.whatsapp || restaurant.phone || "919876543210").replace(/[^0-9]/g, "");
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encoded}`;

    // Record order placed state
    setOrderPlacedData({
      items: [...cartItems],
      total: grandTotal,
      table: tableNumber,
      note: cookingNote,
    });
    setCart({});
    setIsCartOpen(false);

    // Open WhatsApp
    window.open(waUrl, "_blank");
  };

  // Direct table order placement (without WhatsApp)
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
    showToast(`Order sent to kitchen for ${tableNumber}`);
  };

  return (
    <div style={{ backgroundColor: "#FAF8F5", minHeight: "100vh", paddingBottom: "130px", fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Top Sticky Bar */}
      <div
        style={{
          backgroundColor: "#13271F",
          color: "#FFFFFF",
          padding: "9px 16px",
          fontSize: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 60,
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
      >
        <button
          type="button"
          onClick={() => setIsEditingTable(true)}
          style={{
            background: "none",
            border: "none",
            color: "#FFFFFF",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
            padding: 0,
          }}
          title="Click to change table number"
        >
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#34D399", display: "inline-block" }} />
          <strong>{tableNumber}</strong>
          <span style={{ fontSize: "11px", color: "#A7F3D0", display: "inline-flex", alignItems: "center", gap: "3px", textDecoration: "underline" }}>
            <span>Edit</span>
            <EditIcon size={10} color="#A7F3D0" />
          </span>
        </button>
        <Link
          href="https://orupos.in"
          target="_blank"
          style={{ color: "#E5A93C", textDecoration: "none", fontWeight: 700, fontSize: "11px", display: "inline-flex", alignItems: "center", gap: "4px" }}
        >
          <span>Powered by OruPos</span>
          <ExternalLinkIcon size={10} color="#E5A93C" />
        </Link>
      </div>

      <div style={{ maxWidth: "560px", margin: "0 auto", backgroundColor: "#FFFFFF", minHeight: "100vh", boxShadow: "0 0 35px rgba(0,0,0,0.05)" }}>
        {/* Restaurant Header */}
        <header
          style={{
            background: "linear-gradient(180deg, #13271F 0%, #1E3A2F 100%)",
            color: "#FFFFFF",
            padding: "26px 22px 22px",
            borderBottomLeftRadius: "24px",
            borderBottomRightRadius: "24px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <button
              type="button"
              onClick={() => setIsEditingTable(true)}
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(4px)",
                padding: "5px 12px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: 700,
                color: "#FFFFFF",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                border: "1px solid rgba(255,255,255,0.25)",
                cursor: "pointer",
              }}
            >
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#4ADE80", display: "inline-block" }} />
              <span>{tableNumber}</span>
              <EditIcon size={11} color="#FFFFFF" />
            </button>
            <div style={{ fontSize: "12px", color: "#A7F3D0", display: "flex", alignItems: "center", gap: "6px", fontWeight: 600 }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#34D399", display: "inline-block" }} />
              <span>Kitchen Open & Taking Orders</span>
            </div>
          </div>

          <h1 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "4px", color: "#FFFFFF", letterSpacing: "-0.02em" }}>
            {restaurant.name}
          </h1>
          <p style={{ fontSize: "13px", color: "#D1D5DB", marginBottom: "14px", lineHeight: 1.4 }}>
            {restaurant.tagline}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", fontSize: "12px" }}>
            <span style={{ background: "rgba(255,255,255,0.12)", padding: "5px 10px", borderRadius: "6px", display: "inline-flex", alignItems: "center", gap: "5px" }}>
              <StarIcon size={13} color="#E5A93C" />
              <span>{restaurant.rating}</span>
            </span>
            <span style={{ background: "rgba(255,255,255,0.12)", padding: "5px 10px", borderRadius: "6px", display: "inline-flex", alignItems: "center", gap: "5px" }}>
              <ClockIcon size={13} color="#CBD5E1" />
              <span>{restaurant.prepTime}</span>
            </span>
            <span style={{ background: "rgba(255,255,255,0.12)", padding: "5px 10px", borderRadius: "6px", display: "inline-flex", alignItems: "center", gap: "5px" }}>
              <MapPinIcon size={13} color="#CBD5E1" />
              <span>{restaurant.location}</span>
            </span>
          </div>
        </header>

        {/* Search & Veg Filter */}
        <div
          style={{
            padding: "16px 20px 10px",
            backgroundColor: "#FFFFFF",
            position: "sticky",
            top: "37px",
            zIndex: 40,
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <div style={{ position: "relative", marginBottom: "12px" }}>
            <input
              type="text"
              placeholder="Search dishes (e.g. Paneer, Biryani, Coffee)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "11px 16px",
                border: "1px solid #D1D5DB",
                borderRadius: "10px",
                fontSize: "14px",
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
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: 600,
                border: vegOnly ? "1.5px solid #16A34A" : "1px solid #D1D5DB",
                backgroundColor: vegOnly ? "#ECFDF5" : "#FFFFFF",
                color: vegOnly ? "#065F46" : "#374151",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <span className="food-symbol veg" style={{ width: "13px", height: "13px", borderWidth: "1px" }}>
                <span className="inner-dot" style={{ width: "6px", height: "6px" }} />
              </span>
              Pure Veg Only
            </button>

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{
                  fontSize: "12px",
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
            padding: "10px 20px",
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #E5E7EB",
            display: "flex",
            gap: "8px",
          }}
          aria-label="Menu categories"
        >
          {restaurant.categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: 600,
                backgroundColor: activeCategory === cat.id ? "#1E3A2F" : "#F3F4F6",
                color: activeCategory === cat.id ? "#FFFFFF" : "#4B5563",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
              }}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Menu Items List */}
        <main style={{ padding: "16px 20px" }}>
          {filteredItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 20px", color: "#6B7280" }}>
              <p style={{ fontSize: "16px", fontWeight: 700 }}>No dishes found</p>
              <p style={{ fontSize: "13px" }}>Try searching for a different dish name or reset the veg filter.</p>
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
                    gap: "16px",
                    padding: "18px 0",
                    borderBottom: "1px solid #F3F4F6",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <span className={`food-symbol ${dish.isVeg ? "veg" : "nonveg"}`}>
                        <span className="inner-dot" />
                      </span>
                      {dish.badge && (
                        <span
                          style={{
                            backgroundColor: "#FEF3C7",
                            color: "#92400E",
                            fontSize: "10px",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            padding: "2px 7px",
                            borderRadius: "4px",
                          }}
                        >
                          {dish.badge}
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>
                      {dish.name}
                    </h3>
                    <div style={{ fontSize: "15px", fontWeight: 800, color: "#1E3A2F", marginBottom: "6px" }}>
                      ₹{dish.price}
                    </div>
                    <p style={{ fontSize: "12px", color: "#6B7280", lineHeight: 1.5, margin: 0 }}>
                      {dish.desc}
                    </p>
                  </div>

                  {/* Right side: Dish image + Add / Quantity Button */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "96px", flexShrink: 0 }}>
                    {dish.image ? (
                      <div
                        style={{
                          width: "90px",
                          height: "90px",
                          borderRadius: "12px",
                          overflow: "hidden",
                          position: "relative",
                          backgroundColor: "#F3F4F6",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                          marginBottom: "8px",
                        }}
                      >
                        <Image
                          src={dish.image}
                          alt={dish.name}
                          fill
                          sizes="90px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ) : (
                      <div style={{ height: "14px" }} />
                    )}

                    {/* Quantity Selector / Add button */}
                    {qty > 0 ? (
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          backgroundColor: "#1E3A2F",
                          borderRadius: "8px",
                          boxShadow: "0 2px 8px rgba(30, 58, 47, 0.25)",
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
                            width: "28px",
                            height: "30px",
                            fontSize: "15px",
                            fontWeight: 700,
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
                            fontSize: "13px",
                            fontWeight: 700,
                            minWidth: "20px",
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
                            width: "28px",
                            height: "30px",
                            fontSize: "15px",
                            fontWeight: 700,
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
                          color: "#1E3A2F",
                          border: "1.5px solid #1E3A2F",
                          borderRadius: "8px",
                          padding: "6px 18px",
                          fontSize: "12px",
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.06)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <span>ADD</span>
                        <span style={{ fontSize: "14px", lineHeight: 1 }}>+</span>
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
            borderTop: "1px dashed #E5E7EB",
            fontSize: "12px",
            color: "#6B7280",
          }}
        >
          <p style={{ marginBottom: "6px" }}>
            Want a live table ordering digital menu for your restaurant?
          </p>
          <Link
            href="https://orupos.in"
            target="_blank"
            style={{ color: "#1E3A2F", fontWeight: 700, textDecoration: "underline" }}
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
            backgroundColor: "#FFFFFF",
            borderTop: "1px solid #E5E7EB",
            padding: "10px 16px",
            zIndex: 50,
            boxShadow: "0 -4px 20px rgba(0,0,0,0.12)",
          }}
        >
          <div
            style={{
              maxWidth: "560px",
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
                  backgroundColor: "#1E3A2F",
                  borderRadius: "14px",
                  padding: "10px 16px",
                  color: "#FFFFFF",
                  boxShadow: "0 4px 15px rgba(30, 58, 47, 0.3)",
                }}
              >
                <div>
                  <div style={{ fontSize: "11px", color: "#A7F3D0", textTransform: "uppercase", fontWeight: 700 }}>
                    {tableNumber} • {totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"}
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: 800 }}>
                    ₹{cartSubtotal}
                    <span style={{ fontSize: "11px", fontWeight: 500, color: "#CBD5E1", marginLeft: "4px" }}>
                      + GST
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  style={{
                    backgroundColor: "#E5A93C",
                    color: "#13271F",
                    border: "none",
                    borderRadius: "10px",
                    padding: "9px 18px",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 2px 8px rgba(229, 169, 60, 0.4)",
                  }}
                >
                  <span>View Order</span>
                  <span style={{ fontSize: "16px" }}>→</span>
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
                  <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: 600, textTransform: "uppercase" }}>
                    Active Session
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditingTable(true)}
                    style={{
                      fontSize: "15px",
                      fontWeight: 800,
                      color: "#1E3A2F",
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>{tableNumber}</span>
                    <EditIcon size={12} color="#6B7280" />
                  </button>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => showToast(`Staff notified for ${tableNumber}. Team on the way.`)}
                    style={{
                      backgroundColor: "#F3F4F6",
                      color: "#374151",
                      border: "1px solid #D1D5DB",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <BellIcon size={14} color="#374151" />
                    <span>Call Staff</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => showToast(`Bill requested for ${tableNumber}. Cashier notified.`)}
                    style={{
                      backgroundColor: "#1E3A2F",
                      color: "#FFFFFF",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <ReceiptIcon size={14} color="#FFFFFF" />
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
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)",
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
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
              maxWidth: "560px",
              width: "100%",
              margin: "0 auto",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 -10px 40px rgba(0,0,0,0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid #E5E7EB",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2 style={{ fontSize: "17px", fontWeight: 800, color: "#1E3A2F", margin: 0 }}>
                  Table Order Details
                </h2>
                <div style={{ fontSize: "12px", color: "#6B7280" }}>
                  Serving {tableNumber} • {restaurant.name}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: "#F3F4F6",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Close order details"
              >
                <CloseIcon size={14} color="#4B5563" />
              </button>
            </div>

            {/* Itemized Order List */}
            <div style={{ padding: "16px 20px", overflowY: "auto", flex: 1 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
                {cartItems.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: "12px",
                      borderBottom: "1px dashed #E5E7EB",
                    }}
                  >
                    <div style={{ flex: 1, paddingRight: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span className={`food-symbol ${item.isVeg ? "veg" : "nonveg"}`}>
                          <span className="inner-dot" />
                        </span>
                        <span style={{ fontSize: "14px", fontWeight: 700, color: "#1F2937" }}>
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
                        backgroundColor: "#F3F4F6",
                        borderRadius: "8px",
                        border: "1px solid #D1D5DB",
                        marginRight: "14px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleDecrease(item.id)}
                        style={{
                          background: "none",
                          border: "none",
                          width: "26px",
                          height: "26px",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: "12px", fontWeight: 700, minWidth: "18px", textAlign: "center" }}>
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleIncrease(item.id)}
                        style={{
                          background: "none",
                          border: "none",
                          width: "26px",
                          height: "26px",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        +
                      </button>
                    </div>

                    <div style={{ fontSize: "14px", fontWeight: 800, color: "#1E3A2F", minWidth: "55px", textAlign: "right" }}>
                      ₹{item.price * quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Special Cooking Note */}
              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "6px" }}>
                  Special Cooking Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Less spicy, make extra crispy, no onions..."
                  value={cookingNote}
                  onChange={(e) => setCookingNote(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px",
                    fontSize: "13px",
                    backgroundColor: "#F9FAFB",
                    outline: "none",
                  }}
                />
              </div>

              {/* Bill Breakdown */}
              <div
                style={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  border: "1px solid #E5E7EB",
                  fontSize: "13px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", color: "#4B5563" }}>
                  <span>Items Subtotal</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "#4B5563" }}>
                  <span>Restaurant GST (5%)</span>
                  <span>₹{gstAmount}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "8px",
                    borderTop: "1px solid #E5E7EB",
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#1E3A2F",
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
                padding: "14px 20px 20px",
                borderTop: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {/* Primary Dispatch Action: WhatsApp to Kitchen */}
              <button
                type="button"
                onClick={handleSendWhatsAppOrder}
                style={{
                  backgroundColor: "#25D366",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "12px",
                  padding: "13px 20px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 14px rgba(37, 211, 102, 0.35)",
                }}
              >
                <WhatsAppIcon size={18} color="#FFFFFF" />
                <span>Send Order to Kitchen via WhatsApp</span>
              </button>

              {/* Secondary: Direct Table Dispatch */}
              <button
                type="button"
                onClick={handlePlaceDirectOrder}
                style={{
                  backgroundColor: "#1E3A2F",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "12px",
                  padding: "12px 20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <OrderIcon size={15} color="#FFFFFF" />
                <span>Place Direct Table Order</span>
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
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 130,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setIsEditingTable(false)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              maxWidth: "360px",
              width: "100%",
              padding: "22px 20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#1E3A2F", marginBottom: "8px" }}>
              Select or Enter Table Number
            </h3>
            <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "14px" }}>
              Orders and service requests will be delivered directly to this table.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "16px" }}>
              {Array.from({ length: 8 }, (_, i) => {
                const num = String(i + 1).padStart(2, "0");
                const isSelected = tempTableInput === num;

                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setTempTableInput(num)}
                    style={{
                      padding: "8px 0",
                      borderRadius: "8px",
                      border: isSelected ? "2px solid #1E3A2F" : "1px solid #D1D5DB",
                      backgroundColor: isSelected ? "#ECFDF5" : "#FFFFFF",
                      color: isSelected ? "#065F46" : "#374151",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    T-{num}
                  </button>
                );
              })}
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "#4B5563", display: "block", marginBottom: "4px" }}>
                Or Custom Table / Room / Booth:
              </label>
              <input
                type="text"
                value={tempTableInput}
                onChange={(e) => setTempTableInput(e.target.value)}
                placeholder="e.g. 04, VIP 2, Terrace"
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  borderRadius: "8px",
                  border: "1px solid #D1D5DB",
                  fontSize: "14px",
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
                  padding: "9px 0",
                  borderRadius: "8px",
                  border: "1px solid #D1D5DB",
                  backgroundColor: "#FFFFFF",
                  color: "#4B5563",
                  fontSize: "13px",
                  fontWeight: 600,
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
                  padding: "9px 0",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#1E3A2F",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: 700,
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
            backgroundColor: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(4px)",
            zIndex: 140,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setOrderPlacedData(null)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              maxWidth: "420px",
              width: "100%",
              padding: "28px 24px",
              textAlign: "center",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: "#ECFDF5",
                color: "#16A34A",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "14px",
                border: "2px solid #BBF7D0",
              }}
            >
              <CheckIcon size={26} color="#16A34A" strokeWidth={3} />
            </div>

            <h3 style={{ fontSize: "19px", fontWeight: 800, color: "#1E3A2F", marginBottom: "6px" }}>
              Order Received at Kitchen
            </h3>
            <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "18px" }}>
              Serving to <strong>{orderPlacedData.table}</strong> • Approx 15-20 Mins
            </p>

            <div
              style={{
                backgroundColor: "#FAF8F5",
                borderRadius: "12px",
                padding: "12px 16px",
                border: "1px solid #ECE7E1",
                textAlign: "left",
                fontSize: "12px",
                marginBottom: "20px",
              }}
            >
              <div style={{ fontWeight: 700, color: "#1E3A2F", marginBottom: "8px" }}>
                Summary:
              </div>
              {orderPlacedData.items.map((i) => (
                <div key={i.item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span>{i.quantity}x {i.item.name}</span>
                  <span style={{ fontWeight: 700 }}>₹{i.item.price * i.quantity}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px dashed #D1D5DB", marginTop: "8px", paddingTop: "8px", display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: "13px", color: "#1E3A2F" }}>
                <span>Total Amount</span>
                <span>₹{orderPlacedData.total}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOrderPlacedData(null)}
              style={{
                width: "100%",
                backgroundColor: "#1E3A2F",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "10px",
                padding: "12px 20px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Done / Back to Menu
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            top: "52px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#111827",
            color: "#FFFFFF",
            padding: "9px 20px",
            borderRadius: "30px",
            fontSize: "12px",
            fontWeight: 600,
            zIndex: 100,
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
