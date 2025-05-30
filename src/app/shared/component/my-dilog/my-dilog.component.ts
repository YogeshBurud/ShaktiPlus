import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-my-dilog',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  templateUrl: './my-dilog.component.html',
  styleUrl: './my-dilog.component.scss'
})
export class MyDilogComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<MyDilogComponent>) {
    this.form = this.fb.group({
      partnumber : [''],
      description: [''],
      singlePrice: [''],
      available: [''],
      cars: [''],
      totalAmount: [''],
    });
  }

  submit() {
    console.log(this.form.value);
    this.dialogRef.close('submitted');
  }
}
