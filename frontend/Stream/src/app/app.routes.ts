import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { Register } from './components/register/register';
import { Images } from './components/images/images';
import { Profile } from './components/profile/profile';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'images', component: Images, canActivate: [authGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
];
