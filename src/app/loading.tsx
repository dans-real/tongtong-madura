export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-700" />
                    <div className="absolute inset-0 rounded-full border-4 border-maduraGold border-t-transparent animate-spin" />
                </div>
                <p className="text-sm text-slate-400">Loading Tong-Tong Madura...</p>
            </div>
        </div>
    );
}
