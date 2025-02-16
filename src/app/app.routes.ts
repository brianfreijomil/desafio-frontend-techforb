import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    {
        path: '', 
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'sign_in', 
        component: LoginComponent,
    },
    {
        path: 'sign_up', 
        component: LoginComponent,
    },
    {
        path: 'profile', 
        component: ProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        redirectTo: '', 
    }
];
