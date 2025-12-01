"use client";

import { useEffect } from "react";
import { errorMonitor } from "@/lib/errorMonitor";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to error monitoring service
        errorMonitor.captureException(error, {
            digest: error.digest,
            timestamp: new Date().toISOString(),
        });
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-maduraRed/20 flex items-center justify-center">
                    <span className="text-2xl">⚠️</span>
                </div>
                <h2 className="text-xl font-semibold">Something went wrong!</h2>
                <p className="text-sm text-slate-300">
                    We encountered an error while loading this page. Please try again.
                </p>
                <button
                    onClick={reset}
                    className="px-4 py-2 rounded-full bg-maduraRed text-sm hover:bg-red-700 transition-colors"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
