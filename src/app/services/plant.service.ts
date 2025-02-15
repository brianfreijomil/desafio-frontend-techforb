import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Plant, PlantOut } from '../interfaces/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  private apiUrl = `${environment.apiUrl}/plants`;

  constructor(private http: HttpClient) { }

  getPlantsByUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/by-user`);
  }

  getPlantDetail(plantId:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${plantId}`);
  }

  savePlant(req:PlantOut): Observable<any> {
    return this.http.post(`${this.apiUrl}`, req);
  }

  updatePlant(plantId:number,req:PlantOut): Observable<any> {
    return this.http.put(`${this.apiUrl}/${plantId}`, req);
  }

  deletePlant(plantId:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${plantId}`);
  }

  getSummaryReadings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/by-user/summary-readings`);
  }


}
