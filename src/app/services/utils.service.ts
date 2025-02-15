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


}
