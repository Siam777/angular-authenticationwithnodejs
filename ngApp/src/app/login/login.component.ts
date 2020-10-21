import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser = {
    email:"",
    password:""
  }

  constructor(
    private _authService:AuthService,
    private _router:Router
    ) { }

  ngOnInit(): void {
  }
  
  login(){
  // console.log(this.loginUser);
   this._authService.loginUser(this.loginUser)
   .subscribe(res=>{
     console.log(res); 
     localStorage.setItem('token',res.token);
     this._router.navigate(['/special']);
   })   
  }

}
