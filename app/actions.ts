"use server";

import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { Prompter } from "@/features/quiz/domain/Prompter";

const defaultModel = "gpt-4o-mini";

export async function getScoreNotes(
  apiKey: string,
  link: string,
  score: number,
) {
  "use server";

  let prompt = `Genera un título de máximo 10 palabras para el siguiente artículo ${link} `;
  prompt += `y un mensaje alentador de máximo 10 palabras sabiendo que el usuario obtuvo un puntaje de ${score}/100`;

  const openai = createOpenAI({ apiKey: apiKey });
  const { object: notes } = await generateObject({
    model: openai(defaultModel),
    prompt: prompt,
    schema: z.object({
      title: z.string().describe("Titulo del artículo"),
      msg: z.string().describe("Un mensaje alentador, incluye un emoji"),
    }),
  });
  return { notes };
}

export async function generateAIQuestion(apiKey: string, prompts: string[]) {
  "use server";

  const prompt = prompts.join("\n");
  const openai = createOpenAI({
    apiKey: apiKey,
  });

  const { object: data } = await generateObject({
    model: openai(defaultModel),
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

  return { data };
}
