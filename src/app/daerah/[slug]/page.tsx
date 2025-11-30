import { getRegionBySlug, regions } from "@/data/regions";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return regions.map((region) => ({
        slug: region.slug,
    }));
}

export default async function RegionDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const region = getRegionBySlug(slug);

    if (!region) {
        notFound();
    }

    return (
        <div className="space-y-5">
            <header className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.25em] text-maduraGold">
                    Tong-Tong Region
                </p>
                <h1 className="text-2xl font-semibold">{region.name}</h1>
                <p className="text-sm text-slate-200">{region.shortDescription}</p>
            </header>

            <section className="space-y-2">
                <h2 className="text-base font-semibold text-maduraGold">History</h2>
                <p className="text-sm text-slate-100 whitespace-pre-line">
                    {region.history}
                </p>
            </section>

            <section className="space-y-2">
                <h2 className="text-base font-semibold text-maduraGold">Uniqueness</h2>
                <p className="text-sm text-slate-100 whitespace-pre-line">
                    {region.uniqueness}
                </p>
            </section>
        </div>
    );
}
