import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ExpenseService, Expense } from '../../services/expense.service';
import { SummaryCardsComponent } from '../../components/summary-cards/summary-cards.component';
import { ExpenseTableComponent } from '../../components/expense-table/expense-table.component';
import { ChartsComponent } from '../../components/charts/charts.component';
import { ExpenseFormComponent } from '../../components/expense-form/expense-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule, MatDialogModule, MatButtonModule, MatIconModule,
    SummaryCardsComponent, ExpenseTableComponent, ChartsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  expenses: Expense[] = [];

  // Summary cards — computed dynamically
  summaryData = {
    totalBalance: 0,
    monthlyExpense: 0,
    upcomingBills: 0,
    savings: 0
  };

  // Pie chart — computed dynamically
  categoryChartData: { labels: string[], series: number[], colors: string[] } = {
    labels: [], series: [], colors: []
  };

  constructor(
    private dialog: MatDialog,
    private expenseService: ExpenseService
  ) {}

  ngOnInit() {
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe({
      next: (data) => {
        this.expenses = data;
        this.computeSummary();
        this.computeChartData();
      },
      error: (err) => console.error('Failed to load expenses:', err)
    });
  }

  computeSummary() {
    const totalExpense = this.expenses
      .filter(e => e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0);

    const totalIncome = this.expenses
      .filter(e => e.type === 'income')
      .reduce((sum, e) => sum + e.amount, 0);

    const pending = this.expenses
      .filter(e => e.status === 'Pending')
      .reduce((sum, e) => sum + e.amount, 0);

    const savings = totalIncome > 0
      ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100)
      : 0;

    this.summaryData = {
      totalBalance: Math.round(totalExpense),
      monthlyExpense: Math.round(totalIncome),
      upcomingBills: Math.round(pending),
      savings: savings < 0 ? 0 : savings
    };
  }

  computeChartData() {
    // Group expenses by category
    const categoryMap: Record<string, number> = {};

    this.expenses
      .filter(e => e.type === 'expense')
      .forEach(e => {
        categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
      });

    const total = Object.values(categoryMap).reduce((s, v) => s + v, 0);

    const colorPalette = [
      '#f59e0b', '#ef4444', '#6366f1', '#10b981',
      '#3b82f6', '#ec4899', '#14b8a6', '#f97316'
    ];

    const labels = Object.keys(categoryMap);
    const series = labels.map(k => Math.round((categoryMap[k] / total) * 100));
    const colors = labels.map((_, i) => colorPalette[i % colorPalette.length]);

    this.categoryChartData = { labels, series, colors };
  }

  openExpenseDialog() {
    const dialogRef = this.dialog.open(ExpenseFormComponent, { width: '420px' });

    dialogRef.afterClosed().subscribe((data: Expense) => {
      if (data) {
        this.expenseService.addExpense(data).subscribe({
          next: (saved) => {
            this.expenses = [saved, ...this.expenses];
            this.computeSummary();
            this.computeChartData();
          },
          error: (err) => console.error('Failed to save:', err)
        });
      }
    });
  }
}