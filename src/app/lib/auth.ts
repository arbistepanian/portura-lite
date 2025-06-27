import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import { getDb } from "./db/db";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
        signOut: "/",
    },
    callbacks: {
        async signIn({ user }) {
            const db = await getDb();
            const users = db.collection("users");

            const existingUser = await users.findOne({ email: user.email });
            console.log("✅ signIn callback hit for:", user.email);

            if (!existingUser) {
                await users.insertOne({
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    tokens: 1000000,
                    createdAt: new Date(),
                });
            }

            return true;
        },
    },
};
