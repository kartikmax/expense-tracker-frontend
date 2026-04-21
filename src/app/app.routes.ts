import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'add-expense', component: ExpenseFormComponent }
];