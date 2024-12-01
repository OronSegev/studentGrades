import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardContentDirective } from '../../directives/card-content.directive';

@Component({
    selector: 'app-simple-card',
    imports: [MatCardModule, CardContentDirective],
    templateUrl: './simple-card.component.html',
    styleUrl: './simple-card.component.scss'
})
export class SimpleCardComponent {
  @Input() title = '';

}
