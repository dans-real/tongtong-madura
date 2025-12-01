import MapMadura from "@/components/MapMadura";
import { regions } from "@/data/regions";
import RegionCard from "@/components/RegionCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Interactive Map | Tong-Tong Madura",
    description: "Explore Tong-Tong traditions across different regions of Madura: Bangkalan, Sampang, Pamekasan, and Sumenep.",
    openGraph: {
        title: "Interactive Map | Tong-Tong Madura",
        description: "Discover how each region of Madura keeps the Tong-Tong tradition alive",
    },
};

export default function PetaPage() {
    return (
        <div className="space-y-6">
            <header className="space-y-2">
                <h1 className="text-2xl font-semibold">Tong-Tong Map of Madura</h1>
                <p className="text-sm text-slate-200">
                    Click a pin on the map or choose a region from the list to learn how
                    each community keeps the tong-tong tradition alive.
                </p>
            </header>

            <MapMadura />

            <section className="space-y-3">
                <h2 className="text-base font-semibold">Regions</h2>
                <div className="grid md:grid-cols-2 gap-3">
                    {regions.map((r) => (
                        <RegionCard key={r.slug} region={r} />
                    ))}
                </div>
            </section>
        </div>
    );
}
