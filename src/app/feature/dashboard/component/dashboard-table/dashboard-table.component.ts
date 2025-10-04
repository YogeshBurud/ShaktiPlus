import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DashboardAddInventeryModalComponent } from '../dashboard-add-inventery-modal/dashboard-add-inventery-modal.component';
import { debounceTime, Subject } from 'rxjs';
import { DashboardTableData } from '../../model/dashboard-table-model';
import { DashboardDataServiceService } from '../../service/dashboard-data-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard-table',
  imports: [FormsModule, MatSelectModule, CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule],
  templateUrl: './dashboard-table.component.html',
  styleUrl: './dashboard-table.component.scss'
})
export class DashboardTableComponent {
  @Output() msgToParent: EventEmitter<any> = new EventEmitter<any>();

  private searchInput$ = new Subject<any>();

  tempDataSource: any[] = [];

  displayedColumns: string[] = ['partNumber', 'partName', 'carsModel', 'totalQuantity', 'availableQuantity', 'sellOutQuantity', 'price', 'Action'];

  @Input() dataSource: MatTableDataSource<DashboardTableData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  readonly dilog = inject(MatDialog);

  // Maruti Suzuki Cars

  CarNames: any[] = [
    { value: 'alto', viewValue: 'Alto' },
    { value: 'alto-k10', viewValue: 'Alto K10' },
    { value: 'swift', viewValue: 'Swift' },
    { value: 'dzire', viewValue: 'Dzire' },
    { value: 'baleno', viewValue: 'Baleno' },
    { value: 'wagonr', viewValue: 'WagonR' },
    { value: 'ciaz', viewValue: 'Ciaz' },
    { value: 'ertiga', viewValue: 'Ertiga' },
    { value: 'xl6', viewValue: 'XL6' },
    { value: 'brezza', viewValue: 'Brezza' },
    { value: 'fronx', viewValue: 'Fronx' },
    { value: 'jimny', viewValue: 'Jimny' },
    { value: 'grand-vitara', viewValue: 'Grand Vitara' },
    { value: 'ignis', viewValue: 'Ignis' },
    { value: 's-presso', viewValue: 'S-Presso' },
    { value: 'eeco', viewValue: 'Eeco' },
    { value: 'celerio', viewValue: 'Celerio' },
    { value: 'super-carry', viewValue: 'Super Carry' },
    { value: 'swift-dzire-tour', viewValue: 'Swift Dzire Tour' },
    { value: 'tour-h1', viewValue: 'Tour H1' },
    { value: 'tour-s', viewValue: 'Tour S' }
  ];


  carVariant: any[] = [
    { value: 'petrol', viewValue: 'Petrol' },
    { value: 'diesel', viewValue: 'Diesel' },
    { value: 'cng', viewValue: 'CNG' },
  ];

  carYear: any[] = [
    { value: '2001', viewValue: '2001' },
    { value: '2002', viewValue: '2002' },
    { value: '2003', viewValue: '2003' },
    { value: '2004', viewValue: '2004' },
    { value: '2005', viewValue: '2005' },
    { value: '2006', viewValue: '2006' },
    { value: '2007', viewValue: '2007' },
    { value: '2008', viewValue: '2008' },
    { value: '2009', viewValue: '2009' },
    { value: '2010', viewValue: '2010' },
    { value: '2011', viewValue: '2011' },
    { value: '2012', viewValue: '2012' },
    { value: '2013', viewValue: '2013' },
    { value: '2014', viewValue: '2014' },
    { value: '2015', viewValue: '2015' },
    { value: '2016', viewValue: '2016' },
    { value: '2017', viewValue: '2017' },
    { value: '2018', viewValue: '2018' },
    { value: '2019', viewValue: '2019' },
    { value: '2020', viewValue: '2020' },
    { value: '2021', viewValue: '2021' },
    { value: '2022', viewValue: '2022' },
    { value: '2023', viewValue: '2023' },
    { value: '2024', viewValue: '2024' },
    { value: '2025', viewValue: '2025' },
    { value: '2026', viewValue: '2026' },
    { value: '2027', viewValue: '2027' },
    { value: '2028', viewValue: '2028' },
    { value: '2029', viewValue: '2029' },
    { value: '2030', viewValue: '2030' },
  ];

  searchInputValue: string = '';
  selectedCar: string = '';
  selectedCarVariant: string = '';
  selectedCarYear: string = '';

  filteredCarData: any[] = [];
  filteredCarVariantData: any[] = [];
  filteredCarYearData: any[] = [];

