import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private displayUser: boolean = false;
  private _update=new Subject<void>();

  get update(){
    return this._update;
  }

  setdisplayUser(data:boolean) {
    this.displayUser = data;
}

isdisplayUser() {
    return this.displayUser;
}
  constructor() { }
}
