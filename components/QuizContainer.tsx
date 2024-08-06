"use client";

import React, { useEffect, useState } from "react";
import {
  MultipleChoiceQuestion as MC,
  Question,
} from "@/features/quiz/domain/questions";
import { useRouter, notFound } from "next/navigation";
import { useQuiz } from "@/context/QuizContext";
import Loading from "@/app/quizzes/[quiz_id]/loading";
import {
  QuizIsCompleteError,
  QuizNotFoundError,
} from "@/features/quiz/domain/Quiz";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MultipleChoiceQuestionComponent from "@/components/MultipleChoiceQuestion";

const QuizContainer = () => {
  const { quiz, setAnswer, nextQuestion } = useQuiz();
  const [question, setQuestion] = useState<Question>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [completedPercentage, setCompletedPercentage] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setNextQuestion();
  }, []);

  const setNextQuestion = () => {
    if (!quiz) throw new Error("No quiz loaded");
    if (
      quiz.questionsGenerated() ===
      quiz.getSpecification().getNumberOfQuestions()
    ) {
      router.push(`/quizzes/${quiz?.getId()}/score`);
      return;
    }
    setIsLoading(true);
    nextQuestion()
      .then((question) => {
        setQuestion(question);
        setIsLoading(false);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const handleError = (err: Error) => {
    switch (true) {
      case err instanceof QuizNotFoundError: {
        return notFound();
      }
      default: {
        router.push(`/?errors`);
        return;
      }
    }
  };

  const onAnswer = (question: Question, userAnswer: string) => {
    try {
      if (!question) throw new Error("No question selected");
      if (!quiz) throw new Error("No quiz selected");

      const isCorrect = setAnswer(question, userAnswer);
      setIsAnswered(true);
      setIsCorrect(isCorrect);
      setCompletedPercentage(
        (quiz?.questionsGenerated() /
          quiz?.getSpecification().getNumberOfQuestions()) *
          100,
      );
    } catch (e) {}
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setIsCorrect(false);
    setNextQuestion();
  };

  return (
    <>
      {quiz && (
        <div className={"flex flex-col w-full max-w-4xl overflow-auto p-6"}>
          <Progress value={completedPercentage} className={"h-2 mt-4"} />
          {isLoading ? (
            <Loading />
          ) : (
            question instanceof MC && (
              <MultipleChoiceQuestionComponent
                question={question}
                onAnswer={onAnswer}
                isAnswered={isAnswered}
              />
            )
          )}
          <div className="w-[100%] flex flex-col items-center md:flex-row flex-wrap gap-6 md:justify-around">
            <Button
              variant="outline"
              size="lg"
              className={`w-full max-w-xs order-2 md:order-1`}
              asChild
            >
              <Link href="/">Volver al inicio</Link>
            </Button>
            <Button
              onClick={handleNextQuestion}
              className={`w-full max-w-xs order-1 md:order-2 ${!isAnswered} ? "cursor-not-allowed" : ""`}
              disabled={!isAnswered}
              size="lg"
            >
              {quiz.questionsGenerated() ===
              quiz.getSpecification().getNumberOfQuestions()
                ? "Finalizar"
                : "Siguiente Pregunta"}
            </Button>
          </div>
          {isAnswered && (
            <div className="p-4 bg-gray-100 rounded-lg w-full text-center my-6">
              {isCorrect ? (
                <p className="font-bold text-green-600">¡Correcto!</p>
              ) : (
                <p className="font-bold text-red-600">Incorrecto!</p>
              )}
              <p>{question?.getCorrectAnswer().getReason()}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default QuizContainer;
