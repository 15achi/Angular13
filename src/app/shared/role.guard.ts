import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private service:AuthService,private route:Router){

  }
  canActivate()
     {
      this.service.HaveAccess();
     // console.log(this.service.HaveAccess());
      return true;
  }
  
}
