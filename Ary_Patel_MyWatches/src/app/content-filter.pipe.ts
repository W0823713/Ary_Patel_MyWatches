// src/app/content-filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Content } from './helper-files/content-interface';

@Pipe({
  name: 'contentFilter'
})
export class ContentFilterPipe implements PipeTransform {
  transform(contentList: Content[], typeFilter: string): Content[] {
    if (!typeFilter) {
      return contentList.filter(c => !c.type); // Filter by content with no type set
    } else {
      return contentList.filter(c => c.type === typeFilter); // Filter by the specified type
    }
  }
}