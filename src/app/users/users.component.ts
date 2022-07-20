import { Component, Input, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['privateNumber', 'firstName', 'lastName',
  'phone','email','birthDate','address','genderType','roleType','country','countryId','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  AllUsers:any=[];

  display=false;
  constructor(private dialog:MatDialog, private api:ApiService,private route:Router,
    private userservice:UserService) {

     }



  ngOnInit(): void {
    this.getAllUsers();
    this.AllUsers=this.getAllUsers();
    this.display=this.userservice.isdisplayUser();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
       width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllUsers();
      }
    })
  }


  getAllUsers(){
    this.api.getUsers()
    .subscribe({
      next:(res)=>{
      console.log(res);
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort
      },
      error:(err:any)=>{
        alert(err);
      }
      
    })
  }

  editUser(row :any){
      this.dialog.open(DialogComponent,{
        width:'30%',
        data:row
      }).afterClosed().subscribe(val=>{
        if(val==='update'){
          this.getAllUsers();
        }
      })
  }

  deleteUser(privateNumber:string){
    this.api.deleteUser(privateNumber)
    .subscribe({
      next:(res)=>{
        alert("user deleted");
        this.getAllUsers();
      },
      error:()=>{
        alert("Error");
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
