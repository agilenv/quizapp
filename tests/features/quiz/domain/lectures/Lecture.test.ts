import { LinkLecture } from "@/features/quiz/domain/lectures";
import { expect, test } from "@jest/globals";

test("should generate a unique id", () => {
  const lecture = new LinkLecture("https://www.google.com");
  const anotherLecture = new LinkLecture("https://www.google.com");
  expect(lecture.getId()).not.toEqual(anotherLecture.getId());
});
