import Link from "next/link";
import type { Material } from "@/data/materials";

const categoryLabel: Record<Material["category"], string> = {
    history: "History",
    instruments: "Instruments",
    rhythm: "Rhythm",
    social: "Social",
    modern: "Modern",
};

export default function MaterialCard({ material }: { material: Material }) {
    return (
        <Link
            href={`/materi/${material.slug}`}
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-maduraGold hover:bg-slate-900 transition-colors p-4 flex flex-col gap-1 shadow-soft-card/40"
        >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wide text-slate-400">
                <span>{categoryLabel[material.category]}</span>
                <span className="text-maduraGold group-hover:text-maduraSoft">
                    Read →
                </span>
            </div>
            <h3 className="text-sm font-semibold">{material.title}</h3>
            <p className="text-[11px] text-slate-300 line-clamp-2">
                {material.excerpt}
            </p>
        </Link>
    );
}
