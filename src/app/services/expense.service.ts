import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// ← Export this so dashboard + table can import it
export interface Expense {
  _id?: string;
  description: string;
  category: string;
  amount: number;
  type: 'expense' | 'income';
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
}

@Injectable({ providedIn: 'root' })
export class ExpenseService {

  private api = 'http://localhost:5000/api/expenses';

  constructor(private http: HttpClient) {}

  getExpenses(category?: string, sort?: string): Observable<Expense[]> {
    let params = new HttpParams();
    if (category) params = params.set('category', category);
    if (sort) params = params.set('sort', sort);
    return this.http.get<Expense[]>(this.api, { params });
  }

  addExpense(data: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.api, data);
  }

  deleteExpense(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}