import { Injectable } from '@angular/core';
import { SensorTypeEnum } from '../interfaces/sensor';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  saveUsername(username: string): void {
    localStorage.setItem("user", username);
  }

  getUserUsername(): string | null {
    return localStorage.getItem("user");
  }

  saveEmail(email: string): void {
    localStorage.setItem("email", email);
  }

  getUserEmail(): string | null {
    return localStorage.getItem("email");
  }

  getTypeName(type: string) {
    if (type) {
      switch (type) {
        case 'TEMPERATURE':
          return SensorTypeEnum.TEMPERATURE;
        case 'PRESSURE':
          return SensorTypeEnum.PRESSURE;
        case 'WIND':
          return SensorTypeEnum.WIND;
        case 'LEVELS':
          return SensorTypeEnum.LEVELS;
        case 'ENERGY':
          return SensorTypeEnum.ENERGY;
        case 'TENSION':
          return SensorTypeEnum.TENSION;
        case 'CO2':
          return SensorTypeEnum.CO2;
        case 'OTHER_GASES':
          return SensorTypeEnum.OTHER_GASES;
        default:
          return 'Unknown';
      }

    }
    return 'Unknown';
  }


}
