import {
  Lecture,
  LinkLecture,
  YoutubeLinkLecture,
} from "@/features/quiz/domain/lectures";
import { Prompter } from "@/features/quiz/domain/Prompter";
import { YoutubeLinkLecturePrompter } from "@/features/quiz/domain/prompts/YoutubeLinkLecturePrompter";
import { LinkLecturePrompter } from "@/features/quiz/domain/prompts/LinkLecturePrompter";

class LecturePrompterFactory {
  static create(lecture: Lecture): Prompter {
    const instance = lecture;
    switch (instance.getType()) {
      case "Youtube":
        return new YoutubeLinkLecturePrompter(
          lecture as YoutubeLinkLecture,
          "",
        );
      case "Link":
        return new LinkLecturePrompter(lecture as LinkLecture);
      default:
        throw new Error(`Lecture type "${instance.getType()}" not supported`);
    }
  }
}

export { LecturePrompterFactory };
