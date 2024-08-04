"use client";

import React, { useEffect, useState } from "react";
import MultipleChoiceQuestion from "@/components/MultipleChoiceQuestion";
import {
  MultipleChoiceQuestion as MC,
  Question,
} from "@/features/quiz/domain/questions";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/context/QuizContext";
import Loading from "@/app/quizzes/[quiz_id]/loading";

const QuizContainer = () => {
  const { quiz, setAnswer, nextQuestion } = useQuiz();
  const [question, setQuestion] = useState<Question>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

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
        router.push(`/quizzes/${quiz?.getId()}/score`);
      });
  };

  const onAnswer = (userAnswer: string): boolean => {
    try {
      if (!question) throw new Error("No question selected");
      return setAnswer(question, userAnswer);
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
        <div className="">
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
