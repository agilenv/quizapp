import { Prompter } from "@/features/quiz/domain/Prompter";

class MultipleChoiceQuestionPrompter implements Prompter {
  public getPrompt(): string {
    return 'Genera una pregunta de tipo "MultipleChoice" de dificultad de media a alta y asegúrate que sea específica sobre el artículo analizado.';
  }
}

export { MultipleChoiceQuestionPrompter };
