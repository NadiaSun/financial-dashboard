import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/table',
    pathMatch: 'full',
  },
  {
    path: 'table',
    loadComponent: () =>
      import(
        './components/general-page/table-container/table-container.component'
      ).then((m) => m.TableContainerComponent),
  },
  {
    path: 'info',
    loadComponent: () =>
      import(
        './components/information-page/info-container/info-container.component'
      ).then((m) => m.InfoContainerComponent),
  },
];
