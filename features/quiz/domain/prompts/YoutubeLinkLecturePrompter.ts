import { Prompter } from "@/features/quiz/domain/Prompter";
import { YoutubeLinkLecture } from "@/features/quiz/domain/lectures";

class YoutubeLinkLecturePrompter implements Prompter {
  private prompt: string;

  constructor(lecture: YoutubeLinkLecture, audioTranscriptionChunk: string) {
    this.prompt = `Actúa como una API que genera cuestionarios. Deberás generar un cuestionario en formato JSON `;
    this.prompt += `basado en una parte de la transcripción del audio del video de YouTube ${lecture.getLink()}.`;
    this.prompt += `Una parte de la transcripción del audio del video es: ${audioTranscriptionChunk}`;
  }

  public getPrompt(): string {
    return this.prompt;
  }
}

export { YoutubeLinkLecturePrompter };
