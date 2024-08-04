import { Question } from "./Question";
import { CorrectAnswer } from "./CorrectAnswer";

class MultipleChoiceQuestion extends Question {
  private readonly options: string[];

  constructor(question: string, options: string[], answer: CorrectAnswer) {
    super(question, answer);
    this.options = options;
  }

  public getOptions(): string[] {
    return this.options;
  }

  public getType(): string {
    return "MultipleChoice";
  }
}

export { MultipleChoiceQuestion };
