import { getMaterialBySlug, materials } from "@/data/materials";
import { quizzes } from "@/data/quizzes";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MaterialTracker from "./MaterialTracker";

export async function generateStaticParams() {
    return materials.map((m) => ({
        slug: m.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const material = getMaterialBySlug(slug);

    if (!material) {
        return {
            title: "Material Not Found",
        };
    }

    return {
        title: `${material.title} | Tong-Tong Madura`,
        description: material.excerpt,
        openGraph: {
            title: material.title,
            description: material.excerpt,
            type: "article",
        },
    };
}

export default async function MaterialDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const material = getMaterialBySlug(slug);

    if (!material) {
        notFound();
    }

    const relatedQuiz = quizzes.find(
        (q) => q.relatedMaterialSlug === material.slug
    );

    return (
        <article className="space-y-5">
            <MaterialTracker slug={material.slug} category={material.category} />
            <header className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.25em] text-maduraGold">
                    Material
                </p>
                <h1 className="text-2xl font-semibold">{material.title}</h1>
            </header>

            <div className="prose-invert-custom max-w-none">
                {material.content.split("\n").map((para, idx) =>
                    para.trim() ? (
                        <p key={idx}>{para}</p>
                    ) : (
                        <div key={idx} className="h-2" />
                    )
                )}
            </div>

            {relatedQuiz && (
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
                    <h2 className="text-sm font-semibold">Ready for a quick quiz?</h2>
                    <p className="text-[11px] text-slate-300">
                        Test your understanding of this material in a short interactive
                        quiz.
                    </p>
                    <Link
                        href={`/quiz/${relatedQuiz.slug}`}
                        className="inline-flex text-xs px-3 py-1.5 rounded-full bg-maduraRed text-slate-50 hover:bg-red-700 transition-colors"
                    >
                        Start quiz: {relatedQuiz.title}
                    </Link>
                </div>
            )}
        </article>
    );
}
