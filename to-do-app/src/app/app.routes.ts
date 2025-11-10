import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { authGuard } from './guards/auth-guard-guard';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'register', component: Register},
    {path: 'login', component: Login},

    {path: 'home', component: Home, canActivate: [authGuard]},
    {path: 'about',  loadComponent: () => import('./pages/about/about').then((m) => m.About), canActivate: [authGuard]},
    {path: 'contact', component: Contact, canActivate: [authGuard]}
];
