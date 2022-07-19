import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CountryComponent } from './country/country.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {component:HomeComponent,path:"",canActivate:[AuthGuard]},
  {component:UsersComponent,path:"users",canActivate:[AuthGuard]},
  {component:CountryComponent,path:"country",canActivate:[AuthGuard]},
  {path:"login",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
