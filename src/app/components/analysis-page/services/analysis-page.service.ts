import { computed, inject, Injectable } from '@angular/core';
import { AnalysisStateService } from './analysis-state.service';

const STUDENTS_GRADES = [
	{ id: 1, studentId: 101, name: 'Alice Johnson', subject: 'Mathematics', grade: 95, date: '2024-01-10' },
	{ id: 2, studentId: 101, name: 'Alice Johnson', subject: 'Science', grade: 85, date: '2024-01-10' },
	{ id: 3, studentId: 101, name: 'Alice Johnson', subject: 'History', grade: 92, date: '2024-02-15' },
	{ id: 4, studentId: 102, name: 'Bob Smith', subject: 'Mathematics', grade: 72, date: '2024-01-10' },
	{ id: 5, studentId: 102, name: 'Bob Smith', subject: 'Science', grade: 88, date: '2024-02-15' },
	{ id: 6, studentId: 102, name: 'Bob Smith', subject: 'History', grade: 79, date: '2024-02-20' },
	{ id: 7, studentId: 103, name: 'Charlie Brown', subject: 'Mathematics', grade: 83, date: '2024-01-10' },
	{ id: 8, studentId: 103, name: 'Charlie Brown', subject: 'Science', grade: 80, date: '2024-02-15' },
	{ id: 9, studentId: 103, name: 'Charlie Brown', subject: 'History', grade: 90, date: '2024-02-20' },
];
@Injectable({
	providedIn: 'root',
})
export class AnalysisPageService {
	analyssisState = inject(AnalysisStateService);

	constructor() {}

	studentsGrades = this.analyssisState.studentsGrades;

  idsFilter = this.analyssisState.idsFilter;
  subjectsFilter = this.analyssisState.subjectsFilter;

  studentsGradesWithFilter = computed(() => {
    const ids = this.idsFilter();
		const subjects = this.subjectsFilter();
    let students = this.studentsGrades();

    if(ids.length != 0) {
      students = students.filter(student => ids.includes(student.studentId))
    }

    if(subjects.length != 0) {
      students = students.filter(student => subjects.includes(student.subject))
    }
    return students;

  })

	idsList = this.analyssisState.ids;
	subjectsList = this.analyssisState.subjects;

	getStudentData() {
		this.analyssisState.setStudentGradesData(STUDENTS_GRADES);
	}

	setIdsFilter(selectedIds: number[]) {
		this.analyssisState.setSelectedIds(selectedIds);
	}

	setSubjectFilter(selectedSubjects: string[]) {
		this.analyssisState.setSelectedSubjects(selectedSubjects);
	}
}
