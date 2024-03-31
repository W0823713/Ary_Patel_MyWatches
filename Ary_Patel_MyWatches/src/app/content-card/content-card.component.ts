import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Content } from '../helper-files/content-interface';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss']
})
export class ContentCardComponent {
  @Input() content!: Content;
  @Output() imageClick: EventEmitter<{ id: number | null; title: string; }> = new EventEmitter();
  @Input() boxShadow: boolean = false; 

  constructor() {}

  onImageClick(): void {
    const eventData = { id: this.content.id, title: this.content.title };
    this.imageClick.emit(eventData);
  }
}
