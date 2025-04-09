import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  NgbDate,
  NgbDateStruct,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CreditDataService } from '../../../core/services/credit-data.service';
import { checkDate, getDate } from '../../../shared/utils/utils';

@Component({
  selector: 'app-selection-date',
  imports: [NgbDatepickerModule],
  providers: [],
  templateUrl: './selection-date.component.html',
  styleUrl: './selection-date.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionDateComponent {
  creditData = inject(CreditDataService);

  actualReturnDateFrom: NgbDateStruct | null = null;
  actualReturnDateTo: NgbDateStruct | null = null;

  selectIssuanceFrom(event: NgbDate): void {
    const date = getDate(event);
    this.creditData.issuanceDateFrom.set(date);
  }

  changeIssuanceFrom(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (checkDate(target.value)) {
      this.creditData.issuanceDateFrom.set(target.value);
    } else {
      this.creditData.issuanceDateFrom.set('');
    }
  }

  selectIssuanceTo(event: NgbDate): void {
    const date = getDate(event);
    this.creditData.issuanceDateTo.set(date);
  }

  changeIssuanceTo(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (checkDate(target.value)) {
      this.creditData.issuanceDateTo.set(target.value);
    } else {
      this.creditData.issuanceDateTo.set('');
    }
  }

  selectReturnTo(event: NgbDate): void {
    const date = getDate(event);
    this.creditData.actualReturnDateTo.set(date);
  }

  changeReturnTo(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (checkDate(target.value)) {
      this.creditData.actualReturnDateTo.set(target.value);
    } else {
      this.creditData.actualReturnDateTo.set('');
    }
  }

  changeOverdueCredits(): void {
    this.creditData.overdueCredits.update((value) => !value);
  }

  selectReturnFrom(event: NgbDate): void {
    const date = getDate(event);
    this.creditData.actualReturnDateFrom.set(date);
  }

  changeReturnFrom(event: Event) {
    const target = event.target as HTMLInputElement;

    if (checkDate(target.value)) {
      this.creditData.actualReturnDateFrom.set(target.value);
    } else {
      this.creditData.actualReturnDateFrom.set('');
    }
  }
}
