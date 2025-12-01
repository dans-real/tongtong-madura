import type { MetadataRoute } from "next";
import { materials } from "@/data/materials";
import { quizzes } from "@/data/quizzes";
import { regions } from "@/data/regions";

export const dynamic = "force-static";

const baseUrl = "https://glennn-droid.github.io/tongtong-madura";

export default function sitemap(): MetadataRoute.Sitemap {
    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/materi`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/quiz`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/peta`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
    ];

    // Material pages
    const materialPages = materials.map((material) => ({
        url: `${baseUrl}/materi/${material.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    // Quiz pages
    const quizPages = quizzes.map((quiz) => ({
        url: `${baseUrl}/quiz/${quiz.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    // Region pages
    const regionPages = regions.map((region) => ({
        url: `${baseUrl}/daerah/${region.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticPages, ...materialPages, ...quizPages, ...regionPages];
}
