// src/app/helper-files/content-list.ts
import { Content } from './content-interface';

export class ContentList {
  private contentArray: Content[] = [];

  constructor() {}

  get content(): Content[] {
    return this.contentArray;
  }

  add(item: Content): void {
    this.contentArray.push(item);
  }

  count(): number {
    return this.contentArray.length;
  }

  displayItem(index: number): string {
    if (index < 0 || index >= this.contentArray.length) {
      return "<p>Error: Index out of range</p>";
    }

    const { title, description, creator, imgURL, type } = this.contentArray[index];

    return `
      <div>
        <h3>${title}</h3>
        <p>${description}</p>
        <p>Creator: ${creator}</p>
        <img src="${imgURL || ''}" alt="Image" />
        <p>Type: ${type || ''}</p>
      </div>
    `;
  }
}