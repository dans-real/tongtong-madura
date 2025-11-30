import Link from "next/link";
import type { Region } from "@/data/regions";

export default function RegionCard({ region }: { region: Region }) {
    return (
        <Link
            href={`/daerah/${region.slug}`}
            className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-maduraGold hover:bg-slate-900 transition-colors shadow-soft-card/40"
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-maduraRed/10 via-transparent to-maduraGold/5 pointer-events-none" />
            <div className="relative p-4 space-y-1">
                <h3 className="text-sm font-semibold">{region.name}</h3>
                <p className="text-[11px] text-slate-300">{region.shortDescription}</p>
            </div>
        </Link>
    );
}
