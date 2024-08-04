import { LinkLecture } from "./LinkLecture";

class YoutubeLinkLecture extends LinkLecture {
  private videoID: string;

  constructor(link: string, id?: string) {
    super(link, id);
    this.videoID = this.extractID(link);
  }

  public getVideoID(): string {
    return this.videoID;
  }

  public getType(): string {
    return "Youtube";
  }

  private extractID(link: string): string {
    const regex = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
    const match = link.match(regex);
    if (match) {
      return match[1];
    }
    throw new Error("Invalid YouTube link");
  }
}

export { YoutubeLinkLecture };
