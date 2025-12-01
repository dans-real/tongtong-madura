/**
 * Error monitoring utility
 * Can be integrated with Sentry, LogRocket, or custom solution
 */

export const errorMonitor = {
    /**
     * Capture and log errors
     */
    captureException: (error: Error, context?: Record<string, unknown>) => {
        // Add your error monitoring service here
        // Example: Sentry.captureException(error, { extra: context });

        console.error("[Error Monitor]", error, context);

        // Log to server in production
        if (process.env.NODE_ENV === "production") {
            // Send to your error tracking endpoint
            // fetch('/api/errors', {
            //     method: 'POST',
            //     body: JSON.stringify({ error: error.message, stack: error.stack, context })
            // });
        }
    },

    /**
     * Capture custom message
     */
    captureMessage: (message: string, level: "info" | "warning" | "error" = "info") => {
        const logMethod = level === "warning" ? "warn" : level;
        console[logMethod]("[Error Monitor]", message);

        if (process.env.NODE_ENV === "production") {
            // Send to your logging service
        }
    },

    /**
     * Set user context for error tracking
     */
    setUser: (userId: string, userData?: Record<string, unknown>) => {
        // Example: Sentry.setUser({ id: userId, ...userData });
        console.log("[Error Monitor] User set:", userId, userData);
    },
};
