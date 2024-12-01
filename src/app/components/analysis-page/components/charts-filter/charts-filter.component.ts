import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-charts-filter',
    imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
    templateUrl: './charts-filter.component.html',
    styleUrl: './charts-filter.component.scss'
})
export class ChartsFilterComponent {
	@Input() ids: number[] = [];
	@Input() subjects: string[] = [];
	@Output() idsChange = new EventEmitter<number[]>();
	@Output() subjectsChange = new EventEmitter<string[]>();


	idsControl = new FormControl('');
	subjectsControl = new FormControl('');


	idsSelectionChanged(e: any) {
		this.idsChange.emit(e.value)
	}

	subjectsSelectionChange(e: any) {
		this.idsChange.emit(e.value)
	}

}
