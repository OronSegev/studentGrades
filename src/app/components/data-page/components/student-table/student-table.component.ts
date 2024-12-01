import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableComponent } from '../../../../_shared/components/table/table.component';
import { StudentCardComponent } from '../student-card/student-card.component';
import { Student } from "../../../../_core/models/Student";

@Component({
    selector: 'app-student-table',
    standalone: true,
    imports: [TableComponent, StudentCardComponent],
    templateUrl: './student-table.component.html',
    styleUrl: './student-table.component.scss'
})
export class StudentTableComponent {
	@Input() studentsGrades: Student[] | undefined = [];
	@Input() selectedStudent: Student | null | undefined = null;
	@Output() saveStudent = new EventEmitter();
	@Output() selectedStudentChanged = new EventEmitter<Student>();

	displayedColumns: string[] = ['id', 'name', 'date', 'grade', 'subject'];

	selectRow(student: Student): void {
		this.selectedStudentChanged.emit(student);
	}
}
