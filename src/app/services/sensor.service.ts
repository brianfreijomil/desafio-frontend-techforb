import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SensorUpdate } from '../interfaces/sensor';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  private apiUrl = `${environment.apiUrl}/sensors`;

  constructor(private http: HttpClient) { }

  updateSensor(sensorId: number, req: SensorUpdate): Observable<any> {
    return this.http.put(`${this.apiUrl}/${sensorId}`, req);
  }

  disableEnableSensor(sensorId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${sensorId}`,{});
  }


}
