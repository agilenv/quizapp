import { Answer } from "./Answer";
import { CorrectAnswer } from "./CorrectAnswer";

abstract class Question {
  protected text: string;
  protected answer: CorrectAnswer;
  protected userAnswer: Answer;
  private type: string;

  constructor(question: string, answer: CorrectAnswer) {
    this.text = question;
    this.answer = answer;
    this.userAnswer = new Answer("");
    this.type = this.getType();
  }

  abstract getType(): string;

  public setAnswer(userAnswer: string): boolean {
    this.userAnswer = new Answer(userAnswer);
    return this.isCorrectAnswer();
  }

  public isCorrectAnswer(): boolean {
    return this.answer.isEqualTo(this.userAnswer);
  }

  public getCorrectAnswer(): CorrectAnswer {
    return this.answer;
  }

  public getText(): string {
    return this.text;
  }
}

export { Question };
