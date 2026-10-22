import React from "react";
import type { Metadata } from "next";
import { getRestaurantBySlug } from "@/lib/restaurants";
import RestaurantMenuView from "@/components/RestaurantMenuView";
import RestaurantNotFound from "@/components/RestaurantNotFound";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ table?: string }>;
}

export async function generateMetadata({ params }: RestaurantPageProps): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = getRestaurantBySlug(slug);

  if (!restaurant) {
    return {
      title: "Restaurant Domain Not Whitelisted | OruPos",
      description: `The subdomain ${slug}.orupos.in is not registered or active.`,
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${restaurant.name} — Live Digital Menu | OruPos`,
    description: `View the official live digital menu, item prices, veg/non-veg dietary tags, and chef specials for ${restaurant.name}. Instant table ordering without app download.`,
    openGraph: {
      title: `${restaurant.name} — Live Digital Menu`,
      description: restaurant.tagline,
    },
  };
}

export default async function RestaurantPage({ params, searchParams }: RestaurantPageProps) {
  const { slug } = await params;
  const { table } = await searchParams;

  const restaurant = getRestaurantBySlug(slug, table);

  // Strict domain gating: unregistered subdomains get 404 view
  if (!restaurant) {
    return <RestaurantNotFound slug={slug} />;
  }

  return <RestaurantMenuView restaurant={restaurant} initialTable={table} />;
}
