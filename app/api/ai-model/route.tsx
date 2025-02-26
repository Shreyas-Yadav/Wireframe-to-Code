import { db } from "@/configs/db";
import Constants from "@/data/Constants";
import { Church } from "lucide-react";
import { NextRequest } from "next/server";
import OpenAI from "openai"

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_AI_API_KEY,
})


export async function POST(req: NextRequest) {
    console.log("POST /api/ai-model/");
    try {
        const {model,desc,imageUrl} = await req.json();
        console.log("Request body:", {model,desc,imageUrl});

        const ModelObject = Constants.AiModelList.find((item) => item.name == model);
        const modelName = ModelObject?.modelName;
        console.log("Model name:", modelName);
        const response = await client.chat.completions.create({
            model: modelName??'google/gemini-2.0-flash-001',
            stream: true,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: desc
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: imageUrl
                            }
                        }
                    ]
                }
            ]
        });

        // Create a readable stream to send data in real-time
        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of response) {
                    const text = chunk.choices?.[0]?.delta?.content || "";
                    controller.enqueue(new TextEncoder().encode(text)); // Send data chunk
                }
                controller.close(); // End stream
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
            },
        });
    } catch (error) {
        console.error("Error in /api/ai-model/:", error);
        return new Response(JSON.stringify({ error: "Failed to generate code." }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}