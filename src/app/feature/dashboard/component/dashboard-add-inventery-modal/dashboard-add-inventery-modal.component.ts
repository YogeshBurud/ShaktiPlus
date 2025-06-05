import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

import { DashboardDataServiceService } from '../../service/dashboard-data-service.service';
import { ToastrService } from 'ngx-toastr';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

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
    MatSelectModule,
    NgMultiSelectDropDownModule,
    FormsModule
  ],
  templateUrl: './dashboard-add-inventery-modal.component.html',
  styleUrl: './dashboard-add-inventery-modal.component.scss'
})
export class DashboardAddInventeryModalComponent {

  carModelList: any[] = [];
  stoerdData: any[] = []


  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  showCarModelInput: boolean = false;


  form: FormGroup;
  constructor(
    private dashboardDataService: DashboardDataServiceService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DashboardAddInventeryModalComponent>,
    private toastr: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      partNumber: ['', Validators.required],
      partName: [''],
      singlePrice: [''],
      availability: [''],
      carModel: [''],
      totalAmount: [''],
    });
  }

  submit() {
    if (this.form.valid) {

      const payload = {
        partNumber: this.form.value.partNumber,
        partName: this.form.value.partName,
        carsModel: Array.isArray(this.selectedItems) ? this.selectedItems : [],
        totalQuantity: Number(this.form.value.totalAmount),
        availableQuantity: Number(this.form.value.availability),
        sellOutQuantity: 0, // default or get from form if needed
        price: Number(this.form.value.singlePrice)
      };

      // Call the service to add inventory data

      this.dashboardDataService.addDashboardTableItem(payload).subscribe({
        next: (updatedData: any) => {
          this.toastr.success('Product added successfully', 'Success', {
            timeOut: 3000,
          });

          this.dialogRef.close(payload); // Pass payload to parent
        },
        error: (err: any) => {
          this.toastr.error(err.error.error, 'Failed to Add Product', {
            timeOut: 3000,
          });
        }
      });

    } else {
      this.dialogRef.close();
    }
  }

  ngOnInit() {

    // Fetch car model list from the service
    this.getAllCarModelList();

    this.selectedItems = [];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      defaultOpen: false,
    };

    // assign table row data to the form if it exists
    if (this.dialogRef.componentInstance) {
      const rowData = this.dialogRef.componentInstance?.data;

      if (rowData) {
        this.selectedItems = rowData.carsModel || []; // Ensure selectedItems is an array
        this.form.patchValue({
          partNumber: rowData.partNumber,
          partName: rowData.partName,
          singlePrice: rowData.price,
          availability: rowData.availableQuantity,
          totalAmount: rowData.totalQuantity
        });
      }
    }

  }


  getAllCarModelList() {
    this.dashboardDataService.getCarModelList().subscribe({
      next: (data: any[]) => {
        this.carModelList = data;
      },
      error: (err: any) => {
        this.toastr.error('Failed to load car models', 'Error', {
          timeOut: 3000,
        });
      }
    });
  }

  cancel() {
    this.dialogRef.close(); // Close the dialog without saving
  }


  toggleAddCarModel() {
    this.showCarModelInput = !this.showCarModelInput;
  }

  addCarModel(event: any) {
    event.preventDefault(); // Prevent default form submission
    this.showCarModelInput = !this.showCarModelInput;

    let carModelObj = {
      id: this.carModelList.length + 1,
      name: this.form.value.carModel,
    };

    this.dashboardDataService.addCarModel(carModelObj).subscribe({
      next: (data: any) => {

        const confirmed = confirm('Please confirm car model and Fuel Type');
        if (!confirmed) {
          return; // Stop if user cancels
        }

        this.carModelList = data;

        this.toastr.success('Car model added successfully', 'Success', {
          timeOut: 3000,
        });

      },
      error: (err: any) => {
        this.toastr.error(`'Failed to add car model, ${err.error.error}'`, 'Error', {
          timeOut: 3000,
        });
      }
    });

    this.form.patchValue({ carModel: '' }); // Reset the input field

  }

  onItemSelect(event: any) {
    this.getAllCarModelList(); // Refresh the car model list
  }


}
