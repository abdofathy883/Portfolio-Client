import { IProjectTranslation } from "./iproject-translation";

export interface IProject {
    id: number;
    slug: string;
    publishedAt: Date;
    imageLink: string;
    videoLink: string;
    liveUrl: string;
    demoUrl: string;
    technologies: string[];
    translations: IProjectTranslation[];
}

export enum Language {
    ar = 0,
    en = 1
}
