"use client";
import { useEffect } from "react";
import { useQuiz } from "@/context/QuizContext";

export default function QuizLayout({
  params,
  children,
}: {
  params: { quiz_id: string };
  children: React.ReactNode;
}) {
  const { quiz, loadQuiz } = useQuiz();

  useEffect(() => {
    loadQuiz(params.quiz_id).catch((err) => console.log("not found?", err));
  }, [params.quiz_id]);

  return (
    quiz && (
      <div className={"h-screen flex flex-col mt-14 items-center"}>
        {children}
      </div>
    )
  );
}
