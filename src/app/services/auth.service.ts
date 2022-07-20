import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private APIUrl=environment.APIUrl;
  

  constructor(  private http:HttpClient, private api:ApiService, private route:Router) { }

  ProceedLogin(usercred:any){
    return this.http.post(this.APIUrl+'/Authorization/login',usercred)
  }

  GenerateRefreshToken(){

    let input= {
       "jwtToken": this.GetToken(),
       "refreshToken":this.GetRefreshToken()
     }
 
     return this.http.post(this.api+'/Authorization/refresh-token','');
   }
 
   GetToken(){
     return localStorage.getItem("token")||'';
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

  HaveAccess(){
    var loggintoken=localStorage.getItem('token')||'';
    var _extractedtoken=loggintoken.split('.')[1];
    var _atobdata=atob(_extractedtoken);
    var _finaldata=JSON.parse(_atobdata);
    if(_finaldata.role==="Admin"){
      return true;
    }
   // alert('you not having access');
    console.log(_finaldata);
    return false;
   // console.log(_finaldata);
  }
}
