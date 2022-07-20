import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  title = 'Angular13';
  displaymenu=false;
  displayuser:boolean=false;

  currentrole:any;
  constructor(private cookie:CookieService,private route:Router,private service:AuthService,
    private userservice:UserService){
     

  }


  ngDoCheck(): void {
    if (this.route.url == '/login') {
      this.displaymenu = false
    } else {
      this.displaymenu = true
    }
  }

  ngOnInit():void{
    this.MenuDisplay();

  }

  MenuDisplay(){
    if(this.service.GetToken()!=''){
      this.userservice.setdisplayUser(this.service.GetRoleByToken(this.service.GetToken())=="Admin");
      console.log(this.service.GetRoleByToken(this.service.GetToken()));
      console.log(this.service.GetRoleByToken(this.service.GetToken())=="Admin");
    }


  }
}
