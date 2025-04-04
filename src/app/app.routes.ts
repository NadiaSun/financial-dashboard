import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TableContainerComponent } from './components/general-page/table-container/table-container.component';
import { InfoContainerComponent } from './components/information-page/info-container/info-container.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/table',
    pathMatch: 'full',
  },
  { path: 'table', component: TableContainerComponent },
  { path: 'info', component: InfoContainerComponent },
];
