"use client";

import { Resume, UserLanguage } from "@/app/lib/models/resume";
import ResumeSection from "./ResumeSection";
import Heading from "../Heading";
import Paragraph from "../Paragraph";
import { getCountryCodeFromLanguage } from "@/app/lib/utils/utils";
import Image from "next/image";

interface ResumeLanguagesProps {
    resume: Resume;
}

export default function ResumeLanguages({ resume }: ResumeLanguagesProps) {
    const languages = resume.languages;

    if (!languages || languages.length === 0) return null;

    return (
        <ResumeSection title="Languages">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {languages.map((lang: UserLanguage) => (
                    <li
                        key={lang.id}
                        className="bg-[var(--surface)] border border-[var(--border)] rounded-md p-4">
                        <Heading
                            level={4}
                            className="font-medium text-base flex gap-2 justify-start items-center">
                            {lang.code && (
                                <Image
                                    src={`/flags/1x1/${getCountryCodeFromLanguage(
                                        lang.code.toLowerCase()
                                    )}.svg`}
                                    width={100}
                                    height={100}
                                    alt={lang.name}
                                    className="w-4 h-4 rounded-full"
                                />
                            )}

                            {lang.name}
                        </Heading>
                        <Paragraph className="text-sm text-[var(--muted)]">
                            Proficiency: {lang.level}
                        </Paragraph>
                    </li>
                ))}
            </ul>
        </ResumeSection>
    );
}
