import OpenAI from "openai";
import { Resume } from "@/app/lib/models/resume";
import { updateUserResume, updateUserTokens } from "../db/users";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeResume(
    rawText: string,
    userEmail: string
): Promise<Resume> {
    const prompt = `You are a strict resume parser. Your job is to extract structured JSON from the resume text **without adding or hallucinating information**.

If the input is **not a resume**, or is too vague, short, or irrelevant to extract anything useful, return:

\`\`\`json
{ "error": "Not a valid resume" }
\`\`\`

Otherwise, extract only what is **explicitly present** in the text, except for:

- Country and language codes: You may infer these.
- Dates: You may standardize them to ISO if they are present.

Descriptions must retain the original wording and be formatted in **markdown syntax** (e.g., bullet points, bold text, etc.).

Only include LinkedIn or personal portfolio URLs in \`websites\`. Discard all others.

Return a single valid JSON object using this schema:

{
  "name": string,
  "email": string (optional),
  "phoneNumber": string (optional),
  "websites": Website[] (optional),
  "languages": UserLanguage[] (optional),
  "tagline": string (optional),
  "title": string (optional),
  "bio": string (optional),
  "location": {
    "country": string,
    "countryCode": string,
    "state": string,
    "city": string
  } (optional),
  "skills": string[] (optional),
  "experience": Experience[] (optional),
  "education": Education[] (optional),
  "projects": Project[] (optional),
  "certifications": Certification[] (optional)
}

Types:
- Experience = { company, title, startDate?, endDate?, description? (in markdown) }
- Education = { institution, degree?, fieldOfStudy?, startDate?, endDate?, description? (in markdown) }
- Certification = { name, issuer?, issueDate?, expirationDate?, credentialUrl? }
- Project = { name, projectType?, description? (in markdown), tags?, workSampleUrl?, previewUrl? }
- Website = { url, title } — must be LinkedIn or personal portfolio only
- UserLanguage = { code, name, level }

⚠️ Rules:
- Do NOT invent or rephrase descriptions.
- Do NOT generate content that isn’t in the resume.
- Do NOT include unrelated URLs.
- Do NOT add explanatory text outside the JSON block.

Resume Text:
\`\`\`
${rawText}
\`\`\`
`;

    const response = await openai.chat.completions.create({
        model: "gpt-4.1",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
    });

    const rawOutput = response.choices[0]?.message?.content;

    //console.log("OpenAI response:", rawOutput);

    if (!rawOutput) throw new Error("No response from OpenAI");

    const cleanJson = rawOutput
        .replace(/^```json\s*/i, "")
        .replace(/```$/, "")
        .trim();

    const parsed = JSON.parse(cleanJson);

    const totalTokens = response.usage?.total_tokens || 0;
    await updateUserTokens(userEmail, totalTokens);

    if (parsed.error) {
        console.warn("Resume parsing failed:", parsed.error);
        throw new Error("Invalid resume file. Please upload a valid resume.");
    }

    const resume = parsed as Resume;

    await updateUserResume(userEmail, resume);
    return resume;
}
