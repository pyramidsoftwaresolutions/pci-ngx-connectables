import { Directive, ElementRef, HostListener } from '@angular/core';

//https://anseki.github.io/leader-line/

@Directive({
  selector: '[pci-connectable]'
})
export class ConnectableDirective {
  element:HTMLElement;
  constructor(private el: ElementRef) {
    this.element=el.nativeElement;
    this.hideHandles();
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlightHandles();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideHandles();
  }

  private highlightHandles(){
    this.element.style.borderColor='red';
  }

  private hideHandles(){
    this.element.style.borderColor='gray';
  }


}
