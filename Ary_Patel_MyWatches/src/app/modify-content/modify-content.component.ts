import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Content } from '../helper-files/content-interface';
import { ContentService } from '../content.service';
import { AddContentDialogComponent } from '../add-content-dialog/add-content-dialog.component';

@Component({
  selector: 'app-modify-content',
  templateUrl: './modify-content.component.html',
  styleUrls: ['./modify-content.component.scss']
})
export class ModifyContentComponent {
  newContent: Content = {
    id: null,
    title: '',
    description: '',
    creator: '',
    type: ''
    // Add other necessary fields here
  };
  contentId: number | null = null;
  errorMessage: string = '';
  buttonText: string = 'Add Content'; // Default button text
  contentList: Content[] = []; // Array to store content list

  @Output() contentAdded: EventEmitter<Content> = new EventEmitter<Content>();

  constructor(
    private contentService: ContentService,
    public dialog: MatDialog
  ) {
    this.loadContentList();
  }

  loadContentList(): void {
    this.contentService.getContentArray()
      .subscribe(contentArray => {
        this.contentList = contentArray;
      });
  }

  updateContent(): void {
    this.contentService.getContentById(this.contentId as number)
      .subscribe(existingContent => {
        if (existingContent) {
          // Update existing content with new values
          existingContent.title = this.newContent.title;
          existingContent.description = this.newContent.description;
          existingContent.creator = this.newContent.creator;
          existingContent.type = this.newContent.type;
  
          // Call the service to update the content
          this.contentService.updateContent(existingContent)
            .subscribe(updatedContent => {
              // Display success message
              this.errorMessage = 'Content updated successfully.';
              // Change button text to "Add Content"
              this.buttonText = 'Add Content';
              // Clear the input fields
              this.clearFields();
              // Update content list locally
              const index = this.contentList.findIndex(content => content.id === updatedContent.id);
              if (index !== -1) {
                this.contentList[index] = updatedContent;
              }
            }, error => {
              this.errorMessage = 'An error occurred while updating content: ' + error.message;
            });
        } else {
          this.errorMessage = 'Content not found with ID ' + this.contentId;
        }
      });
  }


  openAddContentDialog(): void {
    const dialogRef = this.dialog.open(AddContentDialogComponent, {
      data: {
        title: 'Add Content',
        newContent: this.newContent
      }
    });

    dialogRef.afterClosed().subscribe((result: Content) => {
      if (result) {
        // If contentId is null, it means we are adding a new content item
        if (!this.contentId) {
          // Update the newContent with the result from the dialog
          this.newContent = result;
          // Add the new content
          this.addContent();
        } else {
          // If contentId is not null, it means we are updating an existing content item
          // Update the fields of the existing content item
          this.newContent.id = this.contentId; // Assign the contentId
          this.newContent.title = result.title;
          this.newContent.description = result.description;
          this.newContent.creator = result.creator;
          this.newContent.type = result.type;
          // Update the existing content
          this.updateContent();
        }
      } else {
        // If dialog is closed without adding/updating content, reset newContent
        this.newContent = {
          id: null,
          title: '',
          description: '',
          creator: '',
          type: ''
        };
        // Reset contentId as well
        this.contentId = null;
      }
    });
  }

  addContent(): void {
    if (!this.contentId) {
      // If contentId is null, add new content
      this.contentService.addContent(this.newContent)
        .subscribe(newContentFromServer => {
          // Emit an event with the new content
          this.contentAdded.emit(newContentFromServer);
          // Clear the input fields
          this.clearFields();
          // Update content list
          this.loadContentList();
        }, error => {
          this.errorMessage = 'An error occurred while adding content: ' + error.message;
        });
    } else {
      // If contentId is not null, update existing content
      this.updateContent();
    }
  }

  clearFields(): void {
    // Clear the newContent object and contentId
    this.newContent = {
      id: null,
      title: '',
      description: '',
      creator: '',
      type: ''
      // Add other necessary fields here
    };
    this.contentId = null;
  }
}