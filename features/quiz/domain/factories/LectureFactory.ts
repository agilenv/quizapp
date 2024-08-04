import {
  Lecture,
  LinkLecture,
  YoutubeLinkLecture,
} from "@/features/quiz/domain/lectures";

interface LectureData {
  type: string;
  link: string;
  id: string;
}

class LectureFactory {
  public static createFromLink(link: string): Lecture {
    if (link.includes("youtube.com")) {
      return new YoutubeLinkLecture(link);
    }
    return new LinkLecture(link);
  }

  public static createFromData(data: LectureData): Lecture {
    if (data.type === "Link") {
      return new LinkLecture(data.link, data.id);
    }
    if (data.type === "Youtube") {
      return new YoutubeLinkLecture(data.link, data.id);
    }
    throw new Error("Lecture type not supported");
  }
}

export { LectureFactory, type LectureData };
