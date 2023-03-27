import { Directive } from '@angular/core';
import { ElementRef, HostListener} from '@angular/core';
@Directive({
  selector: '[appCapitalize]'
})
export class CapitalizeDirective {

  constructor(private ref: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    if (event.target.value.length === 1) {
      const inputValue = event.target.value;
      this.ref.nativeElement.value = inputValue.charAt(0).toUpperCase() + inputValue.substring(1);
    }
  }

}
