import { Component } from '@angular/core';
import { CreditTableComponent } from '../credit-table/credit-table.component';
import { SelectionDateComponent } from '../selection-date/selection-date.component';
import { TablePaginationComponent } from '../table-pagination/table-pagination.component';

@Component({
  selector: 'app-table-container',
  standalone: true,
  imports: [
    CreditTableComponent,
    SelectionDateComponent,
    TablePaginationComponent,
  ],
  templateUrl: './table-container.component.html',
  styleUrl: './table-container.component.scss',
})
export class TableContainerComponent {}
