import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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

  isRegister: boolean = false;
  loginFailed: boolean = false;

  msgErrorPass: string = '';
  msgErrorEmail: string = '';
  msgErrorUsername: string = ''
  msgError: string = ''
  msgErrorRePass:string = ''

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

    this.email = this.email.trim();
    this.password = this.password.trim();

    this.authSrv.signin(this.email, this.password).subscribe({
      next: (response) => {
        this.utilSrv.saveEmail(response.email);
        this.utilSrv.saveUsername(response.username);
        this.authSrv.saveToken(response.jwt);
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        this.loginFailed = true;
        if (err.status === 400 || err.status === 404) { //bad req
          if (err.error.details) {
            this.msgErrorEmail = (err.error.details as string[]).find((e) => e.includes("correo electronico")) || '';
            this.msgErrorPass = (err.error.details as string[]).find((e) => e.includes("contraseña")) || '';
          }
          if (!this.msgErrorEmail && !this.msgErrorPass && !this.msgErrorUsername) {
            this.msgError = err.error.message;
          }
        } else {
          console.error(err);
        }
      },
    });
  }

  clearMsgs() {
    this.msgError = '';
    this.msgErrorEmail = '';
    this.msgErrorPass = '';
    this.msgErrorRePass = '';
    this.msgErrorUsername = '';
  }

  signup(): void {

    this.clearMsgs();

    this.password = this.password.trim();
    this.repassword = this.repassword.trim();
    this.email = this.email.trim();
    this.username = this.username.trim();

    if (this.password !== this.repassword) {
      this.msgErrorRePass = "Las contraseñas deben coincidir"
    } else {
      const req: AuthRegister = {
        email: this.email,
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
          this.loginFailed = true;
          if (err.status === 400 || err.status === 404) { //bad req
            if (err.error.details) {
              this.msgErrorUsername = (err.error.details as string[]).find((e) => e.includes("nombre de usuario")) || '';
              this.msgErrorEmail = (err.error.details as string[]).find((e) => e.includes("correo electronico")) || '';
              const errosPass = (err.error.details as string[]).filter((e) => e.includes("contraseña"));
              this.msgErrorPass = this.msgErrorPass.length > 0 ? "Debe ingresar una contraseña valida":"";
            }
            if (!this.msgErrorEmail && !this.msgErrorPass && !this.msgErrorUsername) {
              this.msgError = err.error.message;
            }
            if (!this.repassword || this.password !== this.repassword) {
              this.msgErrorRePass = "Las contraseñas deben coincidir"
            }
          } else {
            console.error(err);
          }
        },
      });
    }

    
  }

  tooglePassword() {
    this.passwordHide = !this.passwordHide
  }

  toogleRePassword() {
    this.repasswordHide = !this.repasswordHide
  }


}
