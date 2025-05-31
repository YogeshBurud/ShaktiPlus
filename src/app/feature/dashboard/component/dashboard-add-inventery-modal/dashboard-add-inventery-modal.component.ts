import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';

import CAR_LIST from '../../../../data/carList.json';

const FUEL_TYPE_LIST = [
  { value: 'petrol', viewValue: 'Petrol' },
  { value: 'diesel', viewValue: 'Diesel' },
  { value: 'electric', viewValue: 'Electric' },
  { value: 'hybrid', viewValue: 'Hybrid' }
];

@Component({
  selector: 'app-dashboard-add-inventery-modal',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './dashboard-add-inventery-modal.component.html',
  styleUrl: './dashboard-add-inventery-modal.component.scss'
})
export class DashboardAddInventeryModalComponent {

  carModelList: any[] = CAR_LIST;
  fuelTypeList = FUEL_TYPE_LIST;

  form: FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<DashboardAddInventeryModalComponent>) {
    this.form = this.fb.group({
      partnumber: [''],
      description: [''],
      singlePrice: [''],
      availability: [''],
      carModel: [''],
      fuelType: [''],
      totalAmount: [''],
    });
  }

  submit() {
    console.log(this.form.value);
    this.dialogRef.close('submitted');
  }
}
