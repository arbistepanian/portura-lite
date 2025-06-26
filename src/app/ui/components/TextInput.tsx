"use client";

import { InputHTMLAttributes } from "react";
import { cn } from "@/app/lib/utils";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function TextInput({
    label,
    id,
    className,
    ...props
}: TextInputProps) {
    return (
        <div className="mb-4">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-[var(--foreground)] mb-1">
                    {label}
                </label>
            )}
            <input
                id={id}
                {...props}
                className={cn(
                    "w-full px-4 py-2 rounded border focus:outline-none focus:ring-2",
                    "bg-[var(--background)] text-[var(--foreground)] placeholder-muted border-[var(--muted)] focus:ring-primary",
                    className
                )}
            />
        </div>
    );
}
