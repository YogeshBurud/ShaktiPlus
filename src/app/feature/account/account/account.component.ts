import { AfterViewInit, Component, inject, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DashboardAddInventeryModalComponent } from '../../../feature/dashboard/component/dashboard-add-inventery-modal/dashboard-add-inventery-modal.component';
import { MatButtonModule } from '@angular/material/button';
import ACCOUNT_TABLE_DATA from '../../../../assets/data/account-table-data.json';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { AccountAddModalComponent } from '../account-add-modal/account-add-modal.component';

export interface AccountTableData {
  partNumber: any;
  partName: any;
  createDate : any;
  updatedDate : any;
  name : any;
  number : any;

}
@Component({
  selector: 'app-account',
  imports: [CommonModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  accountMemberList: any[] = [
    {value: 'shubhamparit', viewValue: 'shubham parit'},
    {value: 'rahulpatil', viewValue: 'rahul patil'}
  ];

  displayedColumns: string[] = ['partNumber', 'partName','createDate','updatedDate','name','number','Action'];
  //dataSource = new MatTableDataSource<DashboardTableData>(DASHBOARD_TABLE_DATA);
  dataSource: MatTableDataSource<AccountTableData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  readonly dilog = inject(MatDialog)

  constructor(private dialog: MatDialog) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(ACCOUNT_TABLE_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      if (result === 'submitted') {
        // Do something after form submission
        console.log('Form was submitted!');
      }
    });
  }

  openAccountDialog(){
      const dialogRef = this.dialog.open(AccountAddModalComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'submitted') {
        // Do something after form submission
        console.log('Form was submitted!');
      }
    });
  }

  // Action button logics
  onEdit(row: any) {
    console.log('Editing row:', row);
    this.openDialog();
  }

  onDelete(row: any): void {
    if (confirm('Are you sure you want to delete this item?')) {
      //this.dataSource.data = this.dataSource.data.filter(item:any => item !== row);
    }
  }

}
