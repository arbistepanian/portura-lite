"use client";

import { useRef, useState, useTransition } from "react";
import Button from "../Button";
import { Resume } from "@/app/lib/models/resume";
import Paragraph from "../Paragraph";

type UploadResumeProps = {
    onUploadComplere?: (resume: Resume) => void;
};

export default function UploadResume({ onUploadComplere }: UploadResumeProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        startTransition(async () => {
            setError(null);

            try {
                const formData = new FormData();
                formData.append("file", file);

                const res = await fetch("/api/upload-resume", {
                    method: "POST",
                    body: formData,
                });

                const result = await res.json();
                if (!res.ok) throw new Error(result.error || "Upload failed");

                onUploadComplere?.(result.resume);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Upload failed");
            } finally {
                e.target.value = ""; // reset input
            }
        });
    };

    return (
        <div className="w-full flex flex-col items-center justify-between gap-4 bg-[var(--background-2)] p-4 rounded-lg">
            <div className="w-full flex flex-col items-center justify-center sm:flex-row sm:justify-between gap-4">
                <div className="w-40">
                    <input
                        type="file"
                        accept=".docx"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <Button onClick={handleUploadClick} disabled={isPending}>
                        Upload Resume
                    </Button>
                </div>

                <Paragraph className="flex items-center justify-center sm:justify-end gap-2">
                    {isPending ? (
                        <>
                            <span className="loader w-4 h-4 border-2 border-t-transparent border-[var(--foreground)] rounded-full animate-spin" />
                            <span>Analyzing your resume...</span>
                        </>
                    ) : (
                        <span>Upload your resume in .docx format</span>
                    )}
                </Paragraph>
            </div>
            {error && (
                <p className="mt-2 text-red-500 text-sm w-full">{error}</p>
            )}
        </div>
    );
}