  constructor(
    private dialog: MatDialog,
    private dashboardDataService: DashboardDataServiceService,
    private toastr: ToastrService
  ) {
    // Initialize the dataSource with an empty array or with data if available
    this.dataSource = new MatTableDataSource<DashboardTableData>([]);

    this.searchInput$.pipe(debounceTime(800)).subscribe((searchTerm: any) => {
      this.applyFilter(searchTerm);
    });

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
    this.dashboardDataService.getDashboardTableData().subscribe((data: any) => {
      this.tempDataSource = data;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // open dilog button
  openDialog() {
    const dialogRef = this.dialog.open(DashboardAddInventeryModalComponent, {
      width: '700px',
      maxWidth: "80vw"
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Add the new row to the dataSource first position
        this.dataSource.data.unshift(result);
        this.dataSource._updateChangeSubscription(); // Update the data source
      }
    });
  }

  // Action button logics
  onEdit(row: any) {
    const dialogRef = this.dialog.open(DashboardAddInventeryModalComponent, {
      width: '700px',
      maxWidth: "80vw",
      data: row // Pass the row data to the dialog
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Update the row in the dataSource
        const index = this.dataSource.data.findIndex((item: any) => item.partNumber === result.partNumber);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource._updateChangeSubscription();
        }
        // Call the update service method
        this.msgToParent.emit('');
      }
    });

  }

  onDelete(row: any): void {
    if (confirm('Are you sure you want to delete this item?')) {
      const index = this.dataSource.data.findIndex((item: any) => item.partNumber === row.partNumber);
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
          error: (error: any) => {
            this.toastr.error(error.error.error, 'Failed to delete product', {
              timeOut: 3000,
            });
          }
        });
      }
    }
  }


  resetTableData() {
    this.selectedCar = '';
    this.selectedCarVariant = '';
    this.selectedCarYear = '';
    this.dataSource.filter = "";
    this.filteredCarData = [];
    this.filteredCarVariantData = [];
    this.filteredCarYearData = [];
    this.dataSource.data = this.tempDataSource;
  }



  getCarName(modelString: string): string {
    return modelString.split('(')[0].trim();
  }

  getVariantName(modelString: string): string {
    const match = modelString.match(/\(([^)]+)\)/);
    return match ? match[1].trim() : '';
  }

  // remove duplicate element from array
  removeDuplicates(arr: any[]) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  searchType: string = '';

  onSearchInputChange(event: any, searchType: string) {
    if (event) {
      this.searchType = searchType;
      let eventValue = event.value ? event.value : (event.target as HTMLInputElement).value;
      let searchTerm = eventValue;
      let filterValue = (searchTerm ?? '').toString().toLowerCase().trim();
      this.searchInput$.next(filterValue);
    }
  }

  applyFilter(searchTerm: any) {
    if (searchTerm.length == 0) {
      this.dataSource.filter = "";
      this.dataSource.data = this.tempDataSource;
    }
    else if (this.searchType.toLowerCase() == 'inputsearch') {
      this.dataSource.filter = searchTerm.toLowerCase().trim();
    }
    else {
      this.searchInputValue = '';
      this.dataSource.filter = searchTerm;
      if (this.selectedCar && this.selectedCarVariant && this.selectedCarYear) {
        this.filteredCarYearData = [];
        this.filteredCarVariantData.filter((item) => {
          return item.carsModel.some((element: { name: string }) => {
            let carsModelName = element.name.toLowerCase().trim();
            let yearRange = carsModelName.match(/\d+/g);
            if (yearRange && yearRange.length > 0) {
              const startYear = parseInt(yearRange[0]);
              const endYear = parseInt(yearRange[1]);
              const filterYear = parseInt(searchTerm, 10);
              if (!isNaN(filterYear) && startYear <= filterYear && endYear >= filterYear) {
                this.filteredCarYearData.push(item);
              }
            }
          });
        });
        this.dataSource.filter = "";
        this.dataSource.data = this.removeDuplicates(this.filteredCarYearData);
      }
      else if (this.selectedCar && this.selectedCarVariant) {
        this.filteredCarVariantData = [];
        this.filteredCarData.filter((item) => {
          return item.carsModel.some((element: { name: string }) => {
            let carsModelName = element.name.toLowerCase().trim();
            let variantName = this.getVariantName(carsModelName);
            if (variantName.toLowerCase() == searchTerm.toLowerCase()) {
              this.filteredCarVariantData.push(item);
            }

          });
        })
        this.dataSource.filter = "";
        this.dataSource.data = this.removeDuplicates(this.filteredCarVariantData);
      }
      else {
        this.selectedCar = searchTerm;
        this.filteredCarData = [];
        this.tempDataSource.filter((item) => {
          return item.carsModel.some((element: { name: string }) => {
            let carsModelName = element.name.toLowerCase().trim();
            let carName = this.getCarName(carsModelName);
            if (carName.toLowerCase() == searchTerm.toLowerCase()) {
              this.filteredCarData.push(item);
            }
          });
        })
        this.dataSource.filter = "";
        this.dataSource.data = this.removeDuplicates(this.filteredCarData);
      }

    }
  }

  advanceSearchToggle: boolean = false;
  advanceSearch() {
    this.advanceSearchToggle = !this.advanceSearchToggle;
    this.searchInputValue = '';
    this.selectedCar = '';
    this.selectedCarVariant = '';
    this.selectedCarYear = '';
    this.dataSource.filter = "";
    this.dataSource.data = this.tempDataSource;
  }

}
