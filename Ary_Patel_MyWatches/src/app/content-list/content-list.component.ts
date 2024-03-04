// src/app/content-list/content-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Content } from '../helper-files/content-interface';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {
  contentItems: Content[] = [
     {
      id: 1,
      title: 'Luxury Watch 1',
      img: 'assets/Image/download-2.jpg',
      description: 'Elegant and stylish luxury watch.',
      creator: 'Luxury Watches Co.',
      type: 'Sporty',
      tags: ['Elegant', 'Stylish', 'Luxury'],
    },
    {
      id: 2,
      title: 'Sporty Watch 1',
      img: 'assets/Image/download-1.jpg',
      description: 'Durable and sporty watch for active lifestyles.',
      creator: 'Active Gear Watches',
      type: 'Sporty',
      tags: ['Durable', 'Sporty', 'Active'],
    },
    {
      id: 3,
      title: 'Vintage Watch Collection',
      img: 'assets/Image/download.jpg',
      description: 'Explore the charm of vintage watch designs.',
      creator: 'Vintage Timepieces',
      type: 'Collection',
      tags: ['Charm', 'Vintage', 'Collection'],
    },
    {
      id: 4,
      title: 'Limited Edition Watch',
      img: 'assets/Image/download-2.jpg',
      description: 'Exclusive limited edition watch with unique features.',
      creator: 'Exclusive Watches Ltd.',
      type: 'Smart',
      tags: ['Exclusive', 'Limited Edition', 'Unique'],
    },
    {
      id: 5,
      title: 'Smart Watch Technology',
      img: 'assets/Image/download-1.jpg',
      description: 'Discover the latest in smart watch technology.',
      creator: 'Tech Innovations Inc.',
      type: 'Smart',
      tags: ['Latest Tech', 'Innovative', 'Smart'],
    },
    {
      id: 6,
      title: 'Classic Leather Watch',
      img: 'assets/Image/download.jpg',
      description: 'Timeless and elegant leather watch for any occasion.',
      creator: 'Timeless Watches Co.',
      type: 'Collection',
      tags: ['Classic', 'Leather', 'Elegant'],
    },
    {
      id: 7,
      title: 'Fitness Tracker Pro',
      img: 'assets/Image/download-2.jpg',
      description: 'Stay fit with our advanced fitness tracker with smart features.',
      creator: 'FitTech Innovations',
      type: 'Smart',
      tags: ['Fitness', 'Tracker', 'Smart Features'],
    },
    {
      id: 8,
      title: 'Adventure Sports Watch',
     
      description: 'Designed for adventure enthusiasts, durable and reliable.',
      creator: 'Adventure Gear Watches',
      type: 'Sporty',
      tags: ['Adventure', 'Durable', 'Sports'],
    }
    
    // Add more content items as needed
  ];
  searchTitle: string = ''; 
  searchResult: string = ''; 
  authorToSearch: string = ''; 
  authorSearchMessage: { found: boolean, message: string } = { found: false, message: '' }; 

  //  searchContent method
searchContent() {
  const searchTerm = this.searchTitle.toLowerCase(); // Convert to lowercase for case-insensitivity
  this.searchResult = this.contentItems.some(content => content.title.toLowerCase().includes(searchTerm))
    ? 'Content found!'
    : 'Content not found.';
}

onContentCreated(newContent: Content) {
  // Assign a new reference to contentItems
  this.contentItems = [...this.contentItems, newContent];
  // Log success message
  console.log(`Content '${newContent.title}' added successfully.`);

}

constructor() {}

  ngOnInit(): void {}
}  //