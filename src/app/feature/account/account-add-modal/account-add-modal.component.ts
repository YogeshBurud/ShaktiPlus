import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-account-add-modal',
  imports: [
      MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    NgMultiSelectDropDownModule,
    FormsModule
  ],
  templateUrl: './account-add-modal.component.html',
  styleUrl: './account-add-modal.component.scss'
})
export class AccountAddModalComponent implements OnInit{

    form: FormGroup;
    constructor(private fb : FormBuilder,private dialogRef: MatDialogRef<AccountAddModalComponent>,){}

    ngOnInit(): void {
      this.form = this.fb.group({
        partNumber : [''],
        date : [''],
        totalPrice : [''],
        pendingprice : ['']
      })
    }

  submit(){
    console.log(this.form.value);
     this.dialogRef.close();
    
  }
}
