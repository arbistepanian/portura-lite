// import { readPDFFile } from "./readPDFFile";
import { readDocxFile } from "./readDocxFile";

export async function parseResume(
    buffer: Buffer,
    fileName: string
): Promise<string> {
    const lower = fileName.toLowerCase();

    // if (lower.endsWith(".pdf")) {
    //     const result = await readPDFFile(buffer);
    //     return result.trim();
    // }

    if (lower.endsWith(".docx")) {
        return await readDocxFile(buffer);
    }

    throw new Error("Unsupported file format. Only .docx are allowed.");
}
