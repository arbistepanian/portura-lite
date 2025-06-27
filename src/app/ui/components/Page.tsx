"use client";

import { cn } from "@/app/lib/utils/utils";
import Header from "./Header";

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    className?: string;
    userName?: string;
    userImage?: string;
    children: React.ReactNode;
}

export default function Page({
    title,
    children,
    className,
    userName,
    userImage,
    ...props
}: PageProps) {
    return (
        <div
            className={cn(
                "flex flex-col min-h-screen pt-16 items-center justify-start bg-[var(--background)] text-[var(--foreground)]",
                className
            )}
            {...props}>
            <Header userName={userName} userImage={userImage} title={title} />

            <div className="w-full max-w-4xl px-4">
                <div className="bg-[var(--background)] text-[var(--foreground)]">
                    {children}
                </div>
            </div>
        </div>
    );
}
