"use client";

import { signOut } from "next-auth/react";
import Button from "../ui/components/Button";
import Heading from "../ui/components/Heading";

export default function DashboardPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center">
            <Heading>Welcome to your dashboard</Heading>
            <Button onClick={() => signOut({ callbackUrl: "/" })}>
                Sign Out
            </Button>
        </main>
    );
}
