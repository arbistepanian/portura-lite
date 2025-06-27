"use client";

import { Resume } from "@/app/lib/models/resume";
import ResumeSection from "./ResumeSection";
import Heading from "../Heading";
import Paragraph from "../Paragraph";
import Label from "../Label";
import Div from "../Div";
import Markdown from "../Markdown";
import Image from "next/image";

import {
    EnvelopeIcon,
    PhoneIcon,
    GlobeAltIcon,
} from "@heroicons/react/24/outline";

interface ResumeBasicInfoProps {
    resume: Resume;
}

export default function ResumeBasicInfo({ resume }: ResumeBasicInfoProps) {
    const {
        name,
        email,
        tagline,
        title,
        phoneNumber,
        bio,
        websites,
        location,
    } = resume;

    return (
        <ResumeSection title={name || "Basic Info"}>
            <div className="space-y-3 text-[var(--foreground)]">
                {tagline && (
                    <Heading level={3} className="text-lg font-semibold">
                        {tagline}
                    </Heading>
                )}

                {title && (
                    <Paragraph className="text-sm text-[var(--muted)]">
                        {title}
                    </Paragraph>
                )}

                {bio && (
                    <Div className="text-sm mt-1">
                        <Markdown content={bio} />
                    </Div>
                )}

                {location && (
                    <Paragraph className="flex items-center justify-start gap-2">
                        {location.countryCode && location.countryCode && (
                            <Image
                                src={`/flags/1x1/${location.countryCode.toLowerCase()}.svg`}
                                width={100}
                                height={100}
                                alt={location.country}
                                className="w-4 h-4 rounded-full"
                            />
                        )}
                        <span>
                            {location.city} {location.state} {location.country}
                        </span>
                    </Paragraph>
                )}

                {phoneNumber && (
                    <Paragraph className="text-sm flex items-center justify-start gap-2">
                        <PhoneIcon className="w-4 h-4" /> {phoneNumber}
                    </Paragraph>
                )}

                {email && (
                    <Paragraph className="flex items-center justify-start gap-2">
                        <EnvelopeIcon className="w-4 h-4" /> {email}
                    </Paragraph>
                )}

                {websites && websites.length > 0 && (
                    <div className="pt-2 space-y-1">
                        <Label className="flex items-center justify-start gap-2">
                            <GlobeAltIcon className="w-4 h-4" /> Websites
                        </Label>
                        <ul className="list-disc list-inside text-sm space-y-1">
                            {websites.map((site, idx) => (
                                <li key={idx}>
                                    <a
                                        href={site.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline hover:opacity-80 text-[var(--primary)] break-words">
                                        {site.title || site.url}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </ResumeSection>
    );
}
