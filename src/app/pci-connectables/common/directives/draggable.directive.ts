import { Directive, ElementRef, HostListener } from '@angular/core';
//https://anseki.github.io/plain-draggable/

@Directive({
  selector: '[pci-draggable]'
})
export class DraggableDirective {

  constructor(private el: ElementRef) {
    this.highlight('yellow');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('yellow');
  }

  private highlight(color: string) {
    //this.el.nativeElement.style.backgroundColor = color;
  }
}
