import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const JSON_URL = 'assets/data/dashboard-table-data.json'; // Adjust the path as necessary


@Injectable({
  providedIn: 'root'
})
export class DashboardDataServiceService {

  constructor(    
    private http: HttpClient
  ) { }

  // Fetch all dashboard data from the JSON file
  getDashboardTableData() :Observable<any[]>{
    return this.http.get<any[]>(JSON_URL);
  }

  // add a new dashboard item
  addDashboardTableItem(newItem: any): Observable<any> {
    return this.http.post(JSON_URL, newItem);
  }

  // update an existing dashboard item
  updateDashboardTableItem(updatedItem: any): Observable<any> {
    return this.http.put(`../${JSON_URL}/${updatedItem.partnumber}`, updatedItem);
  }

  // delete a dashboard item by part number
  deleteDashboardTableItem(partNumber: string): Observable<any> {
    return this.http.delete(`../${JSON_URL}${partNumber}`);
  }


}
