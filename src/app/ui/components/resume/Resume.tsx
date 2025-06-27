"use client";

import { User } from "@/app/lib/models/user";
import UploadResume from "./UploadResume";
import ResumeViewer from "./ResumeViewer";
import { useState } from "react";
import ResumeChat from "./ResumeChat";

interface ResumeProps {
    user?: User;
}

export default function Resume({ user }: ResumeProps) {
    const [resume, setResume] = useState(user?.resume);
    const greeting = `Hi there! I’m **Aira**, your personal AI assistant for your resume.

You can ask me anything about your resume, from **work experience** and **education** to **skills** and **projects**.  

 💡 Looking to improve your resume?  
Just ask for **suggestions**. I’m happy to offer ideas to make it stronger, clearer, or more impactful.

Let’s get started, what would you like to explore?`;

    return (
        <div className="w-full px-4 sm:px-6 py-4 sm:py-6 space-y-6">
            <div className="w-lg mx-auto">
                <UploadResume onUploadComplere={setResume} />
            </div>
            {resume && (
                <>
                    <ResumeViewer resume={resume} />
                    <ResumeChat greeting={greeting} />
                </>
            )}
        </div>
    );
}
