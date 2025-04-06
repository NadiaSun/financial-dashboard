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
      const actualReturnDate = this.checkDate(user.actual_return_date);
      const issuanceDateFromFilter = this.checkDate(this.issuanceDateFrom());
      const issuanceDateToFilter = this.checkDate(this.issuanceDateTo());
      const returnDateFromFilter = this.checkDate(this.actualReturnDateFrom());
      const returnDateToFilter = this.checkDate(this.actualReturnDateTo());
      const today = new Date();

      if (issuanceDate) {
        if (issuanceDateFromFilter) {
          issuanceFilter = issuanceDateFromFilter < issuanceDate;
        }
        if (issuanceDateToFilter) {
          issuanceFilter = issuanceDate < issuanceDateToFilter;
        }
      }

      if (actualReturnDate) {
        if (returnDateFromFilter) {
          returnFilter = returnDateFromFilter < actualReturnDate;
        }
        if (returnDateToFilter) {
          returnFilter = actualReturnDate < returnDateToFilter;
        }
      }

      if (this.overdueCredits()) {
        console.log('test');
        if (actualReturnDate && returnDate) {
          overdueFilter = actualReturnDate > returnDate;
        } else if (returnDate) {
          overdueFilter = returnDate < today;
        }
      }
      return issuanceFilter && returnFilter && overdueFilter;
    });
  });

  private checkDate = (date: string | null): Date | null =>
    date ? new Date(date) : null;
}
