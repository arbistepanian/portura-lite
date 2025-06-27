"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/app/lib/utils/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}

export default function Button({
    variant = "primary",
    className,
    ...props
}: ButtonProps) {
    const base = "px-4 py-2 rounded font-medium transition cursor-pointer";

    const styles = {
        primary:
            "bg-[var(--primary)] text-[var(--on-primary)] hover:brightness-110",
        secondary:
            "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--muted)] hover:bg-[var(--hover-surface)]",
    };

    return (
        <button {...props} className={cn(base, styles[variant], className)} />
    );
}
