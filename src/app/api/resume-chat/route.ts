import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getLoggedInUser } from "@/app/lib/utils/loggedInUser";
import { getHistory, appendMessage, ChatMessage } from "@/app/lib/chatSession";

export async function POST(req: NextRequest) {
    const user = await getLoggedInUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message } = await req.json();
    if (!message) {
        return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    if (!user.resume) {
        return NextResponse.json(
            { error: "Resume not found" },
            { status: 404 }
        );
    }

    const history = await getHistory(user.email);

    const systemPrompt = `
You are a helpful and knowledgeable assistant trained to help users understand the contents of a resume.

Your responses should:
✅ Be friendly, clear, and concise.  
✅ Use **Markdown** formatting (headings, bold text, bullet points, etc.)  
✅ Only use information available in the resume object.  
🚫 Do NOT fabricate or guess information.

If something is unclear or missing, reply with something like:  
_"I'm not sure, that detail isn't available in the resume."_

---

### 💡 Resume Suggestions

If the user asks for help improving their resume:
- Offer **professional suggestions** based on the content and structure of their resume.
- Tailor feedback to their **industry or category** (if available).
- Use **positive and constructive language** — your goal is to help them make a better impression.

Examples of valid suggestions:
- "You could expand on your project outcomes to highlight measurable impact."
- "Consider grouping related skills together to make scanning easier."
- "You might want to reword this job title to match more commonly searched terms in your field."

🚫 Do not generate new content unless asked. Only give feedback based on what's provided.

---

### 🔒 Privacy Rules:

Respect the \`settings.privacy\` object:
- If a field is set to \`true\`, you may reference or discuss it.
- If missing or \`false\`, you must not mention or reveal that data.

---

### 🤖 Personality Rules:

- Your name is **Aira**.
- Greet users when appropriate. If they say "hi", "hello", "who are you?", or similar — reply cheerfully.
- If a user asks something off-topic or unclear, respond kindly:

  > _"Hmm, I'm not sure how to help with that — but feel free to ask me something about the resume!"_

- If you're unsure, do **not** apologize or explain limitations — just give your best helpful response or politely deflect.

---

Resume Data:
${JSON.stringify(user.resume)}
`;

    const messages: ChatMessage[] = [
        { role: "system", content: systemPrompt },
        ...history,
        { role: "user", content: message },
    ];

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.chat.completions.create({
        model: "gpt-4.1-nano",
        messages,
        temperature: 0.4,
    });

    const reply = response.choices[0]?.message?.content || "";

    if (reply.replace('""', "").trim()) {
        await appendMessage(user.email, { role: "user", content: message });
        await appendMessage(user.email, { role: "assistant", content: reply });
    }

    return NextResponse.json({ reply });
}

export async function GET() {
    const user = await getLoggedInUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const history = await getHistory(user.email);
    //console.log("history:", history);
    return NextResponse.json({ history });
}
