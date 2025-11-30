export default function Footer() {
    return (
        <footer className="border-t border-slate-800 mt-8">
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
                <span>© {new Date().getFullYear()} Tong-Tong Madura Hub</span>
                <span className="text-slate-500">
                    Preserving rhythm, stories, and spirit of Madura through the web.
                </span>
            </div>
        </footer>
    );
}
