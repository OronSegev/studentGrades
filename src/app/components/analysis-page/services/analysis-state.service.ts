import { Injectable } from '@angular/core';
import { StateService } from '../../../_shared/services/state.service';
import { Student } from "../../../_core/models/Student";
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

export interface AnalysisPage {
	filter: {
		ids: number[];
		subjects: string[];
	};
	leftChart: any;
	rightChart: any;
	studentsGrades: Student[];
}

const initialState: AnalysisPage = {
	filter: {
		ids: [],
		subjects: [],
	},
	leftChart: null,
	rightChart: null,
	studentsGrades: [],
};

@Injectable({
	providedIn: 'root',
})
export class AnalysisStateService extends StateService<AnalysisPage> {
	constructor() {
		super(initialState);
	}

	public studentsGrades = toSignal(
		this.select((state) => state.studentsGrades),
		{ initialValue: [] }
	);

	public idsFilter = toSignal(this.select(state => state.filter.ids), {initialValue: []});
	public subjectsFilter = toSignal(this.select(state => state.filter.subjects), {initialValue: []});

	public ids = toSignal(
		this.select((state) => state.studentsGrades).pipe(
			map((students) => {
				const studentIds = students.map((student) => student.studentId);
				return Array.from(new Set(studentIds));
			})
		),
		{
			initialValue: [],
		}
	);

	public subjects = toSignal(
		this.select((state) => state.studentsGrades).pipe(
			map((students) => {
				const subjects = students.map((student) => student.subject);
				return Array.from(new Set(subjects));
			})
		),
		{
			initialValue: [],
		}
	);


	setStudentGradesData(studentsGrades: Student[]) {
		this.setState({ studentsGrades });
	}

	setSelectedIds(ids: number[]) {
		const currentState = this.state.filter;
		this.setState({filter: {
			...currentState,
			ids: ids
		}})
	}

	setSelectedSubjects(subjects: string[]) {
		const currentState = this.state.filter;
		this.setState({filter: {
			...currentState,
			subjects: subjects
		}})
	}
}
