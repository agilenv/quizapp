import { QuizRepository } from "@/features/quiz/repositories/QuizRepository";
import { Question } from "@/features/quiz/domain/questions";
import { Quiz } from "@/features/quiz/domain/Quiz";

export default class AddQuestion {
  private quizRepo: QuizRepository;

  constructor(quizRepo: QuizRepository) {
    this.quizRepo = quizRepo;
  }

  public async execute(quiz: Quiz, question: Question): Promise<void> {
    quiz.addQuestion(question);
    await this.quizRepo.update(quiz);
  }
}
