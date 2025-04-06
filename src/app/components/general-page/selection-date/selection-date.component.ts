import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NgbDate,
  NgbDateStruct,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CreditDataService } from '../../../core/services/credit-data.service';

@Component({
  selector: 'app-selection-date',
  imports: [NgbDatepickerModule],
  providers: [],
  templateUrl: './selection-date.component.html',
  styleUrl: './selection-date.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionDateComponent {
  actualReturnDateFrom: NgbDateStruct | null = null;
  actualReturnDateTo: NgbDateStruct | null = null;

  constructor(public creditData: CreditDataService) {}

  public selectIssuanceFrom(event: NgbDate): void {
    const date: string = this.getDate(event);
    this.creditData.issuanceDateFrom.set(date);
  }

  public changeIssuanceFrom(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (this.checkDate(target.value)) {
      this.creditData.issuanceDateFrom.set(target.value);
    } else {
      this.creditData.issuanceDateFrom.set('');
    }
  }

  public selectIssuanceTo(event: NgbDate): void {
    const date: string = this.getDate(event);
    this.creditData.issuanceDateTo.set(date);
  }

  public changeIssuanceTo(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (this.checkDate(target.value)) {
      this.creditData.issuanceDateTo.set(target.value);
    } else {
      this.creditData.issuanceDateTo.set('');
    }
  }

  public selectReturnTo(event: NgbDate): void {
    const date: string = this.getDate(event);
    this.creditData.actualReturnDateTo.set(date);
  }

  public changeReturnTo(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (this.checkDate(target.value)) {
      this.creditData.actualReturnDateTo.set(target.value);
    } else {
      this.creditData.actualReturnDateTo.set('');
    }
  }

  public changeOverdueCredits(): void {
    this.creditData.overdueCredits.update((value) => !value);
  }

  public selectReturnFrom(event: NgbDate): void {
    const date: string = this.getDate(event);
    this.creditData.actualReturnDateFrom.set(date);
  }

  public changeReturnFrom(event: Event) {
    const target = event.target as HTMLInputElement;

    if (this.checkDate(target.value)) {
      this.creditData.actualReturnDateFrom.set(target.value);
    } else {
      this.creditData.actualReturnDateFrom.set('');
    }
  }

  private getDate(obj: NgbDate): string {
    const date = Object.values(obj);
    return date.join('-');
  }

  private checkDate(value: string): boolean {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }
}
