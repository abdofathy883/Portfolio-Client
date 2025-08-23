export interface Project {
    Id: number;
    Title: string;
    Description: string;
    Images: ProjectImage[];
    Video: string;
    Technologies: string[];
    Client: string;
    Problem: string;
    Solution: string;
    LiveUrl: string;
    DemoUrl: string;
    IsFeatured: boolean;
}

export interface ProjectImage {
    Id: number;
    Url: string;
    AltTexr: string;
    IsFeatured: boolean;
    ProjectId: number;
}
