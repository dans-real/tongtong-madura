export type ExploreTopic = {
    id: string;
    title: string;
    imageUrl: string;
    informasi: string;      // main content
    referensi: string;      // references/sources
};

// Sample data - will be replaced by Firebase data in production
export const exploreTopics: ExploreTopic[] = [];

export function getTopicById(id: string): ExploreTopic | undefined {
    return exploreTopics.find(t => t.id === id);
}
