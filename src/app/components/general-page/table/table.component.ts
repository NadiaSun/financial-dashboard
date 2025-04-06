import { Component } from '@angular/core';
import { CreditDataService } from '../../../core/services/credit-data.service';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  constructor(public creditData: CreditDataService) {}
}
