/**
 * Simple analytics utility for tracking user interactions
 * Can be integrated with Google Analytics, Vercel Analytics, or custom solution
 */

type AnalyticsEvent = {
    name: string;
    properties?: Record<string, string | number | boolean>;
};

export const analytics = {
    /**
     * Track page view
     */
    pageView: (url: string) => {
        if (typeof window !== "undefined") {
            // Add your analytics provider here
            // Example: gtag('config', 'GA_MEASUREMENT_ID', { page_path: url });
            console.log("[Analytics] Page view:", url);
        }
    },

    /**
     * Track custom event
     */
    track: (event: AnalyticsEvent) => {
        if (typeof window !== "undefined") {
            // Add your analytics provider here
            // Example: gtag('event', event.name, event.properties);
            console.log("[Analytics] Event:", event.name, event.properties);
        }
    },

    /**
     * Track quiz completion
     */
    quizCompleted: (quizSlug: string, score: number) => {
        analytics.track({
            name: "quiz_completed",
            properties: {
                quiz_slug: quizSlug,
                score,
            },
        });
    },

    /**
     * Track material read
     */
    materialRead: (materialSlug: string, category: string) => {
        analytics.track({
            name: "material_read",
            properties: {
                material_slug: materialSlug,
                category,
            },
        });
    },

    /**
     * Track region exploration
     */
    regionExplored: (regionSlug: string) => {
        analytics.track({
            name: "region_explored",
            properties: {
                region_slug: regionSlug,
            },
        });
    },
};
