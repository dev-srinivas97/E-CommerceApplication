import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TokenStorageService } from '../Services/token-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
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
    debugger;
    this.loginService
      .validateLogin(this.loginForm.getRawValue())
      .subscribe((data) => {
        console.log(data);
        if (!data.validate) {
          this.loginError = true;
          this.errorMsg.push('Invalid Username or Password');
        } else {
          window.localStorage.setItem(
            this.jwtToken,
            this.tokenStorage.getCacheToken()
          );
          this.router.navigate(['home']);
          console.log(this.tokenStorage.getCacheToken());
        }
      });
    console.log(this.loginForm.getRawValue());
    // this.router.navigate(["/home"]);
  }
}
