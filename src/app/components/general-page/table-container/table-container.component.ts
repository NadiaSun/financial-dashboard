import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-table-container',
  imports: [TableComponent],
  templateUrl: './table-container.component.html',
  styleUrl: './table-container.component.scss',
})
export class TableContainerComponent {}
