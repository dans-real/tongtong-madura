import { quizzes, getQuizBySlug } from "@/data/quizzes";
import { notFound } from "next/navigation";
import QuizClient from "./QuizClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
    return quizzes.map((q) => ({
        slug: q.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const quiz = getQuizBySlug(slug);

    if (!quiz) {
        return {
            title: "Quiz Not Found",
        };
    }

    return {
        title: `${quiz.title} | Tong-Tong Madura`,
        description: quiz.description,
        openGraph: {
            title: quiz.title,
            description: quiz.description,
            type: "website",
        },
    };
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
