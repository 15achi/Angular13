import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog-country',
  templateUrl: './dialog-country.component.html',
  styleUrls: ['./dialog-country.component.scss']
})
export class DialogCountryComponent implements OnInit {

  countryForm!:FormGroup;

  constructor( private formBuilder:FormBuilder,
               private api:ApiService,
               private dialogRef:MatDialogRef<DialogCountryComponent>) { }


  ngOnInit(): void {
   // this.getAllCountres();
    this.countryForm=this.formBuilder.group({
      name:['',[Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')]],
      
    })
  }

  onCreateCountry(){
     if(this.countryForm.valid){
      console.log("test");
      console.log(this.countryForm.value);
      this.api.CreateCountry(this.countryForm.value)
       .subscribe({
        next:(res)=>{
          alert("country added successfully");
          this.countryForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          console.log("test2")
          alert("Error");
        }
      })
     }
  }

}
