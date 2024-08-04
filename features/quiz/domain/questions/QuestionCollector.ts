import { IterableCollector } from "@/features/quiz/domain/IterableCollector";

export interface QuestionCollector<T> extends IterableCollector<T> {
  add(value: T): void;
  length(): number;
}
