import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs'; // Import MatTabsModule
import { RouterOutlet } from '@angular/router';
import { DataPageComponent } from './components/data-page/data-page.component';
import { AnalysisPageComponent } from './components/analysis-page/analysis-page.component';
import { MonitorPageComponent } from './components/monitor-page/monitor-page.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MatTabsModule, MonitorPageComponent, AnalysisPageComponent, DataPageComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: []
})
export class AppComponent {
	title = 'studentApp';
}
