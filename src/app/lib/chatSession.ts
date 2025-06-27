import { redis } from "./redis";

export type ChatMessage = {
    role: "system" | "user" | "assistant";
    content: string;
};

export async function getHistory(email: string): Promise<ChatMessage[]> {
    const key = getChatCacheKey(email);
    const data = await redis.get<ChatMessage[]>(key);

    //console.log(data);
    return data ? data : [];
}

export async function appendMessage(
    email: string,
    message: ChatMessage
): Promise<void> {
    const key = getChatCacheKey(email);
    const history = await getHistory(email);
    history.push(message);
    await redis.set(key, JSON.stringify(history));
}

export async function resetHistory(email: string): Promise<void> {
    await redis.del(getChatCacheKey(email));
}

function getChatCacheKey(email: string): string {
    const cacheKey = `resume:${email}`;
    return cacheKey;
}
