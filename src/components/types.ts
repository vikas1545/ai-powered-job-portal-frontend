import type { ReactNode } from "react";
import type React from "react";


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

export interface User {
    user_id: number;
    name: string;
    email: string;
    phone_number: string;
    role: "jobseeker" | "recruiter";
    bio: string | null;
    resume: string | null;
    resume_public_id: string | null;
    profile_pic: string | null;
    profile_pic_public_id: string | null;
    skills: string[];
    subscription: string | null;
}

export interface AppContextType {
    user: User | null;
    loading: boolean;
    btnLoading: boolean;
    isAuth: boolean;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    logOut: () => Promise<void>
}

export interface AppProviderProps {
    children: ReactNode;
}