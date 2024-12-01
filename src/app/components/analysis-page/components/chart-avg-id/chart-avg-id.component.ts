import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Student } from "../../../../_core/models/Student";

@Component({
    selector: 'app-chart-avg-id',
    standalone: true,
    imports: [BaseChartDirective],
    templateUrl: './chart-avg-id.component.html',
    styleUrl: './chart-avg-id.component.scss'
})
export class ChartAvgIdComponent {
	@Input('dataSource') set _dataSource(values: any[]) {
		if (!values) {
			return;
		}

		const { names, averages } = this.calculateAverages(values);
		this.barChartData = {
			labels: names,
			datasets: [{ data: averages, label: 'AVG by ID' }],
		};
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
		datasets: [{ data: [], label: 'Series A' }],
	};

	calculateAverages(data: Student[]) {
		const studentMap = new Map<number, { name: string; totalGrade: number; count: number }>();

		// Aggregate grades by studentId
		data.forEach(({ studentId, name, grade }) => {
			if (!studentMap.has(studentId)) {
				studentMap.set(studentId, { name, totalGrade: 0, count: 0 });
			}
			const student = studentMap.get(studentId)!;
			student.totalGrade += grade;
			student.count += 1;
		});

		// Create arrays for names and averages
		const names: string[] = [];
		const averages: number[] = [];

		studentMap.forEach(({ name, totalGrade, count }) => {
			names.push(name);
			averages.push(totalGrade / count);
		});

		return { names, averages };
	}
}
