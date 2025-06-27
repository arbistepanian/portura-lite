"use client";

import { Resume } from "@/app/lib/models/resume";
import ResumeSection from "./ResumeSection";

interface ResumeSkillsProps {
    resume: Resume;
}

export default function ResumeSkills({ resume }: ResumeSkillsProps) {
    if (!resume.skills || resume.skills.length === 0) return null;

    return (
        <ResumeSection title="Skills">
            <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill, idx) => (
                    <span
                        key={idx}
                        className="text-xs sm:text-sm px-3 py-1 rounded-full bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)]">
                        {skill}
                    </span>
                ))}
            </div>
        </ResumeSection>
    );
}
