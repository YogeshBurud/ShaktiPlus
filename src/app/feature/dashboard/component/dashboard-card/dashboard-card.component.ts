import { Component, Input, input, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-card',
  imports: [MatIconModule],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.scss'
})
export class DashboardCardComponent implements OnInit{
  @Input() dashboardCardData :any  = '';

ngOnInit(): void {}
}
