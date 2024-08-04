import { Quiz } from "@/features/quiz/domain/Quiz";
import { QuizRepository } from "@/features/quiz/repositories/QuizRepository";
import { QuizIndexedDBRepository } from "@/features/quiz/repositories/QuizIndexedDBRepository";
import { QuizFactory } from "@/features/quiz/domain/factories/QuizFactory";
import { QuizSpec } from "@/features/quiz/domain/QuizSpec";
import { LectureFactory } from "@/features/quiz/domain/factories/LectureFactory";

export default class GenerateQuiz {
  private repository: QuizRepository;

  constructor() {
    this.repository = new QuizIndexedDBRepository();
  }

  public async fromLink(
    link: string,
    numQuestions: number,
    questionTypes: string[],
  ): Promise<Quiz> {
    const spec = new QuizSpec(
      numQuestions,
      LectureFactory.createFromLink(link),
      questionTypes,
    );
    const quiz = QuizFactory.create(spec);
    return await this.repository.create(quiz);
  }
}

export { GenerateQuiz };
