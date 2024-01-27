import { Routes } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { userGuard } from './guard/user.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: HomeComponent },
    { path: 'login', component: LoginComponent },

    { path: ':username', component: UserComponent, canActivate: [userGuard] },
    
    { path: '**', component: HomeComponent }
];
