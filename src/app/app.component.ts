import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

// Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component";
import { ExpenseFormComponent } from "./components/expense-form/expense-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    DashboardComponent,
    ExpenseFormComponent
],
  templateUrl: './app.component.html'
})
export class AppComponent {}