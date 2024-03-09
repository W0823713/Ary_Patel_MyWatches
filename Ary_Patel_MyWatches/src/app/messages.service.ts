import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messagesSubject = new BehaviorSubject<string[]>([]);
  messages$: Observable<string[]> = this.messagesSubject.asObservable();

  constructor() {}

  getMessages(): Observable<string[]> {
    return this.messages$;
  }

  addMessage(message: string): void {
    const currentMessages = this.messagesSubject.value;
    if (!currentMessages.includes(message)) {
      this.messagesSubject.next([...currentMessages, message]);
    }
  }

  clearMessages(): void {
    this.messagesSubject.next([]);
  }
}