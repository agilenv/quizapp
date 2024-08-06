"use client";
import { useQuiz } from "@/context/QuizContext";
import { Rank } from "@/components/Rank";
import { LinkLecture } from "@/features/quiz/domain/lectures";
import { getScoreNotes } from "@/app/actions";
import { useEffect, useState } from "react";

interface ScoreNotesData {
  title: string;
  msg: string;
}

export default function ScorePage() {
  const { quiz, apiKey } = useQuiz();
  const [scoreNotes, setScoreNotes] = useState<ScoreNotesData>();

  useEffect(() => {
    fetchScoreNotes().then((notes) => setScoreNotes(notes));
  }, []);

  const fetchScoreNotes = async (): Promise<ScoreNotesData> => {
    if (!quiz) throw new Error("No such quiz");

    const link = (quiz.getLecture() as LinkLecture).getLink();
    const score = Math.round(
      (quiz.getCorrectAnswers() / quiz.questionsGenerated()) * 100,
    );
    return await getScoreNotes(apiKey, link, score).then((res) => {
      return res.notes;
    });
  };

  return (
    quiz &&
    scoreNotes && (
      <Rank
        numOfCorrectAnswers={quiz.getCorrectAnswers()}
        totalQuestions={quiz.questionsGenerated()}
        score={Math.round(
          (quiz.getCorrectAnswers() / quiz.questionsGenerated()) * 100,
        )}
        link={(quiz.getLecture() as LinkLecture).getLink()}
        title={scoreNotes.title}
        cheerUpMsg={scoreNotes.msg}
      />
    )
  );
}
