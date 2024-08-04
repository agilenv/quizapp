import { expect, test } from "@jest/globals";
import { Quiz } from "@/features/quiz/domain/Quiz";
import { LinkLecture } from "@/features/quiz/domain/lectures";
import { QuizSpec } from "@/features/quiz/domain/QuizSpec";

test("should generate a unique id", () => {
  const spec = new QuizSpec(3, new LinkLecture("https://www.google.com"), [
    "multiple-choice",
  ]);
  const quiz = new Quiz(spec);
  const anotherQuiz = new Quiz(spec);
  expect(quiz.getId()).not.toEqual(anotherQuiz.getId());
});
