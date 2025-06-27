"use client";

import { Resume } from "@/app/lib/models/resume";
import ResumeBasicInfo from "./ResumeBasicInfo";
import ResumeSkills from "./ResumeSkills";
import ResumeExperience from "./ResumeExperience";
import ResumeEducation from "./ResumeEducation";
import ResumeProjects from "./ResumeProjects";
import ResumeCertifications from "./ResumeCertifications";
import ResumeLanguages from "./ResumeLanguages";

interface ResumeViewerProps {
    resume?: Resume;
}

export default function ResumeViewer({ resume }: ResumeViewerProps) {
    if (!resume) {
        return <div></div>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <ResumeBasicInfo resume={resume} />

            {resume.skills && resume.skills?.length > 0 && (
                <ResumeSkills resume={resume} />
            )}

            {resume.experience && resume.experience.length > 0 && (
                <ResumeExperience resume={resume} />
            )}

            {resume.education && resume.education.length > 0 && (
                <ResumeEducation resume={resume} />
            )}

            {resume.projects && resume.projects.length > 0 && (
                <ResumeProjects resume={resume} />
            )}

            {resume.certifications && resume.certifications?.length > 0 && (
                <ResumeCertifications resume={resume} />
            )}

            {resume.languages && resume.languages.length > 0 && (
                <ResumeLanguages resume={resume} />
            )}
        </div>
    );
}
