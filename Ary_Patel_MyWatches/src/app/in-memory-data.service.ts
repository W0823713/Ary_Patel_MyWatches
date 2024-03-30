import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Content } from '../app/helper-files/content-interface';
import { contentArray } from '../app/helper-files/contentDb';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  private content: Content[] = contentArray;

  constructor() { }

  createDb() {
    return { content: this.content };
  }

  genId(content: Content[]): number {
    return content.length > 0 ? Math.max(...content.map(c => c.id as number)) + 1 : 1;
  }

  post(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'content') {
      const body = reqInfo.utils.getJsonBody(reqInfo.req);
      const id = this.genId(this.content);
      const newContent: Content = { id, ...body };
      this.content.push(newContent);
      return reqInfo.utils.createResponse$(() => ({
        status: 201,
        body: newContent
      }));
    }
    return undefined;
  }
}