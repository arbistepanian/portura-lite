"use client";

import { cn } from "@/app/lib/utils/utils";

interface ResumeSectionProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export default function ResumeSection({
    title,
    children,
    className,
}: ResumeSectionProps) {
    return (
        <section
            className={cn(
                "w-full rounded-md bg-[var(--background-2)] p-4 sm:p-6 mb-6 shadow-sm",
                className
            )}>
            <h2 className="text-base sm:text-lg font-semibold mb-3 text-[var(--foreground)]">
                {title}
            </h2>
            <div className="space-y-3">{children}</div>
        </section>
    );
}
