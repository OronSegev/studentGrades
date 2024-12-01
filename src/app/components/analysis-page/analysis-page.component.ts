import { Component, inject, OnInit } from '@angular/core';
import { CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';
import { ChartAvgIdComponent } from './components/chart-avg-id/chart-avg-id.component';
import { ChartAvgStudentComponent } from './components/chart-avg-student/chart-avg-student.component';
import { ChartAvgSubjectComponent } from './components/chart-avg-subject/chart-avg-subject.component';
import { ChartsFilterComponent } from './components/charts-filter/charts-filter.component';
import { MatButtonModule } from '@angular/material/button';
import { AnalysisPageService } from './services/analysis-page.service';

@Component({
    selector: 'app-analysis-page',
    imports: [
        ChartsFilterComponent,
        ChartAvgSubjectComponent,
        ChartAvgStudentComponent,
        ChartAvgIdComponent,
        MatButtonModule,
        DragDropModule,
    ],
    templateUrl: './analysis-page.component.html',
    styleUrl: './analysis-page.component.scss'
})
export class AnalysisPageComponent implements OnInit {
	analysisService = inject(AnalysisPageService);

	studentsGrades = this.analysisService.studentsGrades;
	studentsGradesWithFilter = this.analysisService.studentsGradesWithFilter;
	idsList = this.analysisService.idsList;
	subjectsList = this.analysisService.subjectsList;


	ngOnInit(): void {
		this.analysisService.getStudentData();
	}

	idsChanged(ids: number[]) {
		this.analysisService.setIdsFilter(ids);
	}

	subjectsChanged(subjects: string[]) {
		this.analysisService.setSubjectFilter(subjects);
	}
}
