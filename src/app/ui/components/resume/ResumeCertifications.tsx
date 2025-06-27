"use client";

import { Resume, Certification } from "@/app/lib/models/resume";
import ResumeSection from "./ResumeSection";
import Heading from "../Heading";
import Paragraph from "../Paragraph";

interface ResumeCertificationsProps {
    resume: Resume;
}

export default function ResumeCertifications({
    resume,
}: ResumeCertificationsProps) {
    const certifications = resume.certifications;

    if (!certifications || certifications.length === 0) return null;

    return (
        <ResumeSection title="Certifications">
            <div className="space-y-4">
                {certifications.map((cert: Certification) => (
                    <div
                        key={`${cert.name}-${cert.issuer}`}
                        className="border border-[var(--border)] bg-[var(--surface)] rounded-md p-4">
                        <Heading level={3} className="text-lg font-semibold">
                            {cert.name}
                        </Heading>

                        <Paragraph className="text-sm text-[var(--muted)]">
                            {cert.issuer && (
                                <span>Issued by {cert.issuer}</span>
                            )}
                            {cert.issueDate && (
                                <span> • {formatDate(cert.issueDate)}</span>
                            )}
                            {cert.expirationDate && (
                                <span>
                                    {" "}
                                    – Expires {formatDate(cert.expirationDate)}
                                </span>
                            )}
                        </Paragraph>

                        {cert.credentialUrl && (
                            <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--primary)] hover:underline text-sm mt-1 block break-words">
                                View Credential
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </ResumeSection>
    );
}

// Helper function to format dates nicely
function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
    });
}
