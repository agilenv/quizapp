"use server";

import { generateObject } from "ai";
import { createOpenAI, openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function getScoreNotes(
  apiKey: string,
  link: string,
  score: number,
) {
  "use server";

  let prompt = `Genera un título para el siguiente artículo ${link} `;
  prompt += `y un mensaje alentador de máximo 10 palabras sabiendo que el usuario obtuvo un puntaje de ${score}/100`;

  const openai = createOpenAI({ apiKey: apiKey });
  const { object: notes } = await generateObject({
    model: openai("gpt-4o-mini"),
    prompt: prompt,
    schema: z.object({
      title: z.string().describe("Titulo del artículo"),
      msg: z.string().describe("Un mensaje alentador, incluye un emoji"),
    }),
  });
  return { notes };
}
