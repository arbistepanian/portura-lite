import * as mammoth from "mammoth";

export async function readDocxFile(buffer: Buffer): Promise<string> {
    const result = await mammoth.extractRawText({ buffer });
    return result.value.trim();
}
