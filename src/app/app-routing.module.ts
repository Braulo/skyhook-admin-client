import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './components/callback/callback.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RealmsComponent } from './components/realms/realms.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuardService } from './services/auth/guard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'callback',
        component: CallbackComponent,
      },
      {
        canActivate: [AuthGuardService],
        path: 'realms',
        component: RealmsComponent,
      },
      {
        canActivate: [AuthGuardService],
        path: 'home',
        component: HomeComponent,
      },
      {
        canActivate: [AuthGuardService],
        path: 'users/:realmId',
        component: UsersComponent,
      },
      {
        canActivate: [],
        path: '',
        component: LoginComponent,
      },
      {
        canActivate: [],
        path: '**',
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
