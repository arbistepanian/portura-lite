"use client";

import { signIn } from "next-auth/react";
import Button from "../ui/components/Button";
import Heading from "../ui/components/Heading";
import Paragraph from "../ui/components/Paragraph";
import Image from "next/image";

export default function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-background text-text">
            <div className="text-center space-y-6">
                <Heading level={1}>Login to Portura Lite</Heading>
                <Paragraph>Use your Google account to get started</Paragraph>
                <Button
                    variant="secondary"
                    onClick={() =>
                        signIn("google", { callbackUrl: "/dashboard" })
                    }>
                    <div className="flex items-center justify-center space-x-2">
                        <div>Sign in with Google</div>
                        <Image
                            loading="lazy"
                            height={24}
                            width={24}
                            alt="Google"
                            className="w-6 h-6"
                            src="https://authjs.dev/img/providers/google.svg"
                        />
                    </div>
                </Button>
            </div>
        </main>
    );
}
