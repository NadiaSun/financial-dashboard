import { Injectable, computed, signal } from '@angular/core';
import { User } from '../../shared/interfaces/interfaces';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CreditDataService {
  public users = signal<User[]>([]);
  public issuanceDateFrom = signal<string | null>(null);
  public issuanceDateTo = signal<string | null>(null);
  public actualReturnDateFrom = signal<string | null>(null);
  public actualReturnDateTo = signal<string | null>(null);
  public overdueCredits = signal<boolean>(false);

  constructor(private apiService: ApiService) {
    this.apiService.getUsers().subscribe((data) => {
      this.users.set(data);
    });
  }

  public filteredUser = computed(() => {
    return this.users().filter((user) => {
      let overdueFilter: boolean = true;
      let returnFilter: boolean = true;
      let issuanceFilter: boolean = true;

      const returnDate = this.checkDate(user.return_date);
      const issuanceDate = this.checkDate(user.issuance_date);
      const actualReturnDate = this.checkNull(user.actual_return_date);
      const issuanceDateFromFilter = this.checkNull(this.issuanceDateFrom());
      const issuanceDateToFilter = this.checkNull(this.issuanceDateTo());
      const returnDateFromFilter = this.checkNull(this.actualReturnDateFrom());
      const returnDateToFilter = this.checkNull(this.actualReturnDateTo());
      const today = new Date();

      if (
        issuanceDateFromFilter &&
        issuanceDate &&
        issuanceDate < issuanceDateFromFilter
      ) {
        issuanceFilter = false;
      }

      if (
        issuanceDateToFilter &&
        issuanceDate &&
        issuanceDate > issuanceDateToFilter
      ) {
        issuanceFilter = false;
      }

      if (
        returnDateFromFilter &&
        actualReturnDate &&
        actualReturnDate < returnDateFromFilter
      ) {
        returnFilter = false;
      }
      if (returnDateFromFilter && !actualReturnDate) {
        returnFilter = false;
      }

      if (
        returnDateToFilter &&
        actualReturnDate &&
        actualReturnDate > returnDateToFilter
      ) {
        returnFilter = false;
      }

      if (this.overdueCredits()) {
        if (actualReturnDate && returnDate) {
          overdueFilter = actualReturnDate > returnDate;
        } else if (returnDate) {
          overdueFilter = returnDate < today;
        }
      }
      return issuanceFilter && returnFilter && overdueFilter;
    });
  });

  private checkDate = (date: string): Date => new Date(date);

  private checkNull(value: string | null): Date | null {
    if (value) {
      return this.checkDate(value);
    } else {
      return null;
    }
  }
}
