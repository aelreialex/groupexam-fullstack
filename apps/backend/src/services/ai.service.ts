import { AI_MODEL, groq } from "../ai/model";
import { SYSTEM_PROMPT } from "../ai/prompts";

export const chatWithAI = async (message: string) => {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: message,
      },
    ],
    model: AI_MODEL,
  });

  return response.choices[0]?.message.content;
};
