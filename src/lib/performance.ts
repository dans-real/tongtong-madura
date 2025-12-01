/**
 * Performance monitoring utility
 * Track Core Web Vitals and custom metrics
 */

export const performanceMonitor = {
    /**
     * Report Web Vitals to analytics
     */
    reportWebVitals: (metric: {
        id: string;
        name: string;
        value: number;
        label: "web-vital" | "custom";
    }) => {
        if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
            // Send to your analytics service
            console.log("[Performance]", metric);

            // Example with Google Analytics
            // gtag('event', metric.name, {
            //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            //     metric_id: metric.id,
            //     metric_value: metric.value,
            //     metric_delta: metric.delta,
            // });
        }
    },

    /**
     * Measure custom performance metric
     */
    measure: (name: string, startTime?: number) => {
        if (typeof window === "undefined") return;

        const endTime = performance.now();
        const duration = startTime ? endTime - startTime : endTime;

        console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);

        return duration;
    },

    /**
     * Mark performance event
     */
    mark: (name: string) => {
        if (typeof window !== "undefined" && performance.mark) {
            performance.mark(name);
        }
    },
};
