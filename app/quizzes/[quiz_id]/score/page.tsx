"use client";
import { useQuiz } from "@/context/QuizContext";
import { Rank } from "@/components/Rank";
import { useRouter } from "next/navigation";

export default function ScorePage() {
  const { quiz, playAgain, loadQuiz } = useQuiz();
  const router = useRouter();

  return (
    quiz && (
      <Rank
        numOfCorrectAnswers={quiz.getCorrectAnswers()}
        totalQuestions={quiz.questionsGenerated()}
        score={(quiz.getCorrectAnswers() / quiz.questionsGenerated()) * 100}
        lecture={quiz.getLecture()}
        onPlayAgain={() => {
          playAgain().then((newQuiz) => {
            loadQuiz(newQuiz.getId()).then((quizId) => {
              router.push(`/quizzes/${newQuiz.getId()}`);
            });
          });
        }}
      />
    )
  );
}
