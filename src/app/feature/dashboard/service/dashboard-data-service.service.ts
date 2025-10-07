import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const API_URL_DASHBOARD_TABLE = 'http://localhost:3000/api/dashboard'; // Adjust the path as necessary
const API_URL_CAR_LIST = 'http://localhost:3000/api/carmodel'; // Adjust the path as necessary
const API_URL_DASHBOARD_CARD = 'http://localhost:3000/api/dashboard/headercarddata'; // Adjust the path as necessary


@Injectable({
  providedIn: 'root'
})
export class DashboardDataServiceService {

  constructor(    
    private http: HttpClient
  ) { }

  // get dashboard card data from the JSON file
  getDashboardCardData(): Observable<any[]>{
    return this.http.get<any[]>(API_URL_DASHBOARD_CARD)
  }

  // Fetch all dashboard data from the JSON file
  getDashboardTableData() :Observable<any[]>{
    return this.http.get<any[]>(API_URL_DASHBOARD_TABLE);
  }

  // add a new dashboard item
  addDashboardTableItem(newItem: any): Observable<any> {
    return this.http.post(API_URL_DASHBOARD_TABLE, newItem);
  }

  // update an existing dashboard item
  updateDashboardTableItem(updatedItem: any): Observable<any> {
    return this.http.put(`${API_URL_DASHBOARD_TABLE}/${updatedItem.partnumber}`, updatedItem);
  }

  // delete a dashboard item by part number
  deleteDashboardTableItem(partNumber: string): Observable<any> {
    return this.http.delete(`${API_URL_DASHBOARD_TABLE}/${partNumber}`);
  }

  // Fetch car model list from the JSON file
  getCarModelList(): Observable<any[]> {
    return this.http.get<any[]>(API_URL_CAR_LIST);
  }

  // Add a new car model
  addCarModel(newCarModel: any): Observable<any> {
    return this.http.post(API_URL_CAR_LIST, newCarModel);
  }

}
