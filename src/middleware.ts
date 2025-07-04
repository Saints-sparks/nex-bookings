import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl.clone();

  const isDev = process.env.NODE_ENV === "development";

  // Determine if it's a subdomain-based vendor request
  const isSubdomainRequest = isDev
    ? host.endsWith(".lvh.me:3000")
    : host.endsWith(".osisopro.com");

  const debugHeaders: Record<string, string> = {
    "x-debug-host": host,
    "x-debug-path": url.pathname,
    "x-debug-env": isDev ? "development" : "production",
    "x-debug-middleware": "executed",
  };

  let response: NextResponse;

  if (isSubdomainRequest) {
    const subdomain = host.split(".")[0];

    if (subdomain && subdomain !== "www") {
      const newPath = `/vendor/${subdomain}${url.pathname}`;

      Object.assign(debugHeaders, {
        "x-debug-subdomain": subdomain,
        "x-debug-rewrite": "true",
        "x-debug-new-path": newPath,
      });

      url.pathname = newPath;
      response = NextResponse.rewrite(url);
    } else {
      // it's 'www' or empty (root), just proceed as normal
      debugHeaders["x-debug-rewrite"] = "false";
      debugHeaders["x-debug-reason"] = "non-vendor-subdomain";
      response = NextResponse.next();
    }
  } else {
    debugHeaders["x-debug-rewrite"] = "false";
    debugHeaders["x-debug-reason"] = "host-not-matched";
    response = NextResponse.next();
  }

  // Attach debug headers
  for (const [key, value] of Object.entries(debugHeaders)) {
    response.headers.set(key, value);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
