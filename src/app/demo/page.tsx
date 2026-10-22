import React from "react";
import type { Metadata } from "next";
import RestaurantMenuView from "@/components/RestaurantMenuView";
import { DEFAULT_RESTAURANTS } from "@/lib/restaurants";

export const metadata: Metadata = {
  title: "Demo Digital Menu — Table 04 | OruPos",
  description: "Experience the customer digital menu view for Table 04. Fast loading, Indian veg/non-veg dietary tags, and instant table ordering.",
};

export default function DemoMenuPage() {
  const demoRestaurant = DEFAULT_RESTAURANTS.demo;
  return <RestaurantMenuView restaurant={demoRestaurant} initialTable="04" />;
}
