import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private displayUser: boolean = false;

  setdisplayUser(data:boolean) {
    this.displayUser = data;
}

isdisplayUser() {
    return this.displayUser;
}
  constructor() { }
}
