import { Language } from "./i-project";

export interface IProjectTranslation {
    id: number;
    projectId: number;
    title: string;
    description: string;
    language: Language;
    client: string;
    problem: string;
    solution: string;
    imageAltText: string;
    videoAltText: string;
}