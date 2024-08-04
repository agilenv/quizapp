import { Question } from "@/features/quiz/domain/questions";

export default class AnswerQuestion {
  public execute(question: Question, response: string): boolean {
    return question.setAnswer(response);
  }
}
