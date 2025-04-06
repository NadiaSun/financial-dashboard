import { Component } from '@angular/core';
import { CreditTableComponent } from '../credit-table/credit-table.component';
import { SelectionDateComponent } from '../selection-date/selection-date.component';

@Component({
  selector: 'app-table-container',
  standalone: true,
  imports: [CreditTableComponent, SelectionDateComponent],
  templateUrl: './table-container.component.html',
  styleUrl: './table-container.component.scss',
})
export class TableContainerComponent {}
