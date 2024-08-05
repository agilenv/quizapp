"use client";

import React, { useState } from "react";
import { Answer, CorrectAnswer } from "@/features/quiz/domain/questions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loading from "@/app/quizzes/[quiz_id]/loading";

export default function MultipleChoiceQuestion({
  question,
  answers,
  correctAnswer,
  onAnswer,
  setNextQuestion,
  totalQuestions,
  currentNumberOfQuestions,
}: {
  question: string;
  answers: string[];
  correctAnswer: CorrectAnswer;
  onAnswer: (userAnswer: string) => boolean;
  setNextQuestion: () => void;
  totalQuestions: number;
  currentNumberOfQuestions: number;
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionClick = (answer: string) => {
    if (!isAnswered) {
      setSelectedOption(answer);
      setIsAnswered(true);
      setIsCorrect(onAnswer(answer || ""));
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedOption(null);
    setIsCorrect(false);
    setNextQuestion();
  };

  return (
    <div className="flex flex-col h-screen p-6 space-y-6 w-full max-w-4xl">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        {question}
      </h1>
      <small className={`text-center text-gray-400 text-sm`}>
        Elige la opción que mejor responde a la pregunta
      </small>
      <div className="w-full space-y-2">
        {answers.map((answer) => (
          <div
            key={answer}
            className={`p-4 text-center rounded-lg ${isAnswered ? (correctAnswer.isEqualTo(new Answer(answer)) ? "bg-green-100" : selectedOption === answer ? "bg-red-100" : "bg-accent") : "cursor-pointer bg-accent hover:bg-accent/50"}`}
            onClick={() => handleOptionClick(answer)}
          >
            {answer}
          </div>
        ))}
      </div>
      <div className="w-[100%] flex flex-row gap-6 justify-around">
        <Button
          variant="secondary"
          size="lg"
          className={`w-full max-w-xs`}
          asChild
        >
          <Link href="/">Volver al inicio</Link>
        </Button>
        <Button
          onClick={handleNextQuestion}
          className={`w-full max-w-xs ${!isAnswered} ? "cursor-not-allowed" : ""`}
          disabled={!isAnswered}
          size="lg"
        >
          {currentNumberOfQuestions + 1 === totalQuestions
            ? "Finalizar"
            : "Siguiente Pregunta"}
        </Button>
      </div>
      {isAnswered && (
        <div className="p-4 bg-gray-100 rounded-lg w-full text-center">
          <p className="font-bold text-red-600">
            {isCorrect ? (
              <p className="font-bold text-green-600">¡Correcto!</p>
            ) : (
              <p className="font-bold text-red-600">Incorrecto!</p>
            )}
          </p>
          <p>{correctAnswer.getReason()}</p>
        </div>
      )}
    </div>
  );
}
