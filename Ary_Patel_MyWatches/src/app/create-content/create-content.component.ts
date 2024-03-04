// create-content.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { Content } from '../helper-files/content-interface';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.scss']
})
export class CreateContentComponent {
  @Output() contentCreated: EventEmitter<Content> = new EventEmitter<Content>();
  newContent: Content = {
    id: null,
    title: '',
    description: '',
    creator: '',
    img: '',
    type: '',
    tags: []
  };
  errorMessage: string = '';

  createContent() {
    // Check for required fields
    if (!this.newContent.id || !this.newContent.title || !this.newContent.creator || !this.newContent.type) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    // Emit content if all fields are filled
    this.errorMessage = '';
    this.contentCreated.emit(this.newContent);
    // Clear input fields
    this.newContent = {
      id: null,
      title: '',
      description: '',
      creator: '',
      img: '',
      type: '',
      tags: []
    };
  }
}