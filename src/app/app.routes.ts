import { Routes } from '@angular/router';
import { DashboardComponent } from './feature/dashboard/component/dashboard/dashboard.component';
import { HomeComponent } from './core/componet/home/home.component';
import { LoginComponent } from './core/componet/login/login.component';
import { AccountComponent } from './feature/account/account/account.component';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent, canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            {path : 'account', component : AccountComponent}
        ]
    },
    { path: 'login', component: LoginComponent },
    {
        path: '**', redirectTo: 'login'
    }

];
