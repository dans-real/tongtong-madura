import Link from "next/link";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/peta", label: "Peta" },
];

export default function Navbar() {
    return (
        <header className="border-b border-redBrown-700/30 bg-linear-to-r from-redBrown-950/98 via-redBrown-900/98 to-redBrown-950/98 backdrop-blur-xl sticky top-0 z-40 shadow-2xl shadow-redBrown-950/80">
            <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-center" aria-label="Main navigation">
                <Link href="/" className="flex items-center gap-3 group" aria-label="TONGMA - Tong-Tong Madura home">
                    <div className="relative">
                        {/* Logo TONGMA */}
                        <div className="px-3 py-2 rounded-xl bg-linear-to-br from-amber-400 via-amber-300 to-yellow-200 flex items-center justify-center shadow-2xl shadow-amber-400/60 group-hover:scale-105 group-hover:shadow-amber-300/80 transition-all duration-300 border-2 border-amber-200">
                            <span className="text-xl md:text-2xl font-black text-redBrown-950 tracking-tighter">
                                TONGMA
                            </span>
                        </div>
                        {/* Decorative dot */}
                        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-redBrown-950 group-hover:animate-pulse" />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-lg md:text-xl font-bold text-white drop-shadow-[0_3px_15px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_3px_20px_rgba(251,191,36,0.5)] transition-all duration-300">
                            Tong-Tong Madura
                        </span>
                        <span className="text-xs text-amber-200 font-medium">
                            Culture • Vibe • Youth
                        </span>
                    </div>
                </Link>
            </nav>
        </header>
    );
}
