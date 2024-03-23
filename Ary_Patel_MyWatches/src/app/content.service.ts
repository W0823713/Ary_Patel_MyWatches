import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Content } from './helper-files/content-interface';
import { contentArray } from './helper-files/contentDb';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private messagesService: MessagesService) {}

  getContentArray(): Observable<Content[]> {
    this.messagesService.addMessage('Content array loaded!');
    return of(contentArray);
  }

  getContentById(id: number): Observable<Content | undefined> {
    const contentItem = contentArray.find(item => item.id === id);
    if (contentItem) {
      this.messagesService.addMessage(`Content Item at id: ${id}`);
      return of(contentItem);
    }
    return of(undefined);
  }
  
  addContent(content: Content): Observable<void> {
    const highestId = Math.max(...contentArray.map(item => item.id ?? 0));
    const newId = highestId + 1;
    content.id = newId;
    contentArray.push(content);
    
    this.messagesService.addMessage(`Content added: ${content.title}`);

    return of(undefined);
  }

  updateContent(updatedContent: Content): Observable<void> {
    const index = contentArray.findIndex(item => item.id === updatedContent.id);
    if (index !== -1) {
      contentArray[index] = updatedContent;
      this.messagesService.addMessage(`Content updated: ${updatedContent.title}`);
      return of(undefined);
    } else {
      return throwError('Content not found');
    }
  }

  // Add the updateContentList method
  updateContentList(updatedContentArray: Content[]): void {
    contentArray.length = 0; // Clear existing content array
    contentArray.push(...updatedContentArray); // Add updated content array
  }

  // Method to retrieve content list
  getContentList(): Content[] {
    return contentArray.slice(); // Return a copy of contentArray
  }

  // Add the clearMessages method
  clearMessages(): void {
    // Clear messages using the MessagesService
    this.messagesService.clearMessages();
  }
}
