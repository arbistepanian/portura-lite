import { HTMLAttributes } from "react";
import { cn } from "@/app/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4;

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    level?: HeadingLevel;
    className?: string;
    children: React.ReactNode;
}

const baseStyles = "text-[var(--foreground)] font-bold tracking-tight";

const levelClasses: Record<HeadingLevel, string> = {
    1: "text-4xl sm:text-5xl",
    2: "text-3xl sm:text-4xl",
    3: "text-2xl sm:text-3xl",
    4: "text-xl sm:text-2xl",
};

export default function Heading({
    level = 1,
    className,
    children,
    ...props
}: HeadingProps) {
    const Tag: React.ElementType = `h${level}`;

    return (
        <Tag
            className={cn([baseStyles, levelClasses[level], className, "mb-4"])}
            {...props}>
            {children}
        </Tag>
    );
}
