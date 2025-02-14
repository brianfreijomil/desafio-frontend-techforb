import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '', 
        component: DashboardComponent,
        //canActivate: [AuthGuard],
    },
    {
        path: 'dashboard', 
        component: DashboardComponent,
        //canActivate: [AuthGuard],
    },
    {
        path: 'sign-in', 
        component: LoginComponent,
    },
    {
        path: 'sign-up', 
        component: LoginComponent,
    },
    {
        path: '**',
        redirectTo: '', 
    }
];
