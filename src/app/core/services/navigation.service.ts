import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(10);

  nextPage(): void {
    this.currentPage.update((value) => value + 1);
  }

  previousPage(): void {
    this.currentPage.update((value) => value - 1);
  }
}
