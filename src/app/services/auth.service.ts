import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private APIUrl=environment.APIUrl;
  tokenresp:any;
  GetRole:string='';
  

  constructor(  private http:HttpClient, private api:ApiService, private route:Router) {
  }

  ProceedLogin(usercred:any){
    return this.http.post(this.APIUrl+'/Authorization/login',usercred)
    .pipe(
      catchError((error:any)=>{
        alert(error.error[Object.keys(error.error)[0]]);
        return ""
      })
    )
  }

  GenerateRefreshToken(){

    let input= {
       "jwtToken": this.GetToken(),
       "refreshToken":this.GetRefreshToken()
     }
 
     return this.http.post(this.api+'/Authorization/refresh-token','');
   }
 
   GetToken(){
     return localStorage.getItem('token')||'';
   }
 
   GetRefreshToken(){
     return localStorage.getItem("refreshtoken")||'';
   }
 
   SaveTokens(tokendata:any){
     localStorage.setItem('token',tokendata.jwtToken);
     localStorage.setItem('refreshtoken',tokendata.refreshToken);
   }
 

  IsLoggedIn(){
    return localStorage.getItem('token')!=null;
  }

  Logout(){
    localStorage.clear();
    this.route.navigateByUrl('/login');
  
  }

  GetRoleByToken(token:any){
    let _token=token.split('.')[1];
    this.tokenresp=JSON.parse(atob(_token))
   // console.log(this.tokenresp.role);
    return this.tokenresp.role;
  }

}
