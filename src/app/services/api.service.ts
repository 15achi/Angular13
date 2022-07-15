import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUser } from '../interface/create-user';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private APIUrl=environment.APIUrl;
 

  constructor( private http:HttpClient) { }

 

  getUsers():Observable<User[]>{
    let myParams=new HttpParams({fromString:'PageNamber=1&PageSize=1000'})

    return this.http.get<User[]>(this.APIUrl+'/User/GetUsers',{params:myParams})
    
  }

  CreateUser(User:CreateUser){
    return this.http.post<User>(this.APIUrl+'/User/',User)
  }

  updateUser(User:CreateUser){
    return this.http.put<User>(this.APIUrl+'/User/',User);
  }

  deleteUser(privatename:string){
    return this.http.delete(this.APIUrl+`/User/${privatename}`);
  }

  getCountryList():Observable<any[]>{
    let myParams=new HttpParams({fromString:'PageNamber=1&PageSize=1000'})

    return this.http.get<any>(this.APIUrl+'/Country/GetCountries',{params:myParams});
  }

  AllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.APIUrl+'/User/GetUsers?PageNamber=1&PageSize=1000');
  }

}
