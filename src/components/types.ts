

export interface JobOptions {
    title: string,
    responsibilities: string,
    why: string
}

export interface SkillsToLearn {
    title: string,
    why: string,
    how: string,
}

export interface SkillsCategory {
    category: string,
    skills: string,
}

export interface LearningApproach {
    title: string,
    points: string[],
}

export interface CareerGuideResponse {
    summary: string,
    jobOptions: JobOptions[],
    skillsToLearn: SkillsCategory[],
    learningApproach: LearningApproach
}

export interface ScoreBreakdown {
    formating: { score: number, feedback: string },
    keywords: { score: number, feedback: string },
    structure: { score: number, feedback: string },
    readability: { score: number, feedback: string },
}

export interface Suggestion {
    category: string,
    issue: string,
    recommendation: string,
    priority: 'high' | 'medium' | 'low'
}

export interface ResumeAnalysisResponse {
    atsScore: number;
    scoreBreakdown: ScoreBreakdown;
    suggestions: Suggestion[];
    strengths: string[];
    summary: string
}