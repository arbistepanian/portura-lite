"use client";

import Link from "next/link";
import { cn } from "@/app/lib/utils/utils";

interface LinkButtonProps {
    href: string;
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    className?: string;
}

export default function LinkButton({
    href,
    children,
    variant = "primary",
    className,
}: LinkButtonProps) {
    const base = "inline-block px-4 py-2 rounded font-medium transition";

    const styles = {
        primary:
            "bg-[var(--primary)] text-[var(--on-primary)] hover:brightness-110",
        secondary:
            "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--muted)] hover:bg-[var(--hover-surface)]",
    };

    return (
        <Link href={href} className={cn(base, styles[variant], className)}>
            {children}
        </Link>
    );
}
