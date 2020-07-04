import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
/*import {RegisterComponent} from './register/register.component';*/
import {HomeComponent} from './home/home.component';
import {LandingComponent} from './landing/landing.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'home', component: HomeComponent}, // default routing on /
  {path: 'login', component: LoginComponent}, // on /login
/*  {path: 'register', component: RegisterComponent} // on /register*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [
    HomeComponent
  ],
  exports: [RouterModule, HomeComponent]
})
export class AppRoutingModule {
}
