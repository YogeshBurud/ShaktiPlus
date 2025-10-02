import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CustomTableComponent } from "../../../../shared/component/custom-table/custom-table.component";
import { DashboardCardComponent } from "../dashboard-card/dashboard-card.component";

import { DashboardDataServiceService } from '../../service/dashboard-data-service.service';

@Component({
  selector: 'app-dashboard',
  imports: [CustomTableComponent, DashboardCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  cardData: any = [];



  constructor(
    private dashboardDataServiceService: DashboardDataServiceService
  ) { }

  ngOnInit() {
    this.getDashboardCardData();
  }


  getAllInfoFromChild(event: any) {
    this.getDashboardCardData();
  }



  getDashboardCardData() {
    this.dashboardDataServiceService.getDashboardCardData().subscribe({
      next: (data) => {
        this.cardData = data;
      },
      error: (error) => {
        console.error('Error fetching dashboard card data:', error);
      }
    })
  }


}


