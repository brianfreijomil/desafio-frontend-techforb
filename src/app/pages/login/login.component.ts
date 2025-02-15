import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthRegister } from '../../interfaces/auth';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    CommonModule, 
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  username: string = ''
  password: string = ''
  repassword: string = ''
  email: string = ''
  passwordHide: boolean = true
  repasswordHide: boolean = true

  isRegister: boolean = false

  constructor(
    private route: ActivatedRoute, 
    private authSrv: AuthService, 
    private router: Router,
    private utilSrv: UtilsService
  ) {
    this.route.url.subscribe(url => {
      this.isRegister = url[0].path === 'sign_up';
    });
  }

  signin(): void {
    this.authSrv.signin(this.email,this.password).subscribe({
      next: (response) => {
        this.utilSrv.saveEmail(response.email);
        this.utilSrv.saveUsername(response.username);
        this.authSrv.saveToken(response.jwt);
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        console.error('Invalid credentials', err);
      },
    });
  }

  signup(): void {
    const req:AuthRegister = {
      email:this.email, 
      password: this.password,
      username: this.username,
    }
    this.authSrv.signup(req).subscribe({
      next: (response) => {
        console.log(response)
        this.utilSrv.saveEmail(response.email);
        this.utilSrv.saveUsername(response.username);
        this.authSrv.saveToken(response.jwt);
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        console.error('Invalid credentials', err);
      },
    });
  }

  tooglePassword() {
    this.passwordHide = !this.passwordHide
  }

  toogleRePassword() {
    this.repasswordHide = !this.repasswordHide
  }


}
