import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _authService:AuthService,
    private _router:Router) { }
  
  registerUser = {
    email:"",
    password:""
  };

  ngOnInit(): void {
  }

  registerNewUser(){
    this._authService.registerUser(this.registerUser)
    .subscribe(response=>{
      console.log(response);
      localStorage.setItem('token',response.token);
      this._router.navigate(['/special']);
    },error=>{
      console.log(error);
    }); 
  }

}
