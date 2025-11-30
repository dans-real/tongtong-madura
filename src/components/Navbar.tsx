import Link from "next/link";

const navItems = [
    { href: "/peta", label: "Map" },
    { href: "/materi", label: "Materials" },
    { href: "/quiz", label: "Quiz" },
];

export default function Navbar() {
    return (
        <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur sticky top-0 z-40">
            <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-maduraRed to-maduraSoft flex items-center justify-center text-xs font-bold shadow-soft-card">
                        TT
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-sm font-semibold group-hover:text-maduraGold transition-colors">
                            Tong-Tong Madura
                        </span>
                        <span className="text-[10px] text-slate-400">
                            Culture • Rhythm • Youth
                        </span>
                    </div>
                </Link>
                <div className="flex items-center gap-3 text-xs">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="px-3 py-1.5 rounded-full border border-transparent text-slate-200 hover:border-maduraGold hover:bg-slate-900/60 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}
