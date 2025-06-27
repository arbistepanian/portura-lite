"use client";

import { Resume, Experience } from "@/app/lib/models/resume";
import ResumeSection from "./ResumeSection";
import Heading from "../Heading";
import Paragraph from "../Paragraph";
import Div from "../Div";
import Markdown from "../Markdown";

interface ResumeExperienceProps {
    resume: Resume;
}

export default function ResumeExperience({ resume }: ResumeExperienceProps) {
    const experiences = resume.experience;

    if (!experiences || experiences.length === 0) return null;

    return (
        <ResumeSection title="Experience">
            <div className="space-y-6">
                {experiences.map((exp: Experience) => (
                    <div
                        key={`${exp.company}-${exp.title}`}
                        className="relative border-l-2 border-[var(--border)] pl-4">
                        <div className="absolute -left-1 top-1 w-2 h-2 bg-[var(--primary)] rounded-full" />

                        <Heading level={3} className="text-md font-semibold">
                            {exp.title} at {exp.company}
                        </Heading>

                        <Paragraph className="text-sm text-[var(--muted)]">
                            {exp.startDate && `${formatDate(exp.startDate)} — `}
                            {exp.endDate
                                ? formatDate(exp.endDate)
                                : exp.startDate
                                ? "Present"
                                : ""}
                        </Paragraph>

                        {exp.description && (
                            <Div className="text-sm mt-1">
                                <Markdown content={exp.description} />
                            </Div>
                        )}
                    </div>
                ))}
            </div>
        </ResumeSection>
    );
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return isNaN(date.getTime())
        ? dateStr
        : date.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
          });
}
