import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../interface/country';
import { CreateCountry } from '../interface/create-country';
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
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse):Observable<never>{
    return throwError(error.ok);
  }


  updateUser(User:CreateUser): Observable<User>{
    return this.http.put<User>(this.APIUrl+'/User/',User);
  }

  deleteUser(privatename:string){
    return this.http.delete(this.APIUrl+`/User/${privatename}`);
  }

  getCountryList():Observable<any[]>{
    let myParams=new HttpParams({fromString:'PageNamber=1&PageSize=1000'})

    return this.http.get<any>(this.APIUrl+'/Country',{params:myParams});
  }

  CreateCountry(Country:CreateCountry){
    return this.http.post<CreateCountry>(this.APIUrl+'/Country/',Country);
  }

  deleteCountry(name:string){
    return this.http.delete(this.APIUrl+`/Country/${name}`);
  }

}
