"use client";

import { Resume, Project } from "@/app/lib/models/resume";
import ResumeSection from "./ResumeSection";
import Heading from "../Heading";
import Label from "../Label";

import { LinkIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import Markdown from "../Markdown";
import Div from "../Div";

interface ResumeProjectsProps {
    resume: Resume;
}

export default function ResumeProjects({ resume }: ResumeProjectsProps) {
    const projects = resume.projects;

    if (!projects || projects.length === 0) return null;

    return (
        <ResumeSection title="Projects">
            <div className="space-y-6">
                {projects.map((proj: Project) => (
                    <div
                        key={proj.name}
                        className="border border-[var(--border)] rounded-md p-4 bg-[var(--surface)]">
                        <Heading
                            level={4}
                            className="text-lg font-semibold text-[var(--foreground)]">
                            {proj.name}
                        </Heading>

                        {proj.description && (
                            <Div className="text-sm mt-1">
                                <Markdown content={proj.description} />
                            </Div>
                        )}

                        {proj.tags && proj.tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {proj.tags.map((tag, i) => (
                                    <Label
                                        key={i}
                                        className="text-xs px-2 py-1 rounded-full bg-[var(--primary)] text-white">
                                        {tag}
                                    </Label>
                                ))}
                            </div>
                        )}

                        <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
                            {proj.previewUrl && (
                                <a
                                    href={proj.previewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-[var(--primary)] hover:underline">
                                    <LinkIcon className="w-4 h-4" />
                                    Preview
                                </a>
                            )}
                            {proj.workSampleUrl && (
                                <a
                                    href={proj.workSampleUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-[var(--primary)] hover:underline">
                                    <DocumentArrowDownIcon className="w-4 h-4" />
                                    Work Sample
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </ResumeSection>
    );
}
