"use client";
import { useEffect } from "react";
import { useQuiz } from "@/context/QuizContext";
import { useRouter } from "next/navigation";

export default function QuizLayout({
  params,
  children,
}: {
  params: { quiz_id: string };
  children: React.ReactNode;
}) {
  const { quiz, loadQuiz } = useQuiz();
  const router = useRouter();

  useEffect(() => {
    loadQuiz(params.quiz_id).catch((err) => router.push(`/`));
  }, [params.quiz_id]);

  return (
    quiz && (
      <div className={"flex flex-col items-center w-full"}>{children}</div>
    )
  );
}
