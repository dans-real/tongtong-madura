import { materials } from "@/data/materials";
import MaterialCard from "@/components/MaterialCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Learning Materials | Tong-Tong Madura",
    description: "Short, visual-friendly explanations about the history, instruments, rhythms, and social roles of tong-tong.",
    openGraph: {
        title: "Learning Materials | Tong-Tong Madura",
        description: "Explore the rich history and cultural significance of Tong-Tong in Madura",
    },
};

export default function MateriPage() {
    return (
        <div className="space-y-5">
            <header className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.25em] text-maduraGold">
                    Learning Corner
                </p>
                <h1 className="text-2xl font-semibold">Tong-Tong Materials</h1>
                <p className="text-sm text-slate-200">
                    Short, visual-friendly explanations about the history, instruments,
                    rhythms, and social roles of tong-tong.
                </p>
            </header>

            <div className="grid md:grid-cols-2 gap-4">
                {materials.map((m) => (
                    <MaterialCard key={m.slug} material={m} />
                ))}
            </div>
        </div>
    );
}
