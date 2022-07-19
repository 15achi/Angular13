import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import{Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service:AuthService,
    private route:Router){

  }
  canActivate()
     {
      if(this.service.IsLoggedIn()){
        return true;
      }
      else{
        this.route.navigate(["login"]);
        return true;
      }
   
  }
  
}
