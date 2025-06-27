"use client";

import { Resume, Education } from "@/app/lib/models/resume";
import ResumeSection from "./ResumeSection";
import Heading from "../Heading";
import Paragraph from "../Paragraph";

interface ResumeEducationProps {
    resume: Resume;
}

export default function ResumeEducation({ resume }: ResumeEducationProps) {
    const educationList = resume.education;

    if (!educationList || educationList.length === 0) return null;

    return (
        <ResumeSection title="Education">
            <div className="space-y-6">
                {educationList.map((edu: Education) => (
                    <div
                        key={`${edu.institution}-${edu.degree}`}
                        className="border-l-2 border-[var(--border)] pl-4 relative">
                        <div className="absolute -left-1 top-1 w-2 h-2 bg-[var(--primary)] rounded-full" />

                        <Heading level={3} className="text-md font-semibold">
                            {edu.degree} at {edu.institution}
                        </Heading>

                        <Paragraph className="text-sm text-[var(--muted)]">
                            {edu.startDate && `${formatDate(edu.startDate)} — `}
                            {edu.endDate
                                ? formatDate(edu.endDate)
                                : edu.startDate
                                ? "Present"
                                : ""}
                        </Paragraph>

                        {edu.fieldOfStudy && (
                            <Paragraph className="text-sm mt-1">
                                Field of Study: {edu.fieldOfStudy}
                            </Paragraph>
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
