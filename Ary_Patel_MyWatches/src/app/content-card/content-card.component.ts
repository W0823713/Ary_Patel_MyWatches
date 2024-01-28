/* // src/app/content-card/content-card.component.ts
import { Component, OnInit } from '@angular/core';
import { ContentList } from '../helper-files/content-list';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss'],
})
export class ContentCardComponent implements OnInit {
  contentList: ContentList = new ContentList();

  constructor() {
    this.contentList.add({
      id: 1,
      title: 'Classic Watch',
      description: 'A timeless classic watch design',
      creator: 'TimeCrafters',
      imgURL: 'assets/Image/download.jpg',
      type: 'Analog',
      tags: ['Classic', 'Luxury'],
    });

    this.contentList.add({
      id: 2,
      title: 'Sports Watch',
      description: 'A durable and rugged sports watch',
      creator: 'AdventureTime',
      imgURL: 'assets/Image/download-1.jpg',
      type: 'Digital',
      tags: ['Sports', 'Outdoor'],
    });

    this.contentList.add({
      id: 3,
      title: 'Smartwatch',
      description: 'A modern smartwatch with advanced features',
      creator: 'TechWizards',
      imgURL: 'assets/Image/download-2.jpg',
      type: 'Smart',
      tags: ['Technology', 'Smart'],
    });
  }
  

  ngOnInit(): void {}
} */