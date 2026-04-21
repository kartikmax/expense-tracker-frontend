import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatTooltipModule } from '@angular/material/tooltip';
import { Expense } from '../../services/expense.service';

// export interface Expense {
//   description: string;
//   category: string;
//   amount: number;
//   type: 'expense' | 'income';
//   status: 'Completed' | 'Pending' | 'Failed';
//   date: string;
// }

@Component({
  selector: 'app-expense-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule
  ],
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.scss']
})
export class ExpenseTableComponent implements OnChanges, AfterViewInit {

  @Input() dataSource: Expense[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = ['description', 'category', 'amount', 'status', 'date', 'actions'];
  tableData = new MatTableDataSource<Expense>();

  // Dummy data used when no input is passed
  private dummyData: Expense[] = [
    { description: 'Grocery Store', category: 'Food', amount: -85.50, type: 'expense', status: 'Completed', date: '2025-05-28' },
    { description: 'Salary Deposit', category: 'Income', amount: 3200.00, type: 'income', status: 'Pending', date: '2025-06-01' },
    { description: 'Gas Station', category: 'Transportation', amount: -45.20, type: 'expense', status: 'Completed', date: '2025-06-15' },
    { description: 'Online Shopping', category: 'Shopping', amount: -129.99, type: 'expense', status: 'Completed', date: '2025-06-30' },
    { description: 'Restaurant Bill', category: 'Dining', amount: -78.50, type: 'expense', status: 'Completed', date: '2025-07-10' },
    { description: 'Gym Membership', category: 'Health', amount: -49.00, type: 'expense', status: 'Pending', date: '2025-07-15' },
    { description: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, type: 'expense', status: 'Completed', date: '2025-07-18' },
    { description: 'Freelance Payment', category: 'Income', amount: 1500.00, type: 'income', status: 'Completed', date: '2025-07-20' },
    { description: 'Electricity Bill', category: 'Utilities', amount: -112.00, type: 'expense', status: 'Failed', date: '2025-07-22' },
    { description: 'Book Purchase', category: 'Education', amount: -34.00, type: 'expense', status: 'Completed', date: '2025-07-25' },
  ];

  ngOnChanges() {
    this.tableData.data = this.dataSource.length ? this.dataSource : this.dummyData;
  }

  ngAfterViewInit() {
    this.tableData.sort = this.sort;
    this.tableData.paginator = this.paginator;
    if (!this.dataSource.length) {
      this.tableData.data = this.dummyData;
    }
  }

  getStatusIcon(status: string): string {
    return status === 'Completed' ? 'check_circle' : status === 'Pending' ? 'schedule' : 'cancel';
  }

  // getCategoryIcon(category: string): string {
  //   const map: Record<string, string> = {
  //     Food: 'restaurant', Income: 'trending_up', Transportation: 'directions_car',
  //     Shopping: 'shopping_bag', Dining: 'local_dining', Health: 'favorite',
  //     Entertainment: 'movie', Utilities: 'bolt', Education: 'school', Traveling: 'flight'
  //   };
  //   return map[category] ?? 'category';
  // }



// Add these methods to the class:
applyFilter(event: Event) {
  const val = (event.target as HTMLInputElement).value;
  this.tableData.filter = val.trim().toLowerCase();
}

getCategoryIcon(category: string): string {
  const map: Record<string, string> = {
    Food: 'restaurant', Income: 'trending_up', Transportation: 'directions_car',
    Shopping: 'shopping_bag', Dining: 'local_dining', Health: 'favorite',
    Entertainment: 'movie', Utilities: 'bolt', Education: 'school'
  };
  return map[category] ?? 'category';
}

getCategoryBg(category: string): string {
  const map: Record<string, string> = {
    Food: '#fef3c7', Income: '#dcfce7', Transportation: '#dbeafe',
    Shopping: '#ede9fe', Dining: '#fff7ed', Health: '#fee2e2',
    Entertainment: '#f3e8ff', Utilities: '#fef9c3', Education: '#e0f2fe'
  };
  return map[category] ?? '#f3f4f6';
}

getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    Food: '#d97706', Income: '#16a34a', Transportation: '#3b82f6',
    Shopping: '#7c3aed', Dining: '#ea580c', Health: '#ef4444',
    Entertainment: '#9333ea', Utilities: '#ca8a04', Education: '#0284c7'
  };
  return map[category] ?? '#6b7280';
}
}