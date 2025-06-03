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
import DASHBOARD_TABLE_DATA from '../../../data/dashboard-table-data.json';
import { CommonModule } from '@angular/common';

export interface DashboardTableData {
  partNumber: string;
  partName: string;
  carsModel: any; 
  totalQuantity: number;
  availableQuantity: number;
  sellOutQuantity: number;
  price: number;
  action? :any
}
@Component({
  selector: 'app-account-card',
  imports: [CommonModule,MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule],
  templateUrl: './account-card.component.html',
  styleUrl: './account-card.component.scss'
})
export class AccountCardComponent {


   
}
