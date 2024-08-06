"use client";
import { initDB } from "@/lib/database";
import { Quiz, QuizNotFoundError } from "@/features/quiz/domain/Quiz";
import { QuizFactory } from "@/features/quiz/domain/factories/QuizFactory";

export class QuizIndexedDBRepository {
  private dbPromise;

  constructor() {
    this.dbPromise = initDB();
  }

  async create(quiz: Quiz): Promise<Quiz> {
    const db = await this.dbPromise;
    await db.add("quizzes", quiz);
    return quiz;
  }

  async findById(id: string): Promise<Quiz> {
    const db = await this.dbPromise;
    const quiz = await db.get("quizzes", id);
    if (!quiz) {
      throw new QuizNotFoundError();
    }
    return QuizFactory.createFromData(quiz) || null;
  }

  async update(quiz: Quiz): Promise<Quiz> {
    const db = await this.dbPromise;
    await db.put("quizzes", quiz);
    return quiz;
  }

  async delete(id: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete("quizzes", id);
  }

  async findAll(): Promise<Quiz[]> {
    const db = await this.dbPromise;
    const quizzes = await db.getAll("quizzes");
    return quizzes.map((quiz) => QuizFactory.createFromData(quiz));
  }
}
