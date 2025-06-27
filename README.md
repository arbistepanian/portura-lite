# 📝 Portura Lite

**Portura Lite** is a minimal full-stack AI-powered resume assistant. Users can upload a PDF or DOCX resume, have it parsed into structured data using OpenAI. They can also chat with an AI assistant about their resume content and get feedback and suggestions on how to improve it for job applications.

Built with **React**, **Next.js**, **MongoDB**, **Redis** and **OpenAI**.

---

## 🚀 Features

-   ✅ Resume upload (DOCX)
-   ✅ AI-powered resume parsing (OpenAI GPT-4.1)
-   ✅ Structured JSON output (skills, experience, education, etc.)
-   ✅ Save parsed data to MongoDB
-   ✅ AI chat assistant (ask questions about your resume)
-   ✅ Instant feedback and improvement suggestions

---

## 🖼️ Demo

🔗 [Live Preview on Vercel](https://portura-lite.vercel.app)

![Homepage Screenshot](./public/screenshot-01.png)

---

## 🌟 About Portura.ai

**[Portura.ai](https://portura.ai)** is the full-featured version of this project, designed to be the next-generation portfolio and career platform. While **Portura Lite** focuses on resume parsing and feedback, **Portura.ai** offers:

-   Interactive career portfolios
-   AI-driven career insights and trajectory planning
-   Recruiter-ready profiles
-   and more…

🚀 Built for individuals who want to **stand out**, and companies who want to **hire smarter**.

---

## 🏗️ Tech Stack

-   **Frontend**: Next.js (App Router), Tailwind CSS
-   **Backend**: API Routes (Next.js)
-   **Database**: MongoDB Atlas
-   **Auth**: NextAuth.js (Google only)
-   **AI**: OpenAI GPT-4.1
-   **DOCX Parsing**: `mammoth`
-   **Chat Persistence**: Upstash Redis

---

## 🛠️ Setup Instructions

1. **Clone the repository**

    ```bash
    git clone https://github.com/arbistepanian/portura-lite.git
    cd portura-lite
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Add Environment Variables**

    GOOGLE_CLIENT_ID=your_google_client_id  
    GOOGLE_CLIENT_SECRET=your_google_client_secret  
    AUTH_SECRET=your_random_secret  
    MONGODB_URI=your_mongodb_connection_uri  
    MONGODB_DB_NAME=your_db_name  
    OPENAI_API_KEY=your_openai_api_key  
    UPSTASH_REDIS_REST_URL=your_upstash_url  
    UPSTASH_REDIS_REST_TOKEN=your_upstash_token  
    TOKENS=250000

4. Run the App

    ```bash
    npm run dev
    ```

## 📄 License

MIT License

## 🙋‍♂️ Author

Made by @ArbiStepanian  
Inspired by the vision for [portura.ai](https://portura.ai)
