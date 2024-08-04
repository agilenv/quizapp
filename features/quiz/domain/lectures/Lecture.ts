import { UniqueID } from "@/lib/randomizer";

abstract class Lecture {
  protected id: string;
  private type: string;

  constructor(id?: string) {
    this.id = id || UniqueID("L");
    this.type = this.getType();
  }

  abstract getType(): string;

  public getId(): string {
    return this.id;
  }
}

export { Lecture };
