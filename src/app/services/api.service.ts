import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly UserAPIUrl="https://localhost:7249/api";
  readonly countryAPIUrl="https://localhost:7249/api";

  constructor( private http:HttpClient) { }

  PostUser(data:any){
    return this.http.post<any>(this.UserAPIUrl+'/User/',data)
  }

  getUsers(){
    return this.http.get<any>(this.UserAPIUrl+'/User/GetUsers?PageNamber=1&PageSize=1000');
  }

  getCountryList():Observable<any[]>{
    return this.http.get<any>(this.countryAPIUrl+'/Country/GetCountries?PageNamber=1&PageSize=1000');
  }

  updateUser(data:any){
    return this.http.put(this.UserAPIUrl+'/User/',data);
  }

  deleteUser(privatename:string){
    return this.http.delete(this.UserAPIUrl+`/User/${privatename}`);
  }

  AllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.UserAPIUrl+'/User/GetUsers?PageNamber=1&PageSize=1000');
  }
  // AllUsers(){
  //   return this.http.get<any>(this.UserAPIUrl+'/User/GetUsers?PageNamber=1&PageSize=1000');
  // }
}
