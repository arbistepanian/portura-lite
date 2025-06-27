"use client";

import { User } from "@/app/lib/models/user";
import UploadResume from "./UploadResume";
import ResumeViewer from "./ResumeViewer";
import { useState } from "react";

interface ResumeProps {
    user?: User;
}

export default function Resume({ user }: ResumeProps) {
    const [resume, setResume] = useState(user?.resume);

    return (
        <div className="w-full px-4 sm:px-6 py-4 sm:py-6 space-y-6">
            <div className="w-lg mx-auto">
                <UploadResume onUploadComplere={setResume} />
            </div>
            {resume && <ResumeViewer resume={resume} />}
        </div>
    );
}
