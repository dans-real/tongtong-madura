import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://tongtongmadura.web.id";

export default function sitemap(): MetadataRoute.Sitemap {
    // Static pages only - dynamic routes loaded from Firebase
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/peta`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
    ];

    return staticPages;
}
