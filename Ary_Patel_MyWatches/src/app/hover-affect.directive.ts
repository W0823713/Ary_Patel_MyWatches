// hover-affect.directive.ts
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverAffect]'
})
export class HoverAffectDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseover') onMouseOver() {
    this.applyStyles(true);
  }

  @HostListener('mouseout') onMouseOut() {
    this.applyStyles(false);
  }

  private applyStyles(isHovered: boolean) {
    if (isHovered) {
      this.renderer.setStyle(this.el.nativeElement, 'text-decoration', 'underline');
      this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');

      // Bonus: Check if it's the first or last card
      if (this.el.nativeElement.parentElement.firstElementChild === this.el.nativeElement ||
          this.el.nativeElement.parentElement.lastElementChild === this.el.nativeElement) {
        this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid red'); // Example border style
      
      }
    } else {
        
      this.renderer.removeStyle(this.el.nativeElement, 'text-decoration');
      this.renderer.removeStyle(this.el.nativeElement, 'border'); // Remove border style
      this.renderer.removeStyle(this.el.nativeElement, 'font-weight');
     
    }
  }
}