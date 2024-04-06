import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { ContentService } from '../content.service';
import { Content } from '../helper-files/content-interface';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements OnInit {
  id: number = 0;
  content: Content | undefined;

  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +(params.get('id') ?? 0);
      this.getContent();
    });
  }

  getContent(): void {
    this.contentService.getContentById(this.id) // Use getContentById instead of getContentItem
      .subscribe(content => this.content = content);
  }
}