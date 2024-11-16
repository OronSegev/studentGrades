import { inject, Injectable } from '@angular/core';
import { Student } from "../../../_core/models/Student";
import { DataPageStateService } from './data-page-state.service';

const STUDENTS_GRADES: Student[] = [
	{ id: 1, studentId: 101, name: 'Alice Johnson', subject: 'Mathematics', grade: 95, date: '2024-01-10' },
	{ id: 2, studentId: 101, name: 'Alice Johnson', subject: 'Science', grade: 85, date: '2024-01-15' },
	{ id: 3, studentId: 101, name: 'Alice Johnson', subject: 'History', grade: 92, date: '2024-01-20' },
  
	{ id: 4, studentId: 102, name: 'Bob Smith', subject: 'Mathematics', grade: 72, date: '2024-01-10' },
	{ id: 5, studentId: 102, name: 'Bob Smith', subject: 'Science', grade: 88, date: '2024-01-15' },
	{ id: 6, studentId: 102, name: 'Bob Smith', subject: 'History', grade: 79, date: '2024-01-20' },
  
	{ id: 7, studentId: 103, name: 'Charlie Brown', subject: 'Mathematics', grade: 83, date: '2024-01-10' },
	{ id: 8, studentId: 103, name: 'Charlie Brown', subject: 'Science', grade: 80, date: '2024-01-15' },
	{ id: 9, studentId: 103, name: 'Charlie Brown', subject: 'History', grade: 90, date: '2024-01-20' },
  
	{ id: 10, studentId: 104, name: 'Diana Prince', subject: 'Mathematics', grade: 98, date: '2024-01-10' },
	{ id: 11, studentId: 104, name: 'Diana Prince', subject: 'Science', grade: 92, date: '2024-01-15' },
	{ id: 12, studentId: 104, name: 'Diana Prince', subject: 'History', grade: 95, date: '2024-01-20' },
  
	{ id: 13, studentId: 105, name: 'Ethan Hunt', subject: 'Mathematics', grade: 82, date: '2024-01-10' },
	{ id: 14, studentId: 105, name: 'Ethan Hunt', subject: 'Science', grade: 65, date: '2024-01-15' },
	{ id: 15, studentId: 105, name: 'Ethan Hunt', subject: 'History', grade: 78, date: '2024-01-20' },
  
	{ id: 16, studentId: 106, name: 'Fiona Gallagher', subject: 'Mathematics', grade: 91, date: '2024-01-10' },
	{ id: 17, studentId: 106, name: 'Fiona Gallagher', subject: 'Science', grade: 85, date: '2024-01-15' },
	{ id: 18, studentId: 106, name: 'Fiona Gallagher', subject: 'History', grade: 94, date: '2024-01-20' },
  ];

@Injectable({
	providedIn: 'root',
})
export class DataPageService {
	globalState = inject(DataPageStateService);

	public studentsGrades = this.globalState.studentGrades;
	public studentGradesfilter = this.globalState.studentGradesfilter;
	public selectedStudent = this.globalState.selectedStudent;

	getGrades() {
		this.globalState.setStudentGrades(STUDENTS_GRADES);
	}

	saveStudent(student: any) {
		this.globalState.saveStudentsGrades(student);
	}

	setStudentGradesFilter(filter: string) {
		this.globalState.setStudentsGradesFilter(filter);
	}

	setSelectedStudent(student: Student) {
		this.globalState.setSelectedStudent(student);
	}

	addNewRow() {
		this.globalState.createNewRow();
	}

	deleteSelectedRow() {
		this.globalState.deleteSelectedRow();
	}
}
