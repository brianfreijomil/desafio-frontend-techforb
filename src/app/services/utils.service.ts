import { Injectable } from '@angular/core';
import { SensorTypeEnum } from '../interfaces/sensor';
import { HttpClient } from '@angular/common/http';
import countriesData from '../utils/countries.json'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private countryMap: { [code: string]: string } = countriesData;

  constructor(private http: HttpClient) { }

  saveUsername(username: string): void {
    localStorage.setItem("user", username);
  }

  getUserUsername(): string | null {
    return localStorage.getItem("user");
  }

  saveEmail(email: string): void {
    localStorage.setItem("email", email);
  }

  getUserEmail(): string {
    return localStorage.getItem("email") || "Sin informacion";
  }

  validateEmail(email: string) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }

  validatePassword(pass: string) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d !"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]{8,}$/.test(pass);
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

  getCountryCode(countryName: string): string | null {
    const code = Object.keys(this.countryMap).find(
      key => this.countryMap[key].toLowerCase() === countryName.toLowerCase()
    );
    return code || null;
  }

  getCountryNames(): string[] {
    return Object.values(this.countryMap); // Devuelve un array con solo los nombres
  }
  

}
