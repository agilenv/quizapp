"use client";

import { useEffect, useState } from "react";
import { useQuiz } from "@/context/QuizContext";
import { generate } from "@/app/actions";
import { readStreamableValue } from "ai/rsc";
import * as React from "react";

export function ScoreMessage({ score }: { score: number }) {
  const [msg, setMsg] = useState<string>("");
  const { apiKey } = useQuiz();

  useEffect(() => {
    cheerUp();
  }, []);

  const cheerUp = async () => {
    const { output } = await generate(
      apiKey,
      `Responde con un mensaje animador de máximo 10 palabras e incluye un emoji!. El usuario obtuvo un puntaje de ${score} sobre 100`,
    );

    for await (const delta of readStreamableValue(output)) {
      setMsg((currentGeneration) => `${currentGeneration}${delta}`);
    }
  };

  return (
    <div className="flex items-center text-center px-8 gap-2 font-medium leading-none">
      {msg}
    </div>
  );
}
