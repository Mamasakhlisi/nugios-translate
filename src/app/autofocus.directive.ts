import { Directive, ElementRef, Input, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[Autofocus]',
})
export class AutofocusDirective implements AfterContentInit {
  @Input() public appAutoFocus: boolean | undefined;
  constructor(private el: ElementRef) {}
  public ngAfterContentInit(): void {
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 100);
  }
}
