import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, CommonModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  userUsername: string = '';
  titlePage: string = '';

  showSideBar:boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private authSrv: AuthService,
    private utilSrv:UtilsService
  ) {

  }

  ngOnInit(): void {
    this.titlePage = this.getTitlePage(this.document.location.pathname)
    this.authSrv.userActive.subscribe(
      data => {
        this.userUsername = data;
      }
    )
    if (!this.userUsername) {
      this.userUsername = this.utilSrv.getUserUsername() || '';
    }
  }

  getTitlePage(section: string) {
    switch (section) {
      case '/dashboard':
        return 'Monitoreo global';
      case '/plants/monitoring':
        return 'Monitoreo por planta';
      case '/plants/history':
        return 'Histórico de sensores';
      case '/profile':
        return 'Perfil de usuario'
      default:
        return 'Monitoreo global'
    }
  }

  goProfile() {
    this.titlePage = 'Perfil de usuario'
    this.router.navigate(['/profile']);
  }

  isSessionActive() {
    return this.authSrv.isAuthenticated();
  }

  logout() {
    this.authSrv.logout()
    this.router.navigate(['/sign_in']);
  }

  showAuthorizedOption() {
    const allowedAuthorities = ['ROLE_ADMIN', 'ROLE_DEVELOPER', 'ROLE_USER'];
    const userAuthorities: string[] = this.authSrv.getAuthorities();

    const hasAccess = userAuthorities.some(authority => allowedAuthorities.includes(authority));
    if (!hasAccess) {
      return false;
    }
    return true;
  }
}
