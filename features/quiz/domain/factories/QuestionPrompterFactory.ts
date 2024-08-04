import { MultipleChoiceQuestionPrompter } from "@/features/quiz/domain/prompts/MultipleChoicePrompter";
import { Prompter } from "@/features/quiz/domain/Prompter";

class QuestionPrompterFactory {
  static create(questionTypes: string[]): Prompter {
    const choice: number = Math.floor(Math.random() * questionTypes.length);
    const selectedType: string = questionTypes[choice];

    switch (selectedType) {
      case "multiple-choice":
        return new MultipleChoiceQuestionPrompter();
      default:
        throw new Error(`Question type "${selectedType}" not supported`);
    }
  }
}

export { QuestionPrompterFactory };
