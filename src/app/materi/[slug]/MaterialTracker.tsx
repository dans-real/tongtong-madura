"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";
import type { MaterialCategory } from "@/data/materials";

export default function MaterialTracker({
    slug,
    category,
}: {
    slug: string;
    category: MaterialCategory;
}) {
    useEffect(() => {
        analytics.materialRead(slug, category);
    }, [slug, category]);

    return null;
}
