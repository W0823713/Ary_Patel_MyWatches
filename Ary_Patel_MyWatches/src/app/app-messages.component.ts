// app-messages.component.ts
import { Component, OnDestroy } from '@angular/core';
import { MessagesService } from './messages.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-app-messages',
  template: `
    <div *ngFor="let message of messages$ | async">{{ message }}</div>
  `,
  styles: [`
    div {
      background-color: #f4f4f4;
      padding: 10px;
      margin-bottom: 5px;
    }
  `]
})
export class AppMessagesComponent implements OnDestroy {
  messages$: Observable<string[]>;

  constructor(private messagesService: MessagesService) {
    this.messages$ = this.messagesService.getMessages();
  }

  ngOnDestroy() {
    // No need to unsubscribe since we're using async pipe in the template
  }
}