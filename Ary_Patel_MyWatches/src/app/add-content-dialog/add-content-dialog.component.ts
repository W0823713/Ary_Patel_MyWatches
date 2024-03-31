import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Content } from '../helper-files/content-interface';

@Component({
  selector: 'app-add-content-dialog',
  templateUrl: './add-content-dialog.component.html',
  styleUrls: ['./add-content-dialog.component.scss']
})
export class AddContentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddContentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, newContent: Content }
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(content: Content): void {
    // Send the data from the input boxes up to the ModifyContentComponent
    this.dialogRef.close(content);
  }
}