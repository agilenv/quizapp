class Answer {
  protected text: string;

  constructor(text: string) {
    this.text = text;
  }

  public getText(): string {
    return this.text;
  }

  public isEqualTo(answer: Answer): boolean {
    return this.text == answer.getText();
  }
}

export { Answer };
