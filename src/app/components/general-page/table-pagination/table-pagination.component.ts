import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { NavigationService } from '../../../core/services/navigation.service';
import { CreditDataService } from '../../../core/services/credit-data.service';

@Component({
  selector: 'app-table-pagination',
  imports: [],
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePaginationComponent {
  creditData = inject(CreditDataService);
  navigation = inject(NavigationService);

  page = computed(() => {
    this.navigation.currentPage();
    if (this.getTotal() === 0) {
      return 0;
    } else {
      return this.navigation.currentPage();
    }
  });

  setNextPage(): void {
    const totalPages = this.getTotal();
    if (this.navigation.currentPage() < totalPages) {
      this.navigation.nextPage();
    }
  }

  setPreviousPage(): void {
    if (this.navigation.currentPage() > 1) {
      this.navigation.previousPage();
    }
  }

  checkPrevious(): boolean {
    const total = this.getTotal();
    return this.navigation.currentPage() === total;
  }

  getTotal(): number {
    return Math.ceil(
      this.creditData.filteredUser().length / this.navigation.itemsPerPage()
    );
  }
}
