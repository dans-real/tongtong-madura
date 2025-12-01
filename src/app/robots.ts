import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/_next/"],
        },
        sitemap: "https://glennn-droid.github.io/tongtong-madura/sitemap.xml",
    };
}
