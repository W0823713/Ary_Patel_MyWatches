import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Content } from './helper-files/content-interface';
import { ContentService } from './content.service';
import { MessagesService } from './messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Arya App';
  singleContentItem: Content | undefined;
  contentId: number | undefined;
  messages: string[] = [];
  messagesSubscription: Subscription | undefined;

  constructor(private contentService: ContentService, private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.messagesSubscription = this.messagesService.getMessages().subscribe(messages => {
      this.messages = messages;
      // Check if the message array contains "Content array loaded!"
      if (messages.includes('Content array loaded!')) {
        const itemId = 1; // Choose the id of the default content item
        this.contentService.getContentById(itemId).subscribe(contentItem => {
          this.singleContentItem = contentItem;
          this.messagesService.addMessage(`Content Item at id: ${itemId}`);
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }

  onRetrieveContent(): void {
    if (!this.contentId || isNaN(this.contentId) || this.contentId < 1) {
      this.messagesService.addMessage('Error occurred: Invalid ID');
      return;
    }

    this.contentService.getContentById(this.contentId).subscribe(contentItem => {
      if (contentItem) {
        this.singleContentItem = contentItem;
        this.messagesService.addMessage(`Content Item at id: ${this.contentId}`);
      } else {
        this.messagesService.addMessage(`Content not found for id: ${this.contentId}`);
      }
    });
  }
}
