import { Answer } from "./Answer";

class CorrectAnswer extends Answer {
  private reason: string;

  constructor(text: string, reason: string) {
    super(text);
    this.reason = reason;
  }

  public getReason(): string {
    return this.reason;
  }
}

export { CorrectAnswer };
