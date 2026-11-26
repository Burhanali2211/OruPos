import fs from "fs";
import path from "path";

export interface AnalyticsEvent {
  id: string;
  slug: string;
  timestamp: number; // unix ms
  table?: string;
  path?: string;
  device?: "mobile" | "desktop" | "tablet";
  eventType: "visit" | "scan" | "order" | "dish_click" | "search" | "cart_add";
  source?: "qr" | "link" | "direct";
  referrer?: string;
  dishId?: string;
  dishName?: string;
  category?: string;
  query?: string;
  orderTotal?: number;
  itemsCount?: number;
}

export interface AnalyticsSummary {
  slug: string;
  period: "day" | "week" | "month" | "year";
  totalVisitors: number;
  totalScans: number;
  totalLinkVisits: number;
  totalOrders: number;
  totalDishClicks: number;
  totalOrderRevenue: number;
  peakHour: string;
  peakHourDescription: string;
  timeSeries: {
    label: string;
    visitors: number;
    scans: number;
    linkVisits: number;
    orders: number;
    dishClicks: number;
  }[];
  rushHourDistribution: {
    slot: string;
    label: string;
    percentage: number;
    count: number;
    isPeak: boolean;
  }[];
  sourceAttribution: {
    qrCount: number;
    qrPercentage: number;
    linkCount: number;
    linkPercentage: number;
    topReferrers: { referrer: string; count: number }[];
  };
  deviceShare: { mobile: number; desktop: number; tablet: number };
  topTables: { table: string; scans: number; orders: number }[];
  topDishes: { id?: string; name: string; category?: string; clicks: number; orders: number }[];
  topCategories: { name: string; clicks: number }[];
  topSearches: { query: string; count: number }[];
  recentEvents: AnalyticsEvent[];
}

function getAnalyticsFilePath(): string {
  // VPS or Docker persistent storage
  const vpsPath = "/var/www/restaurants/.analytics.json";
  if (fs.existsSync(path.dirname(vpsPath))) {
    return vpsPath;
  }
  // Local project directory
  const localDir = path.join(process.cwd(), "src", "data");
  return path.join(localDir, "analytics-store.json");
}

export function recordAnalyticsEvent(event: Omit<AnalyticsEvent, "id">): void {
  try {
    const filePath = getAnalyticsFilePath();
    let events: AnalyticsEvent[] = [];
    if (fs.existsSync(filePath)) {
      try {
        const raw = fs.readFileSync(filePath, "utf-8");
        events = JSON.parse(raw);
        if (!Array.isArray(events)) events = [];
      } catch {
        events = [];
      }
    }

    // Determine source if not explicitly provided
    let source = event.source;
    if (!source) {
      if (event.table || event.eventType === "scan") {
        source = "qr";
      } else {
        source = "link";
      }
    }

    const newEvent: AnalyticsEvent = {
      ...event,
      source,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: event.timestamp || Date.now(),
    };

    events.push(newEvent);

    // Keep last 30,000 events to stay performant and lightweight
    if (events.length > 30000) {
      events = events.slice(events.length - 30000);
    }

    fs.writeFileSync(filePath, JSON.stringify(events, null, 2), "utf-8");
  } catch {
    // Graceful fallback for read-only environments
  }
}

export function getAnalyticsEvents(slug?: string): AnalyticsEvent[] {
  try {
    const filePath = getAnalyticsFilePath();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const list: AnalyticsEvent[] = JSON.parse(raw);
      if (!Array.isArray(list)) return [];
      if (slug && slug !== "all") {
        return list.filter((e) => e.slug === slug);
      }
      return list;
    }
  } catch {
    // ignore
  }
  return [];
}

/**
 * 100% Real Analytics Aggregation
 * Strictly calculates metrics from recorded AnalyticsEvents with ZERO synthetic / fake data.
 */
