import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-summary-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.scss']
})
export class SummaryCardsComponent {

  @Input() data!: {
    totalBalance: number;
    monthlyExpense: number;
    upcomingBills: number;
    savings: number;
  };

}