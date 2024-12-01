import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SimpleCardComponent } from '../../../../_shared/components/simple-card/simple-card.component';
import { Student } from "../../../../_core/models/Student";

@Component({
    selector: 'app-student-card',
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, SimpleCardComponent],
    templateUrl: './student-card.component.html',
    styleUrl: './student-card.component.scss'
})
export class StudentCardComponent {
	@Input() set studentInfo(student: Student | null) {
		if (student) {
			this.editForm.setValue({
				id: student.id,
				name: student.name,
				date: student.date,
				grade: student.grade,
				subject: student.subject,
			});
		}
	}
	@Output() saveStudent = new EventEmitter();

	editForm: FormGroup;

	constructor(private fb: FormBuilder) {
		this.editForm = this.fb.group({
			id: [''],
			name: [''],
			date: [''],
			grade: [''],
			subject: [''],
		});
	}

	saveChanges(): void {
		this.saveStudent.emit({
			...this.editForm.value
		})
	}
}
