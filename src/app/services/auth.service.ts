import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthLogin, AuthRegister } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'auth_token';
  private apiUrl = `${environment.apiUrl}/auth`;

  private _sessionActive: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public sessionActive: Observable<boolean> = this._sessionActive.asObservable();

  constructor(private http: HttpClient) { }

  signin(email: string, password: string): Observable<any> {
    const req: AuthLogin = { email, password }
    return this.http.post(`${this.apiUrl}/log-in`, req);
  }

  signup(req: AuthRegister): Observable<any> {
    return this.http.post(`${this.apiUrl}/sign-up`, req);
  }

  updateSession(status: boolean) {
    this._sessionActive.next(status);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.updateSession(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.clear();
    this.updateSession(false);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      this.updateSession(false);
      return false;
    }

    try {
      const decoded: any = jwtDecode(token);
      this.updateSession(true);
      return decoded.exp * 1000 > Date.now();
    } catch (error) {
      this.updateSession(false);
      return false;
    }
  }

  decodeToken(): any {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  getAuthorities(): string[] {
    const decodedToken = this.decodeToken();
    return (decodedToken?.authorities as string).split(',') || [];
  }

  saveEmail(jwt:string) {
    const tokenDecoded = jwtDecode(jwt)
    localStorage.setItem("email", (tokenDecoded as any).email);
  }

}
