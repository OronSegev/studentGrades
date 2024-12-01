import { Component } from '@angular/core';
import { ChartAvgIdComponent } from '../analysis-page/components/chart-avg-id/chart-avg-id.component';
import { ChartAvgStudentComponent } from '../analysis-page/components/chart-avg-student/chart-avg-student.component';
import { ChartAvgSubjectComponent } from '../analysis-page/components/chart-avg-subject/chart-avg-subject.component';
import { ChartsFilterComponent } from '../analysis-page/components/charts-filter/charts-filter.component';

@Component({
    selector: 'app-monitor-page',
    standalone: true,
    imports: [ChartsFilterComponent, ChartAvgSubjectComponent, ChartAvgStudentComponent, ChartAvgIdComponent],
    templateUrl: './monitor-page.component.html',
    styleUrl: './monitor-page.component.scss'
})
export class MonitorPageComponent {

}
