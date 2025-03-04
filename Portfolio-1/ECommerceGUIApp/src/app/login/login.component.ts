import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../Services/token-storage.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMsg: Array<string> = [];
  loginError: boolean = false;
  readonly jwtToken = 'auth-token';
  constructor(
    private router: Router,
    private loginService: LoginService,
    private tokenStorage: TokenStorageService
  ) {}
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  login() {
    
    this.loginError = false;
    console.log('Login');
    // debugger;
    this.loginService
      .validateLogin(this.loginForm.getRawValue())
      .subscribe(async (data:any) => {
        // debugger;
        console.log(data);
        if (!data.validate) {
          this.loginError = true;
          this.errorMsg.push('Invalid Username or Password');
        } else {
          this.tokenStorage.saveTokenInCache(data.jwtToken);

          const token=await this.getTokenAfterSaving();
          if(token){
          this.router.navigate(['home']);
          }else{
            this.errorMsg.push('Token not saved');
          }
          console.log(this.tokenStorage.getTokenFromCache());
        }
      });
    console.log(this.loginForm.getRawValue());
  }
  
  getTokenAfterSaving(): Promise<string | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const token = this.tokenStorage.getTokenFromCache();
        resolve(token);
      }, 100); // Add a short delay to simulate async retrieval
    });
  }
}
