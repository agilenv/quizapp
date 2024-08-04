import { Lecture } from "@/features/quiz/domain/lectures";

class QuizSpec {
  private numberOfQuestions: number;
  private lecture: Lecture;
  private questionTypes: string[];

  constructor(
    numberOfQuestions: number,
    lecture: Lecture,
    questionTypes: string[],
  ) {
    this.numberOfQuestions = numberOfQuestions;
    this.lecture = lecture;
    this.questionTypes = questionTypes;
  }

  public getNumberOfQuestions(): number {
    return this.numberOfQuestions;
  }

  public getLecture(): Lecture {
    return this.lecture;
  }

  public getQuestionTypes(): string[] {
    return this.questionTypes;
  }
}

export { QuizSpec };
