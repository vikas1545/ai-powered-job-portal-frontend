

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
    skillsToLearn:SkillsCategory[],
    learningApproach:LearningApproach
}