import { Component, OnInit } from '@angular/core';
import { CustomTableComponent } from "../../../../shared/component/custom-table/custom-table.component";
import { DashboardCardComponent } from "../dashboard-card/dashboard-card.component";

import DASHBOARD_CARD_DATA from '../../../../../assets/data/dashboard-card-data.json';

@Component({
  selector: 'app-dashboard',
  imports: [CustomTableComponent, DashboardCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  cardData: any = DASHBOARD_CARD_DATA; 

  constructor() {}

}


