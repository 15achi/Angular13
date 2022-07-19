import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private APIUrl=environment.APIUrl;
  

  constructor(  private http:HttpClient) { }

  ProceedLogin(usercred:any){
    return this.http.post(this.APIUrl+'/Authorization/login',usercred)
  }

  IsLoggedIn(){
    return localStorage.getItem('token')!=null;
  }

  GetToken(){
    return localStorage.getItem('token')||'';
  }
}
