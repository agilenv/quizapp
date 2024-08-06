"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuiz } from "@/context/QuizContext";
import { generate } from "@/app/actions";
import { readStreamableValue } from "ai/rsc";

export function LectureTitle({ link }: { link: string }) {
  const [title, setTitle] = useState<string>("");
  const { apiKey } = useQuiz();

  useEffect(() => {
    fetchTitle();
  }, []);

  const fetchTitle = async () => {
    const { output } = await generate(
      apiKey,
      `Responde con un título para el siguiente artículo ${link}`,
    );

    for await (const delta of readStreamableValue(output)) {
      setTitle((currentGeneration) => `${currentGeneration}${delta}`);
    }
  };

  return (
    <Link href={link} target="_blank" rel="noreferrer noopener">
      {title}
    </Link>
  );
}
