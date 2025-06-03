import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

import CAR_LIST from '../../../../../assets/data/carList.json';
import { DashboardDataServiceService } from '../../service/dashboard-data-service.service';

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
  constructor(
    private dashboardDataService: DashboardDataServiceService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DashboardAddInventeryModalComponent>
  ) {
    this.form = this.fb.group({
      partNumber: [''],
      partName: [''],
      singlePrice: [''],
      availability: [''],
      carModel: [''],
      fuelType: [''],
      totalAmount: [''],
    });
  }

  submit() {
    if (this.form.valid) {
      const payload = {
        partNumber: this.form.value.partNumber,
        partName: this.form.value.partName,
        carsModel: Array.isArray(this.form.value.carModel)
          ? this.form.value.carModel
          : [this.form.value.carModel], // ensure array
        totalQuantity: Number(this.form.value.totalAmount),
        availableQuantity: Number(this.form.value.availability),
        sellOutQuantity: 0, // default or get from form if needed
        price: Number(this.form.value.singlePrice)
      };

      // Call the service to add inventory data

      this.dashboardDataService.addDashboardTableItem(payload).subscribe((updatedData :any) => {
        this.dialogRef.close(payload); // Pass payload to parent
       });

    } else {
      this.dialogRef.close();
    }
  }
}
