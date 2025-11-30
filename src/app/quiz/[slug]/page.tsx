import { quizzes, getQuizBySlug } from "@/data/quizzes";
import { notFound } from "next/navigation";
import QuizClient from "./QuizClient";

export async function generateStaticParams() {
    return quizzes.map((q) => ({
        slug: q.slug,
    }));
}

export default async function QuizDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const quiz = getQuizBySlug(slug);

    if (!quiz) {
        notFound();
    }

    return <QuizClient quiz={quiz} />;
}
