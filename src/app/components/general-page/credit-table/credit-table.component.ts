import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CreditDataService } from '../../../core/services/credit-data.service';
import { NavigationService } from '../../../core/services/navigation.service';
import { User } from '../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-table',
  imports: [],
  standalone: true,
  templateUrl: './credit-table.component.html',
  styleUrl: './credit-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditTableComponent {
  private navigation = inject(NavigationService);
  creditData = inject(CreditDataService);

  getPaginatedData(): User[] {
    const startIndex =
      (this.navigation.currentPage() - 1) * this.navigation.itemsPerPage();
    const endIndex = startIndex + this.navigation.itemsPerPage();
    return this.creditData.filteredUser().slice(startIndex, endIndex);
  }
}
