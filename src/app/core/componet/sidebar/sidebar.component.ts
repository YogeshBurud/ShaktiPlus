import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(private router : Router){}

  // navigate(){
  //   this.router.navigate(['/home'])
  // }

  // navigateTopartcomponet(){
  //   this.router.navigate(['/part_componet'])
  // }

  // navigateToTable(){
  //   this.router.navigate(['/login'])
  // }
}
