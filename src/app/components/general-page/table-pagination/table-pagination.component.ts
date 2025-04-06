import { Component } from '@angular/core';
import { NavigationService } from '../../../core/services/navigation.service';
import { CreditDataService } from '../../../core/services/credit-data.service';

@Component({
  selector: 'app-table-pagination',
  imports: [],
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.scss',
})
export class TablePaginationComponent {
  constructor(
    public creditData: CreditDataService,
    public navigation: NavigationService
  ) {}

  public setNextPage(): void {
    const totalPages = this.getTotal();
    if (this.navigation.currentPage() < totalPages) {
      this.navigation.nextPage();
    }
  }

  public setPreviousPage(): void {
    if (this.navigation.currentPage() > 1) {
      this.navigation.previousPage();
    }
  }

  public checkPrevious(): boolean {
    const total = this.getTotal();
    return this.navigation.currentPage() === total;
  }

  public getTotal(): number {
    return Math.ceil(
      this.creditData.filteredUser().length / this.navigation.itemsPerPage()
    );
  }
}
