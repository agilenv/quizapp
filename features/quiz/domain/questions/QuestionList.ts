import { Question } from "./Question";
import { QuestionCollector } from "./QuestionCollector";

class QuestionList implements QuestionCollector<Question> {
  protected list: Question[] = [];
  private cursor: number = 0;

  public add(q: Question): void {
    this.list.push(q);
  }

  public current(): Question {
    if (this.length() == 0) {
      throw new Error("No such question");
    }
    return this.list[this.cursor];
  }

  public next(): Question {
    this.cursor++;
    if (this.cursor >= this.length()) {
      throw new Error("No more questions");
    }
    return this.list[this.cursor];
  }

  public rewind(): void {
    this.cursor = 0;
  }

  public length(): number {
    return this.list.length;
  }

  public countCorrectAnswers(): number {
    let count = 0;
    this.list.forEach((question: Question) => {
      count += question.isCorrectAnswer() ? 1 : 0;
    });
    return count;
  }

  public getAll(): Question[] {
    return this.list;
  }
}

export { QuestionList };
