export interface IterableCollector<T> {
  rewind(): void;
  current(): T | null;
  next(): T | null;
}
