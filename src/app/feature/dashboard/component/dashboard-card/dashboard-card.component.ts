import { Component, Input, input, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard-card',
  imports: [],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.scss'
})
export class DashboardCardComponent implements OnInit{
  @Input() dashboardCardData :any  = '';

ngOnInit(): void {}
}