export function getAnalyticsSummary(
  slug: string = "all",
  period: "day" | "week" | "month" | "year" = "day"
): AnalyticsSummary {
  const allEvents = getAnalyticsEvents(slug);
  const now = new Date();

  // Calculate start time window
  let startTime = 0;
  if (period === "day") {
    // Today from midnight 00:00:00 to now
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    startTime = d.getTime();
  } else if (period === "week") {
    // Past 7 days (including today)
    const d = new Date(now);
    d.setDate(d.getDate() - 6);
    d.setHours(0, 0, 0, 0);
    startTime = d.getTime();
  } else if (period === "month") {
    // Past 30 days
    const d = new Date(now);
    d.setDate(d.getDate() - 29);
    d.setHours(0, 0, 0, 0);
    startTime = d.getTime();
  } else {
    // Past 12 months
    const d = new Date(now);
    d.setFullYear(d.getFullYear() - 1);
    d.setHours(0, 0, 0, 0);
    startTime = d.getTime();
  }

  // Filter ONLY real events recorded within this exact window
  const events = allEvents.filter((e) => e.timestamp >= startTime && e.timestamp <= now.getTime());

  // Count visits: events of type 'visit' or 'scan' or any event without dish_click/search
  const visitEvents = events.filter((e) => e.eventType === "visit" || e.eventType === "scan");
  const totalVisitors = visitEvents.length > 0 ? visitEvents.length : events.length;

  const qrScanEvents = events.filter(
    (e) => e.eventType === "scan" || e.source === "qr" || Boolean(e.table)
  );
  const totalScans = qrScanEvents.length;
  const totalLinkVisits = Math.max(0, totalVisitors - totalScans);

  const orderEvents = events.filter((e) => e.eventType === "order");
  const totalOrders = orderEvents.length;

  const totalOrderRevenue = orderEvents.reduce((sum, e) => sum + (e.orderTotal || 0), 0);

  const dishClickEvents = events.filter(
    (e) => e.eventType === "dish_click" || e.eventType === "cart_add"
  );
  const totalDishClicks = dishClickEvents.length;

  const timeSeries: AnalyticsSummary["timeSeries"] = [];

  if (period === "day") {
    // 24 real hourly buckets (12 AM to 11 PM)
    for (let hour = 0; hour < 24; hour++) {
      const formattedHour =
        hour === 0
          ? "12 AM"
          : hour < 12
          ? `${hour} AM`
          : hour === 12
          ? "12 PM"
          : `${hour - 12} PM`;

      const bucketEvents = events.filter((e) => {
        const d = new Date(e.timestamp);
        return d.getHours() === hour;
      });

      const bVisits = bucketEvents.filter((e) => e.eventType === "visit" || e.eventType === "scan");
      const bScans = bucketEvents.filter(
        (e) => e.eventType === "scan" || e.source === "qr" || Boolean(e.table)
      );
      const bOrders = bucketEvents.filter((e) => e.eventType === "order");
      const bDishClicks = bucketEvents.filter(
        (e) => e.eventType === "dish_click" || e.eventType === "cart_add"
      );

      timeSeries.push({
        label: formattedHour,
        visitors: bVisits.length > 0 ? bVisits.length : bucketEvents.length,
        scans: bScans.length,
        linkVisits: Math.max(0, (bVisits.length || bucketEvents.length) - bScans.length),
        orders: bOrders.length,
        dishClicks: bDishClicks.length,
      });
    }
  } else if (period === "week") {
    // Past 7 real calendar days
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dayStart = new Date(d).setHours(0, 0, 0, 0);
      const dayEnd = new Date(d).setHours(23, 59, 59, 999);

      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      const dayNum = d.toLocaleDateString("en-US", { month: "numeric", day: "numeric" });
      const label = `${dayName} ${dayNum}`;

      const bucketEvents = events.filter((e) => e.timestamp >= dayStart && e.timestamp <= dayEnd);
      const bVisits = bucketEvents.filter((e) => e.eventType === "visit" || e.eventType === "scan");
      const bScans = bucketEvents.filter(
        (e) => e.eventType === "scan" || e.source === "qr" || Boolean(e.table)
      );
      const bOrders = bucketEvents.filter((e) => e.eventType === "order");
      const bDishClicks = bucketEvents.filter(
        (e) => e.eventType === "dish_click" || e.eventType === "cart_add"
      );

      timeSeries.push({
        label,
        visitors: bVisits.length > 0 ? bVisits.length : bucketEvents.length,
        scans: bScans.length,
        linkVisits: Math.max(0, (bVisits.length || bucketEvents.length) - bScans.length),
        orders: bOrders.length,
        dishClicks: bDishClicks.length,
      });
    }
  } else if (period === "month") {
    // Past 4 weeks
    const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];
    for (let w = 0; w < 4; w++) {
      const wStart = startTime + w * (7 * 24 * 60 * 60 * 1000);
      const wEnd = w === 3 ? now.getTime() : wStart + 7 * 24 * 60 * 60 * 1000;

      const bucketEvents = events.filter((e) => e.timestamp >= wStart && e.timestamp < wEnd);
      const bVisits = bucketEvents.filter((e) => e.eventType === "visit" || e.eventType === "scan");
      const bScans = bucketEvents.filter(
        (e) => e.eventType === "scan" || e.source === "qr" || Boolean(e.table)
      );
      const bOrders = bucketEvents.filter((e) => e.eventType === "order");
      const bDishClicks = bucketEvents.filter(
        (e) => e.eventType === "dish_click" || e.eventType === "cart_add"
      );

      timeSeries.push({
        label: weekLabels[w],
        visitors: bVisits.length > 0 ? bVisits.length : bucketEvents.length,
        scans: bScans.length,
        linkVisits: Math.max(0, (bVisits.length || bucketEvents.length) - bScans.length),
        orders: bOrders.length,
        dishClicks: bDishClicks.length,
      });
    }
  } else {
    // Past 12 months
    for (let m = 11; m >= 0; m--) {
      const d = new Date(now.getFullYear(), now.getMonth() - m, 1);
      const mStart = new Date(d.getFullYear(), d.getMonth(), 1).getTime();
      const mEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999).getTime();

      const label = d.toLocaleDateString("en-US", { month: "short" });

      const bucketEvents = events.filter((e) => e.timestamp >= mStart && e.timestamp <= mEnd);
      const bVisits = bucketEvents.filter((e) => e.eventType === "visit" || e.eventType === "scan");
      const bScans = bucketEvents.filter(
        (e) => e.eventType === "scan" || e.source === "qr" || Boolean(e.table)
      );
      const bOrders = bucketEvents.filter((e) => e.eventType === "order");
      const bDishClicks = bucketEvents.filter(
        (e) => e.eventType === "dish_click" || e.eventType === "cart_add"
      );

      timeSeries.push({
        label,
        visitors: bVisits.length > 0 ? bVisits.length : bucketEvents.length,
        scans: bScans.length,
        linkVisits: Math.max(0, (bVisits.length || bucketEvents.length) - bScans.length),
        orders: bOrders.length,
        dishClicks: bDishClicks.length,
      });
    }
  }

  // Real Peak Hour Detection
  let peakHour = "No traffic yet";
  let peakHourDescription = "Traffic and rush hour patterns will appear as customers browse";
  if (totalVisitors > 0) {
    const hourlyCounts: number[] = Array(24).fill(0);
    events.forEach((e) => {
      const h = new Date(e.timestamp).getHours();
      hourlyCounts[h]++;
    });

    let maxHour = 0;
    let maxCount = 0;
    hourlyCounts.forEach((c, h) => {
      if (c > maxCount) {
        maxCount = c;
        maxHour = h;
      }
    });

    if (maxCount > 0) {
      const formatH = (h: number) => {
        if (h === 0) return "12 AM";
        if (h < 12) return `${h} AM`;
        if (h === 12) return "12 PM";
        return `${h - 12} PM`;
      };
      peakHour = `${formatH(maxHour)} – ${formatH((maxHour + 1) % 24)}`;
      peakHourDescription = `${maxCount} customer visit${maxCount === 1 ? "" : "s"} recorded during this peak hour`;
    }
  }

  // Real Rush Hour Slots (counted strictly from real event timestamps)
  let lunchCount = 0;     // 12:00 PM – 3:30 PM
  let dinnerCount = 0;    // 7:00 PM – 10:30 PM
  let afternoonCount = 0; // 3:30 PM – 7:00 PM
  let lateNightCount = 0; // 10:30 PM – 12:00 AM

  events.forEach((e) => {
    const d = new Date(e.timestamp);
    const h = d.getHours();
    const m = d.getMinutes();
    const timeVal = h + m / 60;

    if (timeVal >= 12 && timeVal < 15.5) {
      lunchCount++;
    } else if (timeVal >= 19 && timeVal < 22.5) {
      dinnerCount++;
    } else if (timeVal >= 15.5 && timeVal < 19) {
      afternoonCount++;
    } else if (timeVal >= 22.5 || timeVal < 4) {
      lateNightCount++;
    }
  });

  const maxSlotCount = Math.max(lunchCount, dinnerCount, afternoonCount, lateNightCount);
  const calcPct = (cnt: number) => (totalVisitors > 0 ? Math.round((cnt / totalVisitors) * 100) : 0);

  const rushHourDistribution = [
    {
      slot: "12:00 PM – 3:30 PM",
      label: "Lunch Rush",
      percentage: calcPct(lunchCount),
      count: lunchCount,
      isPeak: maxSlotCount > 0 && lunchCount === maxSlotCount,
    },
    {
      slot: "7:00 PM – 10:30 PM",
      label: "Dinner Rush (Peak)",
      percentage: calcPct(dinnerCount),
      count: dinnerCount,
      isPeak: maxSlotCount > 0 && dinnerCount === maxSlotCount,
    },
    {
      slot: "3:30 PM – 7:00 PM",
      label: "Afternoon Cafe Hours",
      percentage: calcPct(afternoonCount),
      count: afternoonCount,
      isPeak: maxSlotCount > 0 && afternoonCount === maxSlotCount,
    },
    {
      slot: "10:30 PM – 12:00 AM",
      label: "Late Night Orders",
      percentage: calcPct(lateNightCount),
      count: lateNightCount,
      isPeak: maxSlotCount > 0 && lateNightCount === maxSlotCount,
    },
  ];

  // Real Source Attribution (QR vs Link)
  const qrPercentage = totalVisitors > 0 ? Math.round((totalScans / totalVisitors) * 100) : 0;
  const linkPercentage = totalVisitors > 0 ? Math.round((totalLinkVisits / totalVisitors) * 100) : 0;

  const referrerCounts: Record<string, number> = {};
  events.forEach((e) => {
    if (e.referrer && e.referrer !== "direct") {
      try {
        const u = new URL(e.referrer);
        const host = u.hostname.replace(/^www\./, "");
        referrerCounts[host] = (referrerCounts[host] || 0) + 1;
      } catch {
        referrerCounts[e.referrer] = (referrerCounts[e.referrer] || 0) + 1;
      }
    }
  });
  const topReferrers = Object.entries(referrerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([referrer, count]) => ({ referrer, count }));

  // Real Device Share
  let mobileCount = 0;
  let desktopCount = 0;
  let tabletCount = 0;

  events.forEach((e) => {
    if (e.device === "mobile") mobileCount++;
    else if (e.device === "tablet") tabletCount++;
    else desktopCount++;
  });

  const totalDeviceEvents = mobileCount + desktopCount + tabletCount;
  const deviceShare = {
    mobile: totalDeviceEvents > 0 ? Math.round((mobileCount / totalDeviceEvents) * 100) : 0,
    desktop: totalDeviceEvents > 0 ? Math.round((desktopCount / totalDeviceEvents) * 100) : 0,
    tablet: totalDeviceEvents > 0 ? Math.round((tabletCount / totalDeviceEvents) * 100) : 0,
  };

  // Real Top Tables (with scans and orders per table)
  const tableData: Record<string, { scans: number; orders: number }> = {};
  events.forEach((e) => {
    if (e.table) {
      const cleanTable = `Table ${e.table.replace(/^table\s*/i, "").trim()}`;
      if (!tableData[cleanTable]) {
        tableData[cleanTable] = { scans: 0, orders: 0 };
      }
      if (e.eventType === "scan" || e.source === "qr" || e.eventType === "visit") {
        tableData[cleanTable].scans++;
      }
      if (e.eventType === "order") {
        tableData[cleanTable].orders++;
      }
    }
  });

  const topTables = Object.entries(tableData)
    .sort((a, b) => b[1].scans + b[1].orders - (a[1].scans + a[1].orders))
    .slice(0, 8)
    .map(([table, counts]) => ({
      table,
      scans: counts.scans,
      orders: counts.orders,
    }));

  // Real Top Dishes (Clicks & Orders)
  const dishMap: Record<string, { id?: string; name: string; category?: string; clicks: number; orders: number }> = {};
  events.forEach((e) => {
    if (e.dishName) {
      const key = e.dishName.trim();
      if (!dishMap[key]) {
        dishMap[key] = {
          id: e.dishId,
          name: key,
          category: e.category,
          clicks: 0,
          orders: 0,
        };
      }
      if (e.eventType === "dish_click" || e.eventType === "cart_add") {
        dishMap[key].clicks++;
      }
      if (e.eventType === "order") {
        dishMap[key].orders++;
      }
    }
  });

  const topDishes = Object.values(dishMap)
    .sort((a, b) => b.clicks + b.orders * 2 - (a.clicks + a.orders * 2))
    .slice(0, 8);

  // Real Categories
  const categoryCounts: Record<string, number> = {};
  events.forEach((e) => {
    if (e.category) {
      categoryCounts[e.category] = (categoryCounts[e.category] || 0) + 1;
    }
  });
  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, clicks]) => ({ name, clicks }));

  // Real Top Searches
  const searchCounts: Record<string, number> = {};
  events.forEach((e) => {
    if (e.query) {
      const q = e.query.trim().toLowerCase();
      searchCounts[q] = (searchCounts[q] || 0) + 1;
    }
  });
  const topSearches = Object.entries(searchCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([query, count]) => ({ query, count }));

  // Recent 30 events sorted newest first (for live event feed)
  const recentEvents = [...events]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 30);

  return {
    slug,
    period,
    totalVisitors,
    totalScans,
    totalLinkVisits,
    totalOrders,
    totalDishClicks,
    totalOrderRevenue,
    peakHour,
    peakHourDescription,
    timeSeries,
    rushHourDistribution,
    sourceAttribution: {
      qrCount: totalScans,
      qrPercentage,
      linkCount: totalLinkVisits,
      linkPercentage,
      topReferrers,
    },
    deviceShare,
    topTables,
    topDishes,
    topCategories,
    topSearches,
    recentEvents,
  };
}
