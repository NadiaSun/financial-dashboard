import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { SelectionDateComponent } from '../selection-date/selection-date.component';

@Component({
  selector: 'app-table-container',
  imports: [TableComponent, SelectionDateComponent],
  templateUrl: './table-container.component.html',
  styleUrl: './table-container.component.scss',
})
export class TableContainerComponent {}
