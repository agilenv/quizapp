import {
  CorrectAnswer,
  MultipleChoiceQuestion,
  Question,
} from "@/features/quiz/domain/questions";

interface AnswerData {
  text: string;
  reason?: string;
}

interface QuestionData {
  type: string;
  text: string;
  options?: string[];
  answer: AnswerData;
  userAnswer?: AnswerData;
}

interface QuestionListData {
  list: QuestionData[];
}

class QuestionFactory {
  public static createFromData(data: QuestionData): Question {
    if (data.type === "MultipleChoice") {
      if (!data.options) {
        throw new Error("Options are required for MultipleChoice");
      }
      const question = new MultipleChoiceQuestion(
        data.text,
        data.options,
        new CorrectAnswer(data.answer.text, data.answer.reason || ""),
      );
      question.setAnswer(data.userAnswer?.text || "");
      return question;
    }
    throw new Error("Question type not supported");
  }
}

export { QuestionFactory, type QuestionListData, type QuestionData };
