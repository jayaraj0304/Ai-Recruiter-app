import { QUESTION_PROMPT } from '@/services/Constants';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { jobPosition, jobDescription, duration, type } = await req.json();
    const FINAL_PROMPT = QUESTION_PROMPT
        .replace("{{jobTitle}}", jobPosition)
        .replace("{jobDescription}", jobDescription)
        .replace("{duration}", duration)
        .replace("{type}", type);

    try {
        const body = {
            contents: [
                {
                    role: "user",
                    parts: [{ text: FINAL_PROMPT }],
                },
            ],
        };

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error?.message || "Gemini API error");
        }

        const content = result.candidates?.[0]?.content?.parts?.[0]?.text || "";

        return NextResponse.json({ content });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}