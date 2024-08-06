"use client";

import React, { useState } from "react";
import {
  Answer,
  MultipleChoiceQuestion,
  Question,
} from "@/features/quiz/domain/questions";

export default function MultipleChoiceQuestionComponent({
  question,
  onAnswer,
  isAnswered,
}: {
  question: MultipleChoiceQuestion;
  onAnswer: (question: Question, userAnswer: string) => boolean;
  isAnswered: boolean;
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionClick = (answer: string) => {
    if (!isAnswered) {
      setSelectedOption(answer);
      setIsCorrect(onAnswer(question, answer || ""));
    }
  };

  return (
    <div className="flex flex-col py-6 space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        {question.getText()}
      </h1>
      <small className={`text-center text-gray-400 text-sm`}>
        Elige la opción que mejor responde a la pregunta
      </small>
      <div className="w-full space-y-2">
        {question.getOptions().map((answer) => (
          <div
            key={answer}
            className={`p-4 text-center rounded-lg ${
              isAnswered
                ? question.getCorrectAnswer().isEqualTo(new Answer(answer))
                  ? "bg-green-100"
                  : selectedOption === answer
                    ? "bg-red-100"
                    : "bg-accent"
                : "cursor-pointer bg-accent hover:bg-accent/50"
            }`}
            onClick={() => handleOptionClick(answer)}
          >
            {answer}
          </div>
        ))}
      </div>
    </div>
  );
}
