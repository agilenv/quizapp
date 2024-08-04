import { Quiz } from "@/features/quiz/domain/Quiz";

export interface QuizRepository {
  create(quiz: Quiz): Promise<Quiz>;
  findById(id: string): Promise<Quiz>;
  update(quiz: Quiz): Promise<Quiz>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Quiz[]>;
}
