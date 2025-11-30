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
    slug: string;
    title: string;
    level: "basic" | "medium" | "advanced";
    description: string;
    relatedMaterialSlug?: string;
    questions: QuizQuestion[];
};

export const quizzes: Quiz[] = [
    {
        slug: "quiz-history",
        title: "Quiz – History of Tong-Tong",
        level: "basic",
        description: "Check your understanding of how tong-tong started and grew.",
        relatedMaterialSlug: "history-of-tong-tong",
        questions: [
            {
                id: "q1",
                question:
                    "What was the earliest main function of tong-tong / kentongan in Madura?",
                options: [
                    { id: "q1a", text: "As pure entertainment", isCorrect: false },
                    {
                        id: "q1b",
                        text: "As a warning and communication tool during ronda",
                        isCorrect: true,
                    },
                    { id: "q1c", text: "As accompaniment for modern dance", isCorrect: false },
                ],
            },
            {
                id: "q2",
                question:
                    "Which of the following best describes the development of tong-tong?",
                options: [
                    {
                        id: "q2a",
                        text: "From performance art to security tool",
                        isCorrect: false,
                    },
                    {
                        id: "q2b",
                        text: "From security tool to cultural performance",
                        isCorrect: true,
                    },
                    {
                        id: "q2c",
                        text: "From religious ritual to pop music",
                        isCorrect: false,
                    },
                ],
            },
        ],
    },
    {
        slug: "quiz-instruments",
        title: "Quiz – Tong-Tong Instruments",
        level: "basic",
        description:
            "Do you still remember the roles of each kentongan in a tong-tong group?",
        relatedMaterialSlug: "tong-tong-instruments",
        questions: [
            {
                id: "q3",
                question:
                    "Which instrument usually plays the lowest tone and holds the basic rhythm?",
                options: [
                    { id: "q3a", text: "Accent kentongan", isCorrect: false },
                    { id: "q3b", text: "Main / big kentongan", isCorrect: true },
                    { id: "q3c", text: "Cymbals", isCorrect: false },
                ],
            },
            {
                id: "q4",
                question:
                    "Why do some groups add modern instruments like drums to tong-tong?",
                options: [
                    {
                        id: "q4a",
                        text: "To completely replace traditional sounds",
                        isCorrect: false,
                    },
                    {
                        id: "q4b",
                        text: "To enrich the sound and attract young audiences",
                        isCorrect: true,
                    },
                    {
                        id: "q4c",
                        text: "Because kentongan is forbidden to use",
                        isCorrect: false
                    },
                ],
            },
        ],
    },
];

export function getQuizBySlug(slug: string): Quiz | undefined {
    return quizzes.find((q) => q.slug === slug);
}
