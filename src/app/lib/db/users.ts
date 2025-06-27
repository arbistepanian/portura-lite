import { Resume } from "../models/resume";
import { User } from "../models/user";
import { getDb } from "./db";

export async function updateUserResume(
    email: string,
    resume: Resume
): Promise<User | null> {
    const db = await getDb();
    const users = db.collection<User>("users");

    const result = await users.findOneAndUpdate(
        { email },
        { $set: { resume } },
        { returnDocument: "after" }
    );

    return result;
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const db = await getDb();
    return db.collection<User>("users").findOne({ email });
}

export async function updateUserTokens(
    email: string,
    tokens: number
): Promise<User | null> {
    const db = await getDb();
    const users = db.collection<User>("users");

    const result = await users.findOneAndUpdate(
        { email },
        { $inc: { tokens: -Math.abs(tokens) } },
        { returnDocument: "after" }
    );

    return result;
}
