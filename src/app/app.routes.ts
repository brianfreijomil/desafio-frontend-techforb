import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { PlantMonitoringComponent } from './pages/plant-monitoring/plant-monitoring.component';
import { SensorsHistoryComponent } from './pages/sensors-history/sensors-history.component';
import { PlantsHistoryComponent } from './pages/plants-history/plants-history.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

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
        data: { authorities: ['ROLE_ADMIN','ROLE_DEVELOPER','ROLE_USER','ROLE_INVITED'] }
    },
    {
        path: 'profile', 
        component: ProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'plants/monitoring', 
        component: PlantMonitoringComponent,
        canActivate: [AuthGuard],
        data: { authorities: ['ROLE_ADMIN','ROLE_DEVELOPER','ROLE_USER'] }
    },
    {
        path: 'plants/history', 
        component: PlantsHistoryComponent,
        canActivate: [AuthGuard],
        data: { authorities: ['ROLE_ADMIN','ROLE_DEVELOPER','ROLE_USER'] }
    },
    {
        path: 'sensors/history', //tendria que saber si va a ser un historial de sensores solo para una planta o para todas...
        component: SensorsHistoryComponent,
        canActivate: [AuthGuard],
        data: { authorities: ['ROLE_ADMIN','ROLE_DEVELOPER','ROLE_USER'] }
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
