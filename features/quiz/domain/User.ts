import { Quiz } from "./Quiz";

class User {
  protected quizzes: Quiz[] = [];

  constructor(quizzes: Array<Quiz>) {
    this.quizzes = quizzes;
  }

  public listQuizzes(): Quiz[] {
    return this.quizzes;
  }
}

export { User };
