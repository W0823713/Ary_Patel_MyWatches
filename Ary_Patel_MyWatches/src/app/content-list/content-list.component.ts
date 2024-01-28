// content-list.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss'],
})
export class ContentListComponent {
  contentArray = [
    {
      id: 1,
      title: 'Luxury Watch 1',
      image: 'assets/Image/download-2.jpg',
      description: 'Elegant and stylish luxury watch.',
      creator: 'Luxury Watches Co.',
      tags: ['Elegant', 'Stylish', 'Luxury'],
    },
    {
      id: 2,
      title: 'Sporty Watch 1',
      image: 'assets/Image/download-1.jpg',
      description: 'Durable and sporty watch for active lifestyles.',
      creator: 'Active Gear Watches',
      type: 'Sporty',
      tags: ['Durable', 'Sporty', 'Active'],
    },
    {
      id: 3,
      title: 'Vintage Watch Collection',
      image: 'assets/Image/download.jpg',
      description: 'Explore the charm of vintage watch designs.',
      creator: 'Vintage Timepieces',
      type: 'Collection',
      tags: ['Charm', 'Vintage', 'Collection'],
    },
    {
      id: 4,
      title: 'Limited Edition Watch',
      image: 'assets/Image/download-2.jpg',
      description: 'Exclusive limited edition watch with unique features.',
      creator: 'Exclusive Watches Ltd.',
      type: 'Limited Edition',
      tags: ['Exclusive', 'Limited Edition', 'Unique'],
    },
    {
      id: 5,
      title: 'Smart Watch Technology',
      image: 'assets/Image/download-1.jpg',
      description: 'Discover the latest in smart watch technology.',
      creator: 'Tech Innovations Inc.',
      type: 'Smart',
      tags: ['Latest Tech', 'Innovative', 'Smart'],
    }
    // Add more watch content items as needed
  ];

  handleImageClick(id: number, title: string) {
    console.log(`Clicked on image with ID: ${id} and Title: ${title}`);
  }
}
