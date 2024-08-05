import React, { createContext, useState, useContext } from "react";
import { Quiz } from "@/features/quiz/domain/Quiz";
import { Question } from "@/features/quiz/domain/questions";
import AnswerQuestion from "@/features/quiz/usecases/AnswerQuestion";
import AddQuestion from "@/features/quiz/usecases/AddQuestion";
import GenerateQuestion from "@/features/quiz/usecases/GenerateQuestion";
import { QuizRepository } from "@/features/quiz/repositories/QuizRepository";
import GenerateQuiz from "@/features/quiz/usecases/GenerateQuiz";
import PlayAgain from "@/features/quiz/usecases/PlayAgain";

interface QuizContextProps {
  quiz: Quiz | null;
  loadQuiz: (quizId: string) => Promise<void>;
  setAnswer: (question: Question, userAnswer: string) => boolean;
  nextQuestion: () => Promise<Question>;
  generateFromLink: (
    apiKey: string,
    link: string,
    numQuestions: number,
    questionsType?: string[],
  ) => Promise<Quiz>;
  apiKey: string;
  playAgain: () => Promise<Quiz>;
  flush: () => Promise<void>;
}

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

export const QuizProvider: React.FC<{
  children: React.ReactNode;
  quizRepository: QuizRepository;
}> = ({ children, quizRepository }) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [apiKey, setApiKey] = useState("");

  const addQuestionUsecase = new AddQuestion(quizRepository);
  const answerQuestionUsecase = new AnswerQuestion();
  const generateQuestionUsecase = new GenerateQuestion();
  const generateQuizUsecase = new GenerateQuiz();
  const playAgainUsecase = new PlayAgain(quizRepository);

  const loadQuiz = async (quizId: string) => {
    const loadedQuiz = await quizRepository.findById(quizId);
    setQuiz(loadedQuiz);
  };

  const setAnswer = (question: Question, userAnswer: string): boolean => {
    if (!quiz) throw new Error("No quiz loaded");
    const isValid = answerQuestionUsecase.execute(question, userAnswer);
    addQuestionUsecase.execute(quiz, question);
    return isValid;
  };

  const nextQuestion = async (): Promise<Question> => {
    if (!quiz) throw new Error("No quiz loaded");
    return generateQuestionUsecase.execute(apiKey, quiz);
  };

  const generateFromLink = async (
    apiKey: string,
    link: string,
    numQuestions: number,
    questionTypes: string[] = ["multiple-choice"],
  ): Promise<Quiz> => {
    setApiKey(apiKey);
    setQuiz(null);
    return await generateQuizUsecase.fromLink(
      link,
      numQuestions,
      questionTypes,
    );
  };

  const playAgain = async (): Promise<Quiz> => {
    if (!quiz) throw new Error("No quiz loaded");
    return await playAgainUsecase.execute(quiz);
  };

  const flush = async (): Promise<void> => {
    quizRepository.findAll().then((quizzes) => {
      quizzes.forEach((quiz) => quizRepository.delete(quiz.getId()));
    });
  };

  return (
    <QuizContext.Provider
      value={{
        quiz,
        loadQuiz,
        setAnswer,
        nextQuestion,
        generateFromLink,
        apiKey,
        playAgain,
        flush,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
