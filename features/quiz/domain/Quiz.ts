import { Question, QuestionList } from "@/features/quiz/domain/questions";
import { Lecture } from "@/features/quiz/domain/lectures";
import { QuizSpec } from "@/features/quiz/domain/QuizSpec";
import { UniqueID } from "@/lib/randomizer";

class Quiz {
  protected id: string;
  protected questions: QuestionList;
  protected spec: QuizSpec;

  constructor(spec: QuizSpec, id?: string) {
    this.id = id || UniqueID("Q");
    this.questions = new QuestionList();
    this.spec = spec;
  }

  public getId(): string {
    return this.id;
  }

  public addQuestion(question: Question) {
    if (this.meetSpecification()) {
      this.questions.add(question);
    }
  }

  public meetSpecification(): boolean {
    return this.questionsGenerated() < this.spec.getNumberOfQuestions();
  }

  public getLecture(): Lecture {
    return this.spec.getLecture();
  }

  public questionsGenerated(): number {
    return this.questions.length();
  }

  public getSpecification(): QuizSpec {
    return this.spec;
  }

  public getCorrectAnswers(): number {
    return this.questions.countCorrectAnswers();
  }

  public getAllQuestions(): Question[] {
    return this.questions.getAll();
  }
}

export { Quiz };
