import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appInit]'
})
export class InitDirective {

  @Input() appInit;

  constructor() { }

  ngAppInit() {
    // this.appInit;
  }

}
