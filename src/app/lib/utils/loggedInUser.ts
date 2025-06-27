import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { cache } from "react";
import { getUserByEmail } from "../db/users";

export const getLoggedInUser = cache(async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) return null;

    const user = await getUserByEmail(session.user.email);
    return user;
});
