import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DashboardCardComponent } from "../dashboard-card/dashboard-card.component";

import { DashboardDataServiceService } from '../../service/dashboard-data-service.service';
import { DashboardTableComponent } from '../dashboard-table/dashboard-table.component';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardTableComponent, DashboardCardComponent],
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


