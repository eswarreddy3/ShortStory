import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  public userRegistrationForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userRegistrationForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      dob: ['', [Validators.required]]
    });
  }

  get urf() {
    return this.userRegistrationForm.controls;
  }

  formData = new FormData();
  upload(e: any) {
    this.formData.append("PP", e.files.item(0));
  }

  register() {

    this.formData.append('myModel', JSON.stringify(this.userRegistrationForm.value));

    this.authService.register(this.formData).subscribe(
      res => {

      },
      err => {
        this.formData.delete("PP");
        this.formData.delete("myModel");
      },
      () => {
        alert('User Created Successfully');
        this.router.navigate(['./login']);
      });
  }

}
