import { Component, computed, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { DataPageService } from './services/data-page.service';
import { AsyncPipe } from '@angular/common';
import { FilterHelperService } from './services/filter-helper.service';

@Component({
    selector: 'app-data-page',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, StudentTableComponent, AsyncPipe],
    templateUrl: './data-page.component.html',
    styleUrl: './data-page.component.scss'
})
export class DataPageComponent implements OnInit {
	displayedColumns: string[] = ['id', 'name', 'date', 'grade', 'subject'];

	dataPageService = inject(DataPageService);

	selectedStudent = this.dataPageService.selectedStudent;
	studentsGrades = this.dataPageService.studentsGrades;
	studentGradesfilter = this.dataPageService.studentGradesfilter;
	studentsGradesWithFilter = computed(() => {
		const filter = this.studentGradesfilter() || '';
		const grades = this.studentsGrades() || [];

		if (!filter) {
			// if filter is empty return all results
			return grades;
		}

		const filtteredResults = FilterHelperService.applyFilter(filter , grades);
		return filtteredResults;
	})

	ngOnInit(): void {
		this.dataPageService.getGrades();
	}

	saveStudent(student: any){
		this.dataPageService.saveStudent(student);
	}

	filterChanged(filter: string) {
		this.dataPageService.setStudentGradesFilter(filter);
	}

	selectedStudentChanged(student: any) {
		this.dataPageService.setSelectedStudent(student)
	}

	addNewRow() {
		this.dataPageService.addNewRow();
	}

	deleteSelectedRow() {
		debugger;
		this.dataPageService.deleteSelectedRow();
	}
}
