import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[cardContent]',
	standalone: true,
})
export class CardContentDirective {
	constructor(public template: TemplateRef<any>) {}
}
