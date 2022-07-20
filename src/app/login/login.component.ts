import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import{Router} from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Login: FormGroup = new FormGroup({});
  messageclass='';
  message='';
  cusromerid:any;
  editdata:any;
  responsedata:any;

  constructor(private service:AuthService,
              private route:Router,
              private api:ApiService,
              private formBuilder: FormBuilder,
              private http:HttpClient) { 
    localStorage.clear();
  }


  // Login=new FormGroup({
  //   privateNumber:new FormControl("",Validators.required),
  //   password:new FormControl("",Validators.required)
  // })



  ngOnInit(): void {

    this.Login=this.formBuilder.group({
      privateNumber:['',Validators.required],
      password:['',Validators.required]
  })
}

  ProceedLogin(){
    if(this.Login.valid){
      this.service.ProceedLogin(this.Login.value).subscribe(
        result=>{
          if(result!=null){
            this.responsedata=result;
            localStorage.setItem('token',this.responsedata.jwtToken)
            localStorage.setItem('refreshtoken',this.responsedata.refreshToken)
            this.route.navigate(['users']);
          }
        })

    }
  }

}
