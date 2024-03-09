import { Component, OnInit } from '@angular/core';
import { Content } from '../helper-files/content-interface';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {
  contentItems: Content[] = [];
  searchTitle: string = '';
  searchResult: string = '';
  authorToSearch: string = '';
  authorSearchMessage: { found: boolean, message: string } = { found: false, message: '' };

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.getContentArray().subscribe(contentArray => {
      this.contentItems = contentArray;
    });
  }

  searchContent() {
    const searchTerm = this.searchTitle.toLowerCase();
    this.searchResult = this.contentItems.some(content => content.title.toLowerCase().includes(searchTerm))
      ? 'Content found!'
      : 'Content not found.';
  }

  onContentCreated(newContent: Content) {
    this.contentItems = [...this.contentItems, newContent];
    console.log(`Content '${newContent.title}' added successfully.`);
  }
}
