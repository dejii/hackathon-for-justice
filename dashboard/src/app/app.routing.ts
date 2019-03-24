import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {UserGuard} from './guards/user.guard';
import {AddLocationComponent} from './components/add-location/add-location.component';
// import {HomeComponent} from './components/home/home.component';

const APP_ROUTES: Routes = [
  { path: '', loadChildren: './components/dashboard/dashboard.module#DashboardModule'},
  { path: 'login', component: LoginComponent },
  { path: 'add-location', component: AddLocationComponent },
  { path: 'dashboard',
    canActivate: [UserGuard],
    loadChildren: './components/dashboard/dashboard.module#DashboardModule'},
  { path: '**', component: NotFoundComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
