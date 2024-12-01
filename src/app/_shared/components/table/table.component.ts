import { TitleCasePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-table',
    imports: [MatTableModule, TitleCasePipe, MatPaginatorModule],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit {
	@Input() displayedColumns: string[] = [];
	@Input() pagesSize: number[] = [10];
	@Input('dataSource') set _dataSource(rows: any[] | undefined) {
		this.dataSource = new MatTableDataSource<any[]>(rows || []);
		if (this.paginator) {
			this.dataSource.paginator = this.paginator;
		}
	}
	@Output() selectedRowChanged = new EventEmitter();

	@ViewChild(MatPaginator) paginator?: MatPaginator;

	dataSource: any;
	_selectedRow: any;

	ngAfterViewInit(): void {
		if (this.dataSource) {
			this.dataSource.paginator = this.paginator;
		} else {
			this.dataSource = new MatTableDataSource<any[]>([]);
			this.dataSource.paginator = this.paginator;
		}
	}

	rowClicked(row: any) {
		this._selectedRow =  row;
		this.selectedRowChanged.emit(row);
	}
}
