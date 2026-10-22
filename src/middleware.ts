import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images and public assets with extensions (.png, .jpg, .svg, etc.)
     */
    "/((?!api/|_next/static|_next/image|assets/|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";
  const hostWithoutPort = host.split(":")[0].toLowerCase();

  // If path is admin, dashboard, or api, always pass through directly
  if (
    url.pathname.startsWith("/admin") ||
    url.pathname.startsWith("/dashboard") ||
    url.pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  let subdomain: string | null = null;

  // 1. Production domain: e.g. "spiceroute.orupos.in"
  if (hostWithoutPort.endsWith(".orupos.in")) {
    const candidate = hostWithoutPort.replace(".orupos.in", "");
    if (candidate && candidate !== "www") {
      subdomain = candidate;
    }
  }
  // 2. Local development: e.g. "spiceroute.localhost:3000"
  else if (hostWithoutPort.endsWith(".localhost")) {
    subdomain = hostWithoutPort.replace(".localhost", "");
  }
  // 3. Vercel deployment preview: e.g. "spiceroute---orupos.vercel.app"
  else if (hostWithoutPort.includes("---") && hostWithoutPort.endsWith(".vercel.app")) {
    subdomain = hostWithoutPort.split("---")[0];
  }

  // Handle admin subdomain if someone accesses "admin.orupos.in"
  if (subdomain === "admin") {
    const targetUrl = new URL(`/admin${url.pathname === "/" ? "" : url.pathname}${url.search}`, req.url);
    return NextResponse.rewrite(targetUrl);
  }

  // If a valid restaurant subdomain is detected, rewrite internally to /r/[subdomain]
  if (subdomain && subdomain !== "www") {
    // If path already starts with /r/ or /demo, continue
    if (url.pathname.startsWith("/r/")) {
      return NextResponse.next();
    }

    // Rewrite to /r/[subdomain] with all search params preserved (e.g. ?table=04)
    const targetUrl = new URL(
      `/r/${subdomain}${url.pathname === "/" ? "" : url.pathname}${url.search}`,
      req.url
    );

    return NextResponse.rewrite(targetUrl);
  }

  return NextResponse.next();
}
