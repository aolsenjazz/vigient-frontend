export abstract class DatabaseItem {
  createdAt: string;

  constructor(createdAt: string) {
    this.createdAt = createdAt;
  }

  createdAtReadable() {
    const date = new Date(this.createdAt);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }
}
