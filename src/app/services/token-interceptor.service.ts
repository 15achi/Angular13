import { Injectable,Injector } from '@angular/core';
import { HttpInterceptor,HttpEvent,HttpHandler,HttpRequest } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private inject:Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authservice=this.inject.get(AuthService);
    let authreq=req;
    authreq=this.AddTokenheader(req,authservice.GetToken());
    return next.handle(authreq).pipe(
      catchError(errordata=>{
       // console.log(errordata);
       if(errordata.status===401){
        //authservice.Logout();
        return this.handleRefreshToken(req,next);
       }else{
        return throwError(errordata);
       }
     
      })
    )

  }

 AddTokenheader(req: HttpRequest<any>,token:any){
  return req.clone({headers:req.headers.set('Authorization','bearer '+token)});
 }

 handleRefreshToken(req: HttpRequest<any>, next: HttpHandler){
  let authservice=this.inject.get(AuthService);
  return authservice.GenerateRefreshToken().pipe(
    switchMap((data:any)=>{
      authservice.SaveTokens(data);
      return next.handle(this.AddTokenheader(req,data.jwtToken));
    }),
    catchError(errordata=>{
      authservice.Logout();
      return throwError(errordata);
    })
  );
 }

}
