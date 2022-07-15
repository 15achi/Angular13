import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../interface/user';
import {MatInputModule} from '@angular/material/input';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  disabled:boolean =true;
  GenderList=['Male','Female'];
  RoleList=['User','Admin'];
  countryList = [];
  countryList$!:Observable<any[]>;
  actionbtn:string="დამატება";
 Users:any=[];

  userForm !:FormGroup;
  constructor(private formBuilder:FormBuilder,
              private api:ApiService,
              @Inject(MAT_DIALOG_DATA) public editData:any,
              private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {

   this.onGetUsers();

   console.log(this.Users);

   
    this.userForm=this.formBuilder.group({
      PrivateNumber:['',[
                         Validators.required,
                         Validators.pattern("^[0-9]*$"),
                         Validators.minLength(11),Validators.maxLength(11)]],
      FirstName:['',[Validators.required,
                    Validators.pattern('^[a-zA-Z ]*$'),
                    Validators.minLength(2)]],
      LastName:['',Validators.required],
      Password:['',[Validators.required,Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,}$')]],
     // Confirmpassword:['',Validators.required],
      Phone:['',[Validators.required,Validators.pattern("^[0-9]*$"),
                 Validators.maxLength(50)]],
      Email:['',[Validators.required,Validators.email]],
      Birthdate:['',Validators.required],
      Address:['',Validators.required],
      genderType:['',Validators.required],
      RoleType:['',Validators.required],
      CountryId:['',Validators.required],
      
    } 
    
    )
    this.countryList$=this.api.getCountryList();
    if(this.editData){
      this.actionbtn="რედაქტირება";

      this.disabled=false;

      this.userForm.controls['PrivateNumber'].setValue(this.editData.privateNumber);
      this.userForm.controls['FirstName'].setValue(this.editData.firstName);
      this.userForm.controls['LastName'].setValue(this.editData.lastName);
      this.userForm.controls['Phone'].setValue(this.editData.phone);
      this.userForm.controls['Email'].setValue(this.editData.email);
      this.userForm.controls['Birthdate'].setValue(this.editData.birthDate);
      this.userForm.controls['Address'].setValue(this.editData.address);
      this.userForm.controls['genderType'].setValue(this.editData.genderType);
      this.userForm.controls['RoleType'].setValue(this.editData.roleType);
      this.userForm.controls['CountryId'].setValue(String(this.editData.countryId));

  
    }
  }

  onGetUsers():void{
    this.api.AllUsers().subscribe(
     (response :User[])=>this.Users=response,
     // (response :User[])=>console.log(response),
      
      (error:any)=>console.log(error),
      ()=>console.log('response')
    )
  }

 // const findCherries = () => { 
 //   return this.AllUsers.privateNumber === '12345678915';

  onCreateUser(){
    this.disabled=true;
    if(!this.editData){
    if(this.userForm.valid){
      this.api.CreateUser(this.userForm.value)
      .subscribe({
        next:(res)=>{
          alert(" added successfully");
          this.userForm.reset();
          this.dialogRef.close('save');
           },
           error:(err:any)=>{        
             alert(err);
 
          }
        })
      }
    }else{
            this.updateUser();
          }
  }

  updateUser(){
   // this.disabled=false;
    this.api.updateUser(this.userForm.value)
             .subscribe({
              next :(res)=>{
                alert("user update");
                this.userForm.reset();
                this.dialogRef.close('update');
              },
              error:(err)=>{        
                alert("Errpr ")
    
             }
         })
        }
}


