"use server";

import { streamText } from "ai";
import { createOpenAI, openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";

export async function generate(apiKey: string, input: string) {
  const stream = createStreamableValue("");

  (async () => {
    const openai = createOpenAI({ apiKey });
    const { textStream } = await streamText({
      model: openai("gpt-4o-mini"),
      prompt: input,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
