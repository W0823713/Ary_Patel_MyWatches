import { Component, Output, EventEmitter } from '@angular/core';
import { Content } from '../helper-files/content-interface';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-modify-content',
  templateUrl: './modify-content.component.html',
  styleUrls: ['./modify-content.component.scss']
})
export class ModifyContentComponent {
  newContent: Content = { id: null, title: '', description: '', creator: '', type: '' };
  errorMessage: string = '';
  isUpdating: boolean = false; // Flag to indicate if we're updating existing content
  originalButtonText: string = 'Modify Content'; // Original button text

  @Output() contentCreated: EventEmitter<Content> = new EventEmitter<Content>(); // Emit content when created or modified

  constructor(private contentService: ContentService) {}

  modifyContent(): void {
    if (!this.isValidContent(this.newContent)) {
      this.errorMessage = 'Please fill out all fields.';
      return;
    }

    if (this.newContent.id && !this.isUpdating) {
      // Check if content exists at provided ID
      this.contentService.getContentById(this.newContent.id).subscribe(
        existingContent => {
          if (existingContent) {
            // Change button text to indicate updating existing content
            this.originalButtonText = 'Update Existing Content';
            this.isUpdating = true;
          } else {
            // If content doesn't exist at provided ID, proceed with adding new content
            this.addOrUpdateContent();
          }
        },
        error => {
          this.errorMessage = 'Error retrieving content. Please try again.';
          console.error('Error retrieving content:', error);
        }
      );
    } else {
      // If id is not provided or isUpdating is true, proceed with adding or updating content
      this.addOrUpdateContent();
    }
  }

  private addOrUpdateContent(): void {
    if (this.isUpdating) {
      // Updating existing content
      this.contentService.updateContent(this.newContent).subscribe(
        () => {
          this.errorMessage = ''; // Clear error message
          
          // Update the existing content in the content list
          const updatedContentList = this.contentService.getContentList().map(content => {
            if (content.id === this.newContent.id) {
              return { ...this.newContent };
            }
            return content;
          });
          this.contentService.updateContentList(updatedContentList); // Update content list

          this.contentService.clearMessages(); // Clear messages
          this.isUpdating = false; // Reset updating flag
          this.originalButtonText = 'Modify Content'; // Reset button text
          this.clearFields(); // Clear input fields

          // Emit the new content object
          this.contentCreated.emit(this.newContent);
        },
        error => {
          this.errorMessage = 'Failed to update content. Please try again.'; // Display error message
          console.error('Error updating content:', error);
        }
      );
    } else {
      // Adding new content
      this.contentService.addContent(this.newContent).subscribe(
        () => {
          this.errorMessage = ''; // Clear error message
          
          // Add the newly created content to the content list
          const updatedContentList = [...this.contentService.getContentList(), { ...this.newContent }];
          this.contentService.updateContentList(updatedContentList); // Update content list

          this.clearFields(); // Clear input fields

          // Emit the new content object
          this.contentCreated.emit(this.newContent);
        },
        error => {
          this.errorMessage = 'Failed to add content. Please try again.'; // Display error message
          console.error('Error adding content:', error);
        }
      );
    }
  }

  private isValidContent(content: Content): boolean {
    return content.title.trim() !== '' &&
           content.description.trim() !== '' &&
           content.creator.trim() !== '' &&
           (content.type?.trim() ?? '') !== '';
  }

  private clearFields(): void {
    this.newContent = { id: null, title: '', description: '', creator: '', type: '' };
  }
}