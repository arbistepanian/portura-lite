"use client";

import { useState, useEffect, useRef } from "react";
import Button from "../Button";
import TextInput from "../TextInput";
import Div from "../Div";
import Markdown from "../Markdown";
import Image from "next/image";
import {
    ArrowDownIcon,
    ChatBubbleBottomCenterTextIcon,
    PaperAirplaneIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";

export default function ResumeChat({ greeting }: { greeting: string }) {
    const [messages, setMessages] = useState<
        { role: string; content: string }[]
    >([]);
    const [input, setInput] = useState("");
    const [minimized, setMinimized] = useState(false);
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    useEffect(() => {
        const loadHistory = async () => {
            const res = await fetch("/api/resume-chat/");
            console.log(res);
            const data = await res.json();

            if (data.history && data.history.length > 0) {
                setMessages(data.history);
            } else {
                // Show Mira's friendly intro
                setMessages([
                    {
                        role: "assistant",
                        content: greeting,
                    },
                ]);
            }
        };

        loadHistory();
    }, [greeting]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { role: "user", content: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        const res = await fetch("/api/resume-chat/", {
            method: "POST",
            body: JSON.stringify({ message: input }),
        });
        const data = await res.json();

        setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.reply },
        ]);
        setLoading(false);
    };

    if (minimized) {
        return (
            <div className="fixed bottom-4 right-4">
                <Button
                    variant="secondary"
                    className="py-3"
                    onClick={() => setMinimized(false)}>
                    <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
                </Button>
            </div>
        );
    }

    return (
        <Div className="fixed bottom-4 right-4 w-96 md:w-130 flex flex-col overflow-hidden gap-2 shadow-md border bg-[var(--background)] border-gray-300 p-4 rounded-md">
            <Div className="flex justify-between items-center p-2 bg-[var(--background-2)] rounded-md">
                <Div className="font-semibold flex items-center justify-start gap-4 mt-0">
                    <Image
                        src="/aira/avatar.jpg"
                        width="100"
                        height="100"
                        alt="Aira's avatar"
                        className="w-10 h-10 rounded-full"
                    />
                    <span>Ask me anything about your resume</span>
                </Div>
                <Button
                    variant="secondary"
                    className="text-center pl-2 pr-2"
                    onClick={() => setMinimized(true)}>
                    <ArrowDownIcon className="w-6 h-6" />
                </Button>
            </Div>
            <div className="pr-2 overflow-y-auto h-64 md:h-100 text-sm">
                {messages.map((msg, i) => (
                    <div key={i}>
                        {msg.content && (
                            <div
                                className={`flex mb-2 ${
                                    msg.role === "user"
                                        ? "justify-end text-right"
                                        : "justify-start"
                                }`}>
                                <Div className="w-auto max-w-11/12 py-2 px-2 flex items-start gap-3 bg-[var(--background-2)] rounded-lg">
                                    {msg.role === "assistant" ? (
                                        msg.content && (
                                            <>
                                                <div className="flex-shrink-0">
                                                    <Image
                                                        src="/aira/avatar.jpg"
                                                        width={24}
                                                        height={24}
                                                        alt="Aira's avatar"
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                </div>
                                                <div className="prose max-w-[calc(100%-40px)]">
                                                    <Markdown
                                                        content={msg.content}
                                                    />
                                                </div>
                                            </>
                                        )
                                    ) : (
                                        <div>{msg.content}</div>
                                    )}
                                </Div>
                            </div>
                        )}
                    </div>
                ))}
                {loading && (
                    <Div className="flex items-center gap-2 px-2 py-1 text-sm font-medium absolute bottom-19 bg-[var(--background)]">
                        <SparklesIcon className="w-6 h-6" />
                        <span>Aira is typing</span>
                        <div className="flex gap-1">
                            <span className="dot dot-1">.</span>
                            <span className="dot dot-2">.</span>
                            <span className="dot dot-3">.</span>
                        </div>
                    </Div>
                )}
                <div ref={bottomRef} />
            </div>
            <div className="flex gap-2">
                <TextInput
                    type="text"
                    value={input}
                    className="w-full"
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button
                    variant="primary"
                    className="flex gap-2 justify-between items-center"
                    onClick={sendMessage}>
                    <PaperAirplaneIcon className="w-6 h-6" /> Send
                </Button>
            </div>
        </Div>
    );
}
