import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataPage } from '../../../_core/models/dataPage.model';
import { Student } from '../../../_core/models/Student';
import { StateService } from '../../../_shared/services/state.service';

export interface DataPageState {
	dataPage?: DataPage;
	analysisPage: any;
	monitor: any;
}

const initialState: DataPageState = {
	dataPage: {
		selectedStudent: null,
		studentsGrades: [],
		filter: '',
		isNewRow: false,
	},
	analysisPage: null,
	monitor: null,
};

@Injectable({
	providedIn: 'root',
})
export class DataPageStateService extends StateService<DataPageState> {
	constructor() {
		super(initialState);
	}

	public studentGrades = toSignal(this.select((state) => state.dataPage?.studentsGrades));
	public studentGradesfilter = toSignal(this.select((state) => state.dataPage?.filter));
	public selectedStudent = toSignal(this.select((state) => state.dataPage?.selectedStudent || null));

	public setStudentGrades(studentsGrades: Student[]) {
		const dataPage = JSON.parse(JSON.stringify(this.state.dataPage));
		this.setState({ dataPage: { ...dataPage, studentsGrades: studentsGrades } });
	}

	public saveStudentsGrades(studentGrade: Student) {
		const dataPage = JSON.parse(JSON.stringify(this.state.dataPage));
		let newDataPage;
		if (dataPage.isNewRow) {
			newDataPage = JSON.parse(JSON.stringify(dataPage));
			newDataPage.studentsGrades.push(studentGrade);
			newDataPage.isNewRow = false;
			newDataPage.selectedStudent = null;
		} else {
			const index = dataPage.studentsGrades.findIndex((s: Student) => s.id === studentGrade.id);

			newDataPage = JSON.parse(JSON.stringify(dataPage));
			newDataPage.studentsGrades[index] = studentGrade;
		}

		this.setState({ dataPage: newDataPage });
	}

	public setStudentsGradesFilter(filter: string) {
		const dataPage = JSON.parse(JSON.stringify(this.state.dataPage));
		this.setState({ dataPage: { ...dataPage, filter } });
	}

	public setSelectedStudent(student: Student) {
		const dataPage = JSON.parse(JSON.stringify(this.state.dataPage));
		this.setState({ dataPage: { ...dataPage, selectedStudent: student } });
	}

	public createNewRow() {
		const dataPage = JSON.parse(JSON.stringify(this.state.dataPage));

		this.setState({
			dataPage: {
				...dataPage,
				selectedStudent: {
					id: '',
					name: '',
					date: '1-1-2025',
					grade: '',
					subject: '',
				},
				isNewRow: true,
			},
		});
	}

	public deleteSelectedRow() {
		const dataPage = JSON.parse(JSON.stringify(this.state.dataPage));

		if (!dataPage.selectedStudent) {
			return;
		}

		const index = dataPage.studentsGrades.findIndex((s: Student) => s.id === dataPage.selectedStudent.id);
		if (index > -1) {
			// only splice array when item is found
			dataPage.studentsGrades.splice(index, 1); // 2nd parameter means remove one item only
		} else {
			// row not found
			return;
		}
		if (this.state.dataPage?.selectedStudent?.id === dataPage.selectedStudent.id) {
			dataPage.selectedStudent = null;
		}

		this.setState({ dataPage });
	}
}
