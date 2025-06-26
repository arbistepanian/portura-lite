import { HTMLAttributes } from "react";
import { cn } from "@/app/lib/utils";

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
    variant?: "default" | "muted" | "subtle";
}

export default function Paragraph({
    children,
    className,
    variant = "default",
    ...props
}: ParagraphProps) {
    const variants = {
        default: "text-[var(--foreground)]",
        muted: "text-[var(--muted)]",
        subtle: "text-sm text-[var(--muted)]",
    };

    return (
        <p
            className={cn("leading-relaxed", variants[variant], className)}
            {...props}>
            {children}
        </p>
    );
}
