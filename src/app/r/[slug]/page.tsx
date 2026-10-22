import React from "react";
import type { Metadata } from "next";
import { getRestaurantBySlug } from "@/data/menu";
import RestaurantMenuView from "@/components/RestaurantMenuView";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ table?: string }>;
}

export async function generateMetadata({ params }: RestaurantPageProps): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = getRestaurantBySlug(slug);

  return {
    title: `${restaurant.name} — Live Digital Menu | OruPos`,
    description: `View the official live digital menu, item prices, veg/non-veg dietary tags, and chef specials for ${restaurant.name}. Instant ordering without app download.`,
    openGraph: {
      title: `${restaurant.name} — Digital Menu`,
      description: restaurant.tagline,
    },
  };
}

export default async function RestaurantPage({ params, searchParams }: RestaurantPageProps) {
  const { slug } = await params;
  const { table } = await searchParams;

  const restaurant = getRestaurantBySlug(slug, table);

  return <RestaurantMenuView restaurant={restaurant} initialTable={table} />;
}
