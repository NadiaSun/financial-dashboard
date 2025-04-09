import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';
import { User } from '../../shared/interfaces/interfaces';
import { ApiService } from './api.service';
import { Subject, first, takeUntil } from 'rxjs';
import { parseDate, parseNullableDate } from '../../shared/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class CreditDataService implements OnDestroy {
  private apiService = inject(ApiService);
  private destroy$ = new Subject<void>();
  private _ = this.apiService
    .getUsers()
    .pipe(first(), takeUntil(this.destroy$))
    .subscribe((data) => {
      this.users.set(data);
    });

  users = signal<User[]>([]);
  issuanceDateFrom = signal<string | null>(null);
  issuanceDateTo = signal<string | null>(null);
  actualReturnDateFrom = signal<string | null>(null);
  actualReturnDateTo = signal<string | null>(null);
  overdueCredits = signal<boolean>(false);

  filteredUser = computed(() => {
    return this.users().filter((user) => {
      const returnDate = parseDate(user.return_date);
      const issuanceDate = parseDate(user.issuance_date);
      const actualReturn = parseNullableDate(user.actual_return_date);
      const issuanceFrom = parseNullableDate(this.issuanceDateFrom());
      const issuanceTo = parseNullableDate(this.issuanceDateTo());
      const returnFrom = parseNullableDate(this.actualReturnDateFrom());
      const returnTo = parseNullableDate(this.actualReturnDateTo());

      const issuanceFilter = this.isIssuanceValid(
        issuanceDate,
        issuanceFrom,
        issuanceTo
      );
      const returnFilter = this.isReturnValid(
        actualReturn,
        returnFrom,
        returnTo
      );
      const overdueFilter = this.isOverdueValid(actualReturn, returnDate);

      return issuanceFilter && returnFilter && overdueFilter;
    });
  });

  private isIssuanceValid(
    issuanceDate: Date,
    issuanceFrom: Date | null,
    issuanceTo: Date | null
  ): boolean {
    if (issuanceFrom && issuanceDate && issuanceDate < issuanceFrom) {
      return false;
    }
    if (issuanceTo && issuanceDate && issuanceDate > issuanceTo) {
      return false;
    }
    return true;
  }

  private isReturnValid(
    actualReturn: Date | null,
    returnFrom: Date | null,
    returnTo: Date | null
  ): boolean {
    if (!actualReturn) {
      if (returnTo) {
        return false;
      }
      if (returnFrom) {
        return false;
      }
    } else {
      if (returnFrom && actualReturn < returnFrom) {
        return false;
      }
      if (returnTo && actualReturn > returnTo) {
        return false;
      }
    }
    return true;
  }

  private isOverdueValid(actualReturn: Date | null, returnDate: Date): boolean {
    if (this.overdueCredits()) {
      const today = new Date();
      if (actualReturn && returnDate) {
        return actualReturn > returnDate;
      } else if (returnDate) {
        return returnDate < today;
      }
    }
    return true;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
