import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CountryComponent } from './country/country.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { RoleGuard } from './shared/role.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //{component:HomeComponent,path:"home",canActivate:[RoleGuard]},
  
  {component:UsersComponent,path:"users",canActivate:[RoleGuard]},
  {component:CountryComponent,path:"country",canActivate:[RoleGuard]},
  {path:"login",component:LoginComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
