import React from "react";
import type { Metadata } from "next";
import RestaurantMenuView from "@/components/RestaurantMenuView";
import { DEMO_RESTAURANT } from "@/data/menu";

export const metadata: Metadata = {
  title: "Demo Digital Menu — Table 04 | OruPos",
  description: "Experience the customer digital menu view for Table 04. Fast loading, Indian veg/non-veg dietary tags, and instant waiter alert.",
};

export default function DemoMenuPage() {
  return <RestaurantMenuView restaurant={DEMO_RESTAURANT} initialTable="04" />;
}
