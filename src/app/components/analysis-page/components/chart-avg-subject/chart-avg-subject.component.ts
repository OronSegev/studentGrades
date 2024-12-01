import { Component, Input, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Student } from "../../../../_core/models/Student";

@Component({
    selector: 'app-chart-avg-subject',
    imports: [MatButton, BaseChartDirective],
    templateUrl: './chart-avg-subject.component.html',
    styleUrl: './chart-avg-subject.component.scss'
})
export class ChartAvgSubjectComponent {
	@Input('dataSource') set _dataSource(values: any[]) {
		if (!values) {
			return;
		}

		const { subjects, averages } = this.calculateSubjectAverages(values);
		this.barChartData.labels = subjects;
		this.barChartData.datasets = [{ data: averages, label: 'AVG By Subject' }];
	}
	@ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

	public barChartOptions: ChartConfiguration<'bar'>['options'] = {
		// We use these empty structures as placeholders for dynamic theming.
		scales: {
			x: {},
			y: {
				min: 10,
			},
		},
		plugins: {
			legend: {
				display: true,
			},
		},
	};
	public barChartType = 'bar' as const;

	public barChartData: ChartData<'bar'> = {
		labels: [],
		datasets: [{ data: [], label: '' }],
	};

	calculateSubjectAverages(data: Student[]) {
		const subjectMap = new Map<string, { totalGrade: number; count: number }>();

		// Aggregate grades by subject
		data.forEach(({ subject, grade }) => {
			if (!subjectMap.has(subject)) {
				subjectMap.set(subject, { totalGrade: 0, count: 0 });
			}
			const subjectData = subjectMap.get(subject)!;
			subjectData.totalGrade += grade;
			subjectData.count += 1;
		});

		// Create arrays for subjects and their averages
		const subjects: string[] = [];
		const averages: number[] = [];

		subjectMap.forEach(({ totalGrade, count }, subject) => {
			subjects.push(subject);
			averages.push(totalGrade / count);
		});

		return { subjects, averages };
	}
}
