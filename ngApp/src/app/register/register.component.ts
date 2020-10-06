import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _authService:AuthService) { }
  
  registerUser = {
    email:"",
    password:""
  };

  ngOnInit(): void {
  }

  registerNewUser(){
    console.log(this.registerUser);
    this._authService.registerUser(this.registerUser)
    .subscribe(response=>{
      console.log(response);
    },error=>{
      console.log(error);
    })
  }

}
