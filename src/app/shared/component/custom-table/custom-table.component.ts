import { AfterViewInit, Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DashboardAddInventeryModalComponent } from '../../../feature/dashboard/component/dashboard-add-inventery-modal/dashboard-add-inventery-modal.component';
import { MatButtonModule } from '@angular/material/button';

import { CommonModule } from '@angular/common';

import { DashboardTableData } from '../../../feature/dashboard/model/dashboard-table-model'
import { DashboardDataServiceService } from '../../../feature/dashboard/service/dashboard-data-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-custom-table',
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss'
})
export class CustomTableComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['partNumber', 'partName', 'carsModel', 'totalQuantity', 'availableQuantity', 'sellOutQuantity', 'price', 'Action'];
  //dataSource = new MatTableDataSource<DashboardTableData>(DASHBOARD_TABLE_DATA);
  @Input() dataSource: MatTableDataSource<DashboardTableData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  readonly dilog = inject(MatDialog)

  constructor(private dialog: MatDialog,
    private dashboardDataService: DashboardDataServiceService, // Inject your data service here
     private toastr: ToastrService
  ) {
    // Initialize the dataSource with an empty array or with data if available
    this.dataSource = new MatTableDataSource<DashboardTableData>([]);
  }

  ngOnInit() {
    // Fetch the initial data for the table
    this.getDashboardTableData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // getDashboardTableData 
  getDashboardTableData() {
    this.dashboardDataService.getDashboardTableData().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // open dilog button
  openDialog() {
    const dialogRef = this.dialog.open(DashboardAddInventeryModalComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Add the new row to the dataSource first position
        this.dataSource.data.unshift(result);
        this.dataSource._updateChangeSubscription(); // Update the data source
      }
    });
  }

  // Action button logics
  onEdit(row: any) {
    this.openDialog();

    //assign the row data to the dialog component
    const dialogRef = this.dialog.open(DashboardAddInventeryModalComponent, {
      width: '700px',
      data: row // Pass the row data to the dialog
    }); 
    
  }

  onDelete(row: any): void {
    if (confirm('Are you sure you want to delete this item?')) {
      const index = this.dataSource.data.findIndex(item => item.partNumber === row.partNumber);
      if (index !== -1) {
        // Remove the item from the data source
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription(); // Update the data source
        // Call the delete service method
        this.dashboardDataService.deleteDashboardTableItem(row.partNumber).subscribe({
          next: () => {
             this.toastr.success('Product Deleted successfully', 'Success', {
            timeOut: 3000,
          });
          },
          error: (error) => {
            this.toastr.error(error.error.error, 'Failed to delete product', {
              timeOut: 3000,
            });
          }
        });
      }
    }
  }


}

