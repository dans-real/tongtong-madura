"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

export default function RegionTracker({ slug }: { slug: string }) {
    useEffect(() => {
        analytics.regionExplored(slug);
    }, [slug]);

    return null;
}
