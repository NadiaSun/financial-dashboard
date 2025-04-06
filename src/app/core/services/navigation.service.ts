import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(10);

  constructor() {}

  public nextPage(): void {
    this.currentPage.update((value) => value + 1);
  }

  public previousPage(): void {
    this.currentPage.update((value) => value - 1);
  }
}
