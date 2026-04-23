export interface Project {
    id: number;
    title: string;
    description: string;
    link: string;
    category?: string;
    image?: string;
    techStack?: string[];
}
