import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-4 text-center">
                <div className="text-6xl font-bold text-maduraGold">404</div>
                <h2 className="text-xl font-semibold">Page Not Found</h2>
                <p className="text-sm text-slate-300">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-block px-4 py-2 rounded-full bg-maduraRed text-sm hover:bg-red-700 transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
