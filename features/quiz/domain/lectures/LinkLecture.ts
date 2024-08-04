import { Lecture } from "./Lecture";

class LinkLecture extends Lecture {
  protected link: string;

  constructor(link: string, id?: string) {
    super(id);
    this.link = link;
  }

  public getLink(): string {
    return this.link;
  }

  public getType(): string {
    return "Link";
  }
}

export { LinkLecture };
