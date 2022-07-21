import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCountryComponent } from '../dialog-country/dialog-country.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name','action'];
  dataSource!: MatTableDataSource<any>;
  display=false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,
              private api:ApiService,
              private userservice:UserService) { }

  openDialog(){
    this.dialog.open(DialogCountryComponent,{
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllCountres();
      }
    })
  }

  ngOnInit(): void {
    this.getAllCountres();
    this.display=this.userservice.isdisplayUser();
  }

  getAllCountres(){
    this.api.getCountryList()
    .subscribe({
      
      next:(res)=>{
        console.log(res);
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort
      },
      error:(err)=>{
        alert(err);
      }
    
  })
  }

  deleteUser(name:string){
    this.api.deleteCountry(name)
    .subscribe({
      next:(res)=>{
        alert("country deleted");
        this.getAllCountres();
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
