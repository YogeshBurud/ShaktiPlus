import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

const DEFAULT_DASHBOARD_CARD_DATA = [
    {
      id: 1,
      label: "Total Inevestment",
      value: "0"
    },
    {
      id: 2,
      label: "Total Sell Out",
      value: "0"
    },
    {
      id: 3,
      label: "Total Profit",
      value: "0"
    }
  ]

@Component({
  selector: 'app-dashboard-card',
  imports: [MatIconModule, CommonModule],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.scss'
})
export class DashboardCardComponent implements OnInit {

  @Input() dashboardCardData: any = [];
  showCard = false;

  constructor(
  ) { }

  toggleCard() {
    this.showCard = !this.showCard
  }

  ngOnInit(): void {

    this.dashboardCardData = this.dashboardCardData?.length ? this.dashboardCardData : DEFAULT_DASHBOARD_CARD_DATA;

  }
}
