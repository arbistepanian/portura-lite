import OpenAI from "openai";
import { Resume } from "@/app/lib/models/resume"; // make sure the types are exported here
import { updateUserResume, updateUserTokens } from "../db/users";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeResume(
    rawText: string,
    userEmail: string
): Promise<Resume> {
    const prompt = `You are a strict resume parser. Your job is to extract structured JSON from the resume text **without adding or hallucinating information**. Only extract what is explicitly present in the resume text, except for:

- Country and language codes: You may infer these.
- Dates: You may standardize them to ISO if they are present.

Descriptions must retain the original wording from the resume and be formatted using **markdown syntax**, including:
- Bullet points
- Bold or italic text
- Headings (if any)
- Links (if present)
Do not rewrite or enhance descriptions. Just structure them.

Include only LinkedIn or personal portfolio links in \`websites\`. Discard all other URLs.

Return a single, valid JSON object with the following structure:

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
- Experience = { id, company, title, startDate, endDate?, description? (in markdown) }
- Education = { id, institution, degree, fieldOfStudy?, startDate, endDate?, description? (in markdown) }
- Certification = { id, name, issuer?, issueDate?, expirationDate?, credentialUrl? }
- Project = { id, name, projectType?, description? (in markdown), tags?, workSampleUrl?, previewUrl? }
- Website = { url, title } — must be LinkedIn or personal portfolio only
- UserLanguage = { id, code, name, level }

⚠️ Rules:
- Do **not** invent or rephrase descriptions.
- Do **not** generate text not explicitly found in the resume.
- Do **not** include unrelated URLs in websites.
- Do **not** include explanatory text before or after the JSON.

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

    const json = response.choices[0]?.message?.content;
    console.log("OpenAI response:", json);

    if (!json) throw new Error("Failed to get response from OpenAI");

    const cleanJson = json
        .replace(/^```json\s*/i, "")
        .replace(/```$/, "")
        .trim();

    const totalTokens = response.usage?.total_tokens || 0;
    updateUserTokens(userEmail, totalTokens);

    const resume = JSON.parse(cleanJson) as Resume;

    updateUserResume(userEmail, resume);

    try {
        return resume;
    } catch (err) {
        console.error("Failed to parse OpenAI response:", err);
        throw new Error("Could not parse structured resume JSON");
    }
}
