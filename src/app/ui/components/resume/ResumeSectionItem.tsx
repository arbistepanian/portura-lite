"use client";

import { cn } from "@/app/lib/utils/utils";

interface ResumeSectionItemProps {
    label?: string;
    value: string;
    className?: string;
}

export default function ResumeSectionItem({
    label,
    value,
    className,
}: ResumeSectionItemProps) {
    return (
        <div
            className={cn(
                "text-sm sm:text-base text-[var(--foreground)]",
                className
            )}>
            {label ? (
                <span>
                    <span className="font-medium">{label}: </span>
                    {value}
                </span>
            ) : (
                <span>{value}</span>
            )}
        </div>
    );
}
