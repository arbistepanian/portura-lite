import { getDocument } from "pdfjs-dist";
import type { TextItem } from "pdfjs-dist/types/src/display/api";

export async function readPDFFile(buffer: Buffer): Promise<string> {
    const pdf = await getDocument({ data: buffer }).promise;
    const textContent: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
            .filter((item): item is TextItem => "str" in item)
            .map((item) => item.str)
            .join(" ");
        textContent.push(pageText);
    }

    return textContent.join("\n\n");
}
