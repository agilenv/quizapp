import { Quiz } from "@/features/quiz/domain/Quiz";
import { QuizRepository } from "@/features/quiz/repositories/QuizRepository";
import { QuizIndexedDBRepository } from "@/features/quiz/repositories/QuizIndexedDBRepository";
import { QuizFactory } from "@/features/quiz/domain/factories/QuizFactory";

export default class PlayAgain {
  private quizRepo: QuizRepository;

  constructor(quizRepo: QuizRepository) {
    this.quizRepo = new QuizIndexedDBRepository();
  }

  public async execute(quiz: Quiz): Promise<Quiz> {
    const newQuiz = QuizFactory.create(quiz.getSpecification());
    return await this.quizRepo.create(newQuiz);
  }
}

export { PlayAgain };
