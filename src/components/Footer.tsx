export default function Footer() {
    return (
        <footer className="border-t border-redBrown-700 mt-12 bg-redBrown-950/30" role="contentinfo">
            <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px]">
                <div className="flex items-center gap-2 text-redBrown-300">
                    <span className="text-lg">🥁</span>
                    <span>© {new Date().getFullYear()} <span className="font-bold text-amber-300">TONGMA</span> - Tong-Tong Madura</span>
                </div>
                <span className="text-redBrown-400 text-center md:text-right">
                    Jaga ritme Madura tetap hidup, satu ketukan dalam satu waktu. Dibuat dengan ❤️ untuk budaya.
                </span>
            </div>
        </footer>
    );
}
