export type ContentSection = {
    subJudul: string;
    informasi: string;
};

export type ExploreTopic = {
    id: string;
    title: string;
    imageUrl: string;
    sections: ContentSection[];
    referensi: string;
};

// Sample data - will be replaced by Firebase data in production
export const exploreTopics: ExploreTopic[] = [];

export function getTopicById(id: string): ExploreTopic | undefined {
    return exploreTopics.find(t => t.id === id);
}
