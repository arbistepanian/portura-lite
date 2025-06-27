import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#4F46E5", // Indigo 600
                    dark: "#4338CA", // Indigo 700
                    light: "#6366F1", // Indigo 500
                },
                background: "#F9FAFB", // Gray-50
                surface: "#FFFFFF", // White
                text: "#111827", // Gray-900
                muted: "#6B7280", // Gray-500
            },
        },
    },
    plugins: [],
    darkMode: "class",
};

export default config;
