import { Component, Input, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Student } from "../../../../_core/models/Student";

@Component({
	selector: 'app-chart-avg-student',
	standalone: true,
	imports: [MatButton, BaseChartDirective],
	templateUrl: './chart-avg-student.component.html',
	styleUrl: './chart-avg-student.component.scss',
})
export class ChartAvgStudentComponent {
	@Input('dataSource') set _dataSource(values: any[]) {
		if (!values) {
			return;
		}

		const results = this.calculateMonthlyAveragesWithEmptyValues(values);
		this.lineChartData.datasets = [];
		results.forEach((student) => {
			this.lineChartData.datasets.push({
				data: student.averages,
				label: student.name,
				backgroundColor: 'rgba(148,159,177,0.2)',
				borderColor: 'rgba(148,159,177,1)',
				pointBackgroundColor: 'rgba(148,159,177,1)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgba(148,159,177,0.8)',
				fill: 'origin',
			});
		});
		this.lineChartData.labels = results[0]?.months;
		this.chart?.update();
	}
	@ViewChild(BaseChartDirective) chart?: BaseChartDirective;

	public lineChartData: ChartConfiguration['data'] = {
		datasets: [],
		labels: [],
	};

	public lineChartOptions: ChartConfiguration['options'] = {
		elements: {
			line: {
				tension: 0.5,
			},
		},
		scales: {
			// We use this empty structure as a placeholder for dynamic theming.
			y: {
				position: 'left',
			},
			y1: {
				position: 'right',
				grid: {
					color: 'rgba(255,0,0,0.3)',
				},
				ticks: {
					color: 'red',
				},
			},
		},

		plugins: {
			legend: { display: true },
		},
	};

	public lineChartType: ChartType = 'line';

	calculateMonthlyAveragesWithEmptyValues(data: Student[]) {
		const studentMap = new Map<
			number,
			{ name: string; gradesByMonth: Map<string, { totalGrade: number; count: number }> }
		>();
		const allMonths = new Set<string>();

		// Aggregate grades by student and month, and collect all unique months
		data.forEach(({ studentId, name, date, grade }) => {
			const month = date.slice(0, 7); // Extract "YYYY-MM" from "YYYY-MM-DD"
			allMonths.add(month); // Add the month to the set of all months

			if (!studentMap.has(studentId)) {
				studentMap.set(studentId, { name, gradesByMonth: new Map() });
			}

			const studentData = studentMap.get(studentId)!;
			if (!studentData.gradesByMonth.has(month)) {
				studentData.gradesByMonth.set(month, { totalGrade: 0, count: 0 });
			}

			const monthData = studentData.gradesByMonth.get(month)!;
			monthData.totalGrade += grade;
			monthData.count += 1;
		});

		// Prepare results with all months, filling missing months with null values
		const results: { studentId: number; name: string; months: string[]; averages: (number | null)[] }[] = [];

		studentMap.forEach(({ name, gradesByMonth }, studentId) => {
			const months: string[] = [];
			const averages: (number | null)[] = [];

			// Sort months to make sure they appear in the correct order
			const sortedMonths = Array.from(allMonths).sort();

			// For each month in the sorted list of all months, calculate the average or insert null if missing
			sortedMonths.forEach((month) => {
				months.push(month);

				if (gradesByMonth.has(month)) {
					const { totalGrade, count } = gradesByMonth.get(month)!;
					averages.push(totalGrade / count); // Calculate average
				} else {
					averages.push(null); // Missing data for this month
				}
			});

			results.push({ studentId, name, months, averages });
		});

		return results;
	}
}
