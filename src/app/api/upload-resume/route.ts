import { NextRequest, NextResponse } from "next/server";
import { parseResume } from "@/app/lib/utils/parseResume";
import { analyzeResume } from "@/app/lib/utils/analyzeResume";
import { getLoggedInUser } from "@/app/lib/utils/loggedInUser";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    const user = await getLoggedInUser();

    if (!user) {
        return NextResponse.json(
            { error: "Unauthorized", errorCode: "UNAUTHORIZED" },
            { status: 401 }
        );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json(
            { error: "No file uploaded", errorCode: "NO_FILE_UPLOADED" },
            { status: 400 }
        );
    }

    if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
            {
                error: "File is too large (max 5MB)",
                errorCode: "FILE_TOO_LARGE",
            },
            { status: 400 }
        );
    }

    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith(".pdf") && !fileName.endsWith(".docx")) {
        return NextResponse.json(
            {
                error: "Only PDF and DOCX files are supported",
                errorCode: "INVALID_FORMAT",
            },
            { status: 400 }
        );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (user.tokens <= 0)
        return NextResponse.json(
            {
                error: "You’ve run out of tokens. Please purchase tokens to continue.",
                errorCode: "OUT_OF_TOKENS",
            },
            { status: 402 }
        );

    try {
        const rawText = await parseResume(buffer, fileName);
        const resume = await analyzeResume(rawText, user.email);

        return NextResponse.json({ success: true, resume }, { status: 200 });
    } catch (err: unknown) {
        console.error("Error uploading/parsing resume:", err);

        if (
            err instanceof Error &&
            err.message?.includes("Invalid resume file")
        ) {
            return NextResponse.json(
                {
                    error: "The uploaded file does not appear to be a valid resume.",
                    errorCode: "INVALID_RESUME",
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                error: "Failed to process resume",
                errorCode: "RESUME_PROCESSING_FAILED",
            },
            { status: 500 }
        );
    }
}
