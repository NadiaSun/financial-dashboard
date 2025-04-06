import { Component } from '@angular/core';
import { CreditDataService } from '../../../core/services/credit-data.service';

@Component({
  selector: 'app-table',
  imports: [],
  standalone: true,
  templateUrl: './credit-table.component.html',
  styleUrl: './credit-table.component.scss',
})
export class CreditTableComponent {
  constructor(public creditData: CreditDataService) {}
}
