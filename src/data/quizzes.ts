export type Quiz = {
    id: string;
    slug: string;
    title: string;
    questionCount: number;  // computed from questions.length
    questions: Question[];
};

export type QuizOption = {
    id: string;
    text: string;
    isCorrect: boolean;
};

export type Question = {
    id: string;
    question: string;
    options: QuizOption[];
};

// Sample static quizzes (will be replaced by Firebase data)
export const quizzes: Quiz[] = [];

export function getQuizBySlug(slug: string): Quiz | undefined {
    return quizzes.find((q) => q.slug === slug);
}
