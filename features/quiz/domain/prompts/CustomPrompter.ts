import { Prompter } from "@/features/quiz/domain/Prompter";

class CustomPrompter implements Prompter {
  private prompt: string;

  constructor(prompt: string) {
    this.prompt = prompt;
  }

  public getPrompt(): string {
    return this.prompt;
  }
}

export { CustomPrompter };
