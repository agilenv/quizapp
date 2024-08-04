"use client";

import { useEffect, useState } from "react";
import { QuizRepository } from "@/features/quiz/repositories/QuizRepository";
import { QuizIndexedDBRepository } from "@/features/quiz/repositories/QuizIndexedDBRepository";
import { QuizProvider } from "@/context/QuizContext";

export default function AppProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [quizRepo, setQuizRepo] = useState<QuizRepository>();

  useEffect(() => {
    setQuizRepo(new QuizIndexedDBRepository());
  }, []);

  return (
    quizRepo && (
      <QuizProvider quizRepository={quizRepo}>{children}</QuizProvider>
    )
  );
}
