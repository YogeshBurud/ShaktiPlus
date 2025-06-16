import { Component, EventEmitter, Inject, Output } from '@angular/core';
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

  headTitle: string = 'Add Product';
  isProductUpdate: boolean = false;
  carModelList: any[] = [];
  stoerdData: any[] = []

  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  showCarModelInput: boolean = false;
  totalQuantity: number = 0;

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
      totalQuantity: [''],
      sellOutQuantity: ['']
    });
  }

 onSubmit(event: MouseEvent)  {

    if (this.form.valid) {
      const payload = {
        partNumber: this.form.value.partNumber || 0,
        partName: this.form.value.partName || 0,
        carsModel: Array.isArray(this.selectedItems) ? this.selectedItems : [],
        totalQuantity: Number(this.form.value.totalQuantity) || 0,
        availableQuantity: Number(this.form.value.availability) || 0,
        sellOutQuantity: Number(this.form.value.sellOutQuantity) || 0, // Default to 0 if not provided
        price: Number(this.form.value.singlePrice) || 0
      };

      // console.log('Payload:', payload);

      if (this.dialogRef.componentInstance?.data) {
        this.dashboardDataService.updateDashboardTableItem(payload).subscribe({
          next: (updatedData: any) => {
            this.toastr.success('Product updated successfully', 'Success', {
              timeOut: 3000,
            });

            this.dialogRef.close(payload); // Pass payload to parent

          },
          error: (err: any) => {
            this.toastr.error(err.error.error, 'Failed to Update Product', {
              timeOut: 3000,
            });
          }
        });
      }
      else {
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
      }
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

    };

    // assign table row data to the form if it exists
    if (this.dialogRef.componentInstance) {
      const rowData = this.dialogRef.componentInstance?.data;

      if (rowData) {
        this.headTitle = 'Update Product';
        this.isProductUpdate = true; // Set to true for update mode
        this.selectedItems = rowData.carsModel || []; // Ensure selectedItems is an array
        this.form.patchValue({
          partNumber: rowData.partNumber || '',
          partName: rowData.partName || '',
          singlePrice: rowData.price || 0,
          availability: rowData.availableQuantity || 0,
          totalQuantity: rowData.totalQuantity || 0,
          sellOutQuantity: rowData.sellOutQuantity || 0,
        });
        this.totalQuantity = Number(this.form.value.totalQuantity);
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

  // updateAvailableQty(event: any) {

  //   let sellOutQuantity = Number(event.target.value) || 0;

  //   // Ensure available quantity does not go below zero
  //   if (this.totalQuantity - sellOutQuantity <= 1) {
  //     this.toastr.error('Sell out quantity cannot exceed total quantity', 'Error', {
  //       timeOut: 3000,
  //     });
  //     this.form.patchValue({ sellOutQuantity: 0 }); // Reset sell out quantity
  //     return;
  //   }

  //   // Update available quantity based on total and sell out quantities
  //   this.form.patchValue({
  //     availability: this.totalQuantity - sellOutQuantity,
  //     sellOutQuantity: sellOutQuantity
  //   });


  // }

  updateAvailableQty(event: any) {
  const sellOutQuantity = Number(event.target.value) || 0;
  const totalQuantity = Number(this.form.value.totalQuantity) || 0;

  if (sellOutQuantity > totalQuantity) {
     this.toastr.clear(); 
    this.toastr.error('Sell out quantity cannot exceed total quantity', 'Error', {
      timeOut: 3000,
    });

    // Reset the invalid sellOutQuantity and availability
    this.form.patchValue({
      sellOutQuantity: 0,
      availability: totalQuantity
    });

    return;
  }

  // Calculate and update availability
  const availability = totalQuantity - sellOutQuantity;

  this.form.patchValue({
    sellOutQuantity: sellOutQuantity,
    availability: availability
  });
}




}
