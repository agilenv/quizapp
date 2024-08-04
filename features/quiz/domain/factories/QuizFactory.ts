import { QuizSpec } from "@/features/quiz/domain/QuizSpec";
import { Quiz } from "@/features/quiz/domain/Quiz";
import {
  LectureData,
  LectureFactory,
} from "@/features/quiz/domain/factories/LectureFactory";
import {
  QuestionFactory,
  QuestionListData,
} from "@/features/quiz/domain/factories/QuestionFactory";

interface QuizSpecData {
  lecture: LectureData;
  numberOfQuestions: number;
  questionTypes: string[];
}

interface QuizData {
  id: string;
  spec: QuizSpecData;
  questions: QuestionListData;
}

abstract class QuizFactory {
  public static create(spec: QuizSpec): Quiz {
    return new Quiz(spec);
  }

  public static createFromData(data: QuizData): Quiz {
    if (!data.spec.lecture.link.match(/https?:\/\//)) {
      throw new Error("Lecture must be a link");
    }

    const spec = new QuizSpec(
      data.spec.numberOfQuestions,
      LectureFactory.createFromData(data.spec.lecture),
      data.spec.questionTypes,
    );
    const quiz = new Quiz(spec, data.id);
    data.questions.list.map((question) =>
      quiz.addQuestion(QuestionFactory.createFromData(question)),
    );
    return quiz;
  }
}

export { QuizFactory, type QuizData };
