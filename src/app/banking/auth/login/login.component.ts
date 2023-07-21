import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  private fb = inject(FormBuilder);

  private authService = inject(AuthService);

  public myFormLogin = this.fb.group({
    username:[''],
    password:[''],
  });

  ngOnInit(): void {

  }

  onLoginSave():void{
   
    console.log( this.myFormLogin.value)
    this.myFormLogin.reset();
  }
}
