import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[footerContent]',
  standalone: true
})
export class FooterContentDirective {

  constructor(public template: TemplateRef<any>) {}


}
