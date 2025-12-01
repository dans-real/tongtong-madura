import Link from "next/link";
import type { Region } from "@/data/regions";

export default function RegionCard({ region }: { region: Region }) {
    return (
        <article>
            <Link
                href={`/daerah/${region.slug}`}
                className="relative overflow-hidden rounded-2xl border border-redBrown-700/50 bg-redBrown-900/60 hover:border-redBrown-500 hover:bg-redBrown-800 hover:shadow-lg hover:shadow-redBrown-600/30 transition-all shadow-2xl shadow-redBrown-950/50"
                aria-label={`Explore Tong-Tong in ${region.name}`}
            >
                <div className="absolute inset-0 bg-linear-to-tr from-redBrown-600/10 via-transparent to-redBrown-400/5 pointer-events-none" />
                <div className="relative p-4 space-y-1">
                    <h3 className="text-sm font-semibold text-redBrown-100">{region.name}</h3>
                    <p className="text-[11px] text-redBrown-200">{region.shortDescription}</p>
                </div>
            </Link>
        </article>
    );
}
