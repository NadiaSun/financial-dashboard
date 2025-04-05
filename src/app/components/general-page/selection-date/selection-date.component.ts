import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CreditDataService } from '../../../core/services/credit-data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-selection-date',
  imports: [
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    DatePipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './selection-date.component.html',
  styleUrl: './selection-date.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionDateComponent {
  constructor(public creditData: CreditDataService) {}

  changeIssuanceFrom(event: MatDatepickerInputEvent<any, any>): void {
    console.log(event.value);
    this.creditData.issuanceDateFrom.set(event.value);
  }
  changeIssuanceTo(event: MatDatepickerInputEvent<any, any>): void {
    this.creditData.issuanceDateTo.set(event.value);
  }
  changeReturnFrom(event: MatDatepickerInputEvent<any, any>): void {
    this.creditData.actualReturnDateFrom.set(event.value);
  }
  changeReturnTo(event: MatDatepickerInputEvent<any, any>): void {
    this.creditData.actualReturnDateTo.set(event.value);
  }

  changeOverdueCredits() {
    this.creditData.overdueCredits.update((value) => !value);
  }
}
