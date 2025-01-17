import { Quiz, QuizIsCompleteError } from "@/features/quiz/domain/Quiz";
import {
  QuestionData,
  QuestionFactory,
} from "@/features/quiz/domain/factories/QuestionFactory";
import { Question } from "@/features/quiz/domain/questions";
import { QuestionPrompterFactory } from "@/features/quiz/domain/factories/QuestionPrompterFactory";
import { LecturePrompterFactory } from "@/features/quiz/domain/factories/LecturePrompterFactory";
import { CustomPrompter } from "@/features/quiz/domain/prompts/CustomPrompter";
import { Prompter } from "@/features/quiz/domain/Prompter";
import { generateAIQuestion } from "@/app/actions";

export default class GenerateQuestion {
  public async execute(apiKey: string, quiz: Quiz): Promise<Question> {
    if (!quiz.meetSpecification()) {
      throw new QuizIsCompleteError();
    }
    const prompts: Prompter[] = [
      LecturePrompterFactory.create(quiz.getLecture()),
      QuestionPrompterFactory.create(
        quiz.getSpecification().getQuestionTypes(),
      ),
    ];
    if (quiz.questionsGenerated() > 0) {
      const questions: string[] = quiz
        .getAllQuestions()
        .map((q) => q.getText());
      prompts.push(
        new CustomPrompter(
          `No repitas las siguientes preguntas: ${questions.join(", ")}`,
        ),
      );
    }
    const res = await generateAIQuestion(
      apiKey,
      prompts.map((prompter) => prompter.getPrompt()),
    );
    return QuestionFactory.createFromData(res.data);
  }

  private async mock(): Promise<Question> {
    const data: QuestionData = {
      type: "MultipleChoice",
      text: "¿Cuál fue una de las estrategias clave que utilizó Stripe para escalar su base de datos a 5 millones de registros?\n",
      options: [
        "Aumentar la capacidad de almacenamiento en la nube",
        "Implementar un sistema de microservicios",
        "Optimizar las consultas a la base de datos",
        "Utilizar bases de datos NoSQL",
      ],
      answer: {
        text: "Optimizar las consultas a la base de datos",
        reason:
          "Esta estrategia fue una de las claves para escalar Stripe a 5 millones de registros.",
      },
    };
    return QuestionFactory.createFromData(data);
  }
}
