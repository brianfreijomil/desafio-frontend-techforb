import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

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
        path: '**',
        redirectTo: '', 
    }
];
