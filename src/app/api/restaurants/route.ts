import { NextRequest, NextResponse } from "next/server";
import {
  getAllRestaurants,
  getRestaurantBySlug,
  registerRestaurant,
  toggleRestaurantActive,
  deleteRestaurant,
} from "@/lib/restaurants";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const restaurant = getRestaurantBySlug(slug);
    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found or inactive" }, { status: 404 });
    }
    return NextResponse.json({ restaurant });
  }

  const restaurants = getAllRestaurants();
  return NextResponse.json({ restaurants });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, name, tagline, phone, whatsapp, location, tableCount, starterPack, themeColor } = body;

    if (!slug || !name) {
      return NextResponse.json({ error: "Slug and Restaurant Name are required" }, { status: 400 });
    }

    const normalizedSlug = slug.toLowerCase().trim().replace(/[^a-z0-9_-]/g, "");

    if (normalizedSlug.length < 2) {
      return NextResponse.json({ error: "Slug must be at least 2 characters" }, { status: 400 });
    }

    const newRestaurant = registerRestaurant({
      slug: normalizedSlug,
      name,
      tagline,
      phone,
      whatsapp,
      location,
      tableCount: tableCount ? Number(tableCount) : 12,
      starterPack,
      themeColor,
    });

    return NextResponse.json({ success: true, restaurant: newRestaurant }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, action } = body;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    if (action === "toggle") {
      const newStatus = toggleRestaurantActive(slug);
      return NextResponse.json({ success: true, active: newStatus });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update restaurant" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const success = deleteRestaurant(slug);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete restaurant" }, { status: 400 });
  }
}
