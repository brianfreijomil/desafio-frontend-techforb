import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  username:string = '';
  emailinfo:string = '';

  constructor(private authSrv:AuthService, private utilSrv:UtilsService) {

  }
  ngOnInit(): void {
    this.username = this.utilSrv.getUserUsername() || "Sin informacion";
    this.emailinfo = this.utilSrv.getUserEmail();
  }

}
