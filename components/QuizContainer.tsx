"use client";

import React, { useEffect, useState } from "react";
import MultipleChoiceQuestion from "@/components/MultipleChoiceQuestion";
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

const QuizContainer = () => {
  const { quiz, setAnswer, nextQuestion } = useQuiz();
  const [question, setQuestion] = useState<Question>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [completedPercentage, setCompletedPercentage] = useState(0);

  useEffect(() => {
    setNextQuestion();
  }, []);

  const setNextQuestion = () => {
    if (!quiz) throw new Error("No quiz loaded");
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
      case err instanceof QuizIsCompleteError: {
        router.push(`/quizzes/${quiz?.getId()}/score`);
        return;
      }
      case err instanceof QuizNotFoundError: {
        return notFound();
      }
      default: {
        router.push(`/?errors`);
        return;
      }
    }
  };

  const onAnswer = (userAnswer: string): boolean => {
    try {
      if (!question) throw new Error("No question selected");
      if (!quiz) throw new Error("No quiz selected");

      const isCorrect = setAnswer(question, userAnswer);
      setCompletedPercentage(
        (quiz?.questionsGenerated() /
          quiz?.getSpecification().getNumberOfQuestions()) *
          100,
      );
      return isCorrect;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return (
    <>
      {isLoading || quiz === null ? (
        <Loading />
      ) : (
        <div className={"flex flex-col w-full max-w-4xl overflow-auto p-6"}>
          <Progress value={completedPercentage} className={"h-2 mt-4"} />
          {question instanceof MC ? (
            <MultipleChoiceQuestion
              question={question.getText()}
              answers={question.getOptions()}
              correctAnswer={question.getCorrectAnswer()}
              onAnswer={onAnswer}
              setNextQuestion={setNextQuestion}
              totalQuestions={quiz?.getSpecification().getNumberOfQuestions()}
              currentNumberOfQuestions={quiz?.questionsGenerated()}
            />
          ) : null}
        </div>
      )}
    </>
  );
};

export default QuizContainer;
