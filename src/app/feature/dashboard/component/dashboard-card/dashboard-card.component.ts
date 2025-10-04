import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-dashboard-card',
  imports: [MatIconModule,CommonModule],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.scss'
})
export class DashboardCardComponent  {
  @Input() dashboardCardData: any = '';
    showCard = false;

  constructor(
  ) {  }

  toggleCard() {
    this.showCard = !this.showCard
  }
}
