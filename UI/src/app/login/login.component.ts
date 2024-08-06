import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  userLoginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    this.userLoginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  get ulf() {
    return this.userLoginForm.controls;
  }

  login() {
    this.authService.login(this.userLoginForm.value).subscribe(
      res => {
        this.localStorage.set("Obj", res);
      },
      err => {
        alert("UserName Or Password Is Invalid!");
      },
      () => {
        alert("Logged in successfully");
        this.router.navigate(['./home']);
      }
    );
  }

}
