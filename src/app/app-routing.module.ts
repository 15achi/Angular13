import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CountryComponent } from './country/country.component';

const routes: Routes = [
  {component:UsersComponent,path:""},
  {component:CountryComponent,path:"country"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
