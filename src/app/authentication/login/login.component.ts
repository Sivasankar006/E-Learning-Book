import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonserviceService } from '../../Service/CommonService/commonservice.service';
import { AuthService } from '../../Service/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup | any;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private spinner: NgxSpinnerService, public service: CommonserviceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  
    const data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
  
    this.spinner.show();
  
    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const matchedUser = users.find(
      (user: any) => user.email === data.email && user.password === data.password
    );
  console.log(matchedUser,"matchedUser")
    if (matchedUser) {
      // Simulate token (you can generate a random string if needed)
      const fakeToken = Math.random().toString(36).substring(2);
  
      if (data.email === 'Admin@gmail.com') {
        localStorage.setItem('token', fakeToken);
        localStorage.setItem('type', 'Admin');
        localStorage.setItem('name', matchedUser.name);
        this.router.navigate(['/list-books']);
        this.toastr.success('Admin login successfully');
      } else {
        localStorage.setItem('token', fakeToken);
        localStorage.setItem('type', 'user');
        localStorage.setItem('email', data.email);
        localStorage.setItem('name', matchedUser.name);
        this.router.navigate(['/']);
        this.toastr.success('User login successfully');
      }
    } else {
      this.toastr.error('Invalid email or password');
    }
  
    this.loginForm.reset();
    this.spinner.hide();
  }
  
  

  navigateToRegister(): void {
    this.router.navigate(['/register']); // Assuming you have a register route configured
  }
}