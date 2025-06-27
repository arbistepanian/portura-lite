import { HTMLAttributes } from "react";
import { cn } from "@/app/lib/utils/utils";

interface ParagraphProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "muted" | "subtle";
}

export default function Div({
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
        <div
            className={cn("leading-relaxed", variants[variant], className)}
            {...props}>
            {children}
        </div>
    );
}
