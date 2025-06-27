// import { PDFDocument, PDFTextField } from "pdf-lib";

// export async function readPDFFile(buffer: Buffer): Promise<string> {
//     try {
//         const pdfDoc = await PDFDocument.load(buffer);
//         const form = pdfDoc.getForm();
//         const textFields = form
//             .getFields() // Get all fields
//             .filter((field) => field.constructor.name === "PDFTextField"); // Filter for text fields

//         const extractedText: string[] = [];
//         for (const textField of textFields) {
//             if (textField.constructor.name === "PDFTextField") {
//                 // Ensure it's a text field
//                 const text = (textField as PDFTextField).getText();
//                 extractedText.push(text || "");
//             }
//         }

//         const text = extractedText.join("\n\n");
//         console.log("text from pdf: ", text);
//         return text;
//     } catch (error) {
//         console.error("Error extracting text from PDF form fields:", error);
//         throw new Error("Failed to extract text from PDF form fields");
//     }
// }
