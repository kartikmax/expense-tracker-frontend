import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

// Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // Material
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    MatNativeDateModule,
    MatDialogModule,   // ← fixes mat-dialog-actions & mat-dialog-content
  ],
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent {

  expenseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ExpenseFormComponent>
  ) {
    this.expenseForm = this.fb.group({
      type: ['expense'],
      amount: ['', [Validators.required, Validators.min(1)]],
      description: [''],
      category: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  submit() {
    if (this.expenseForm.valid) {
      this.dialogRef.close(this.expenseForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}