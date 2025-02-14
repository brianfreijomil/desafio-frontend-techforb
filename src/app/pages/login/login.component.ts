import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';

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

  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe(url => {
      this.isRegister = url[0].path === 'sign-up';
    });
  }

  tooglePassword() {
    this.passwordHide = !this.passwordHide
  }

  toogleRePassword() {
    this.repasswordHide = !this.repasswordHide
  }


}
