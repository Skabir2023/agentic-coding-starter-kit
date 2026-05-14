import type { APIRoute } from "astro";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const lastMessage = messages[messages.length - 1];
    const userMessage = lastMessage.content;

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: userMessage,
    });

    return new Response(
      JSON.stringify({
        messages: [
          {
            role: "assistant",
            content: text,
          },
        ],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};