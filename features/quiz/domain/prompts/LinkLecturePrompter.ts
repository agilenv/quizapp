import { Prompter } from "@/features/quiz/domain/Prompter";
import { LinkLecture } from "@/features/quiz/domain/lectures";

class LinkLecturePrompter implements Prompter {
  private lecture: LinkLecture;
  private prompt: string;

  constructor(lecture: LinkLecture) {
    this.lecture = lecture;
    this.prompt = `Actúa como una API que genera cuestionarios. Recibirás una URL como entrada y deberás generar `;
    this.prompt += `un cuestionario en formato JSON basado en el resumen del articulo proporcionado por el link. `;
    this.prompt += `URL: ${this.lecture.getLink()}`;
  }

  public getPrompt(): string {
    return this.prompt;
  }
}

export { LinkLecturePrompter };
