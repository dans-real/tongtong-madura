export type QuizOption = {
    id: string;
    text: string;
    isCorrect: boolean;
};

export type QuizQuestion = {
    id: string;
    question: string;
    options: QuizOption[];
};

export type Quiz = {
    id: string;
    slug: string;
    title: string;
    level: "basic" | "medium" | "advanced";
    questions: QuizQuestion[];
    description?: string;
};

// Static data dihapus - semua data quiz dikelola melalui admin dashboard Firebase
export const quizzes: Quiz[] = [];

export function getQuizBySlug(slug: string): Quiz | undefined {
    return quizzes.find((q) => q.slug === slug);
}
