import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { Prompter } from "@/features/quiz/domain/Prompter";

class AIService {
  async generate(apiKey: string, prompts: Prompter[]): Promise<Response> {
    const prompt = prompts.map((prompter) => prompter.getPrompt()).join("\n");

    const openai = createOpenAI({
      apiKey: apiKey,
    });

    const result = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: z.object({
        type: z.string().describe("El tipo de pregunta."),
        text: z.string().describe("El texto de la pregunta."),
        options: z
          .array(z.string())
          .describe("Un array de strings con las posibles respuestas."),
        answer: z.object({
          text: z.string().describe("El texto de la respuesta correcta."),
          reason: z
            .string()
            .describe(
              "Una breve explicación de por qué esa es la respuesta correcta.",
            ),
        }),
      }),
      prompt: prompt,
    });
    return result.toJsonResponse();
  }
}

export { AIService };
