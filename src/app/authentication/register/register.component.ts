import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonserviceService } from '../../Service/CommonService/commonservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup | any;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  
  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, public service: CommonserviceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });

    // this.toastr.success('Hello world!', 'Toastr fun!');
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value ?? '';
    const confirmPassword = form.get('confirmPassword')?.value ?? '';
    return password === confirmPassword ? null : { mismatch: true };
  }

  // onSubmit(): void {
  //   if (this.registrationForm.invalid) {
  //     this.registrationForm.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
  //     return;
  //   }
  //   console.log('Form Submitted!', this.registrationForm.value);
  // }

  navigateToLogin(): void {
    this.router.navigate(['/login']); // Assuming you have a login route configured
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }
  
    this.spinner.show();
  
    const data = {
      id: Date.now(),
      name: this.registrationForm.value.name,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      date:new Date(),
      status:false
    };
  
    // Check if email already exists
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const emailExists = existingUsers.some((user: any) => user.email === data.email);
  
    if (emailExists) {
      this.toastr.error('Email already exists');
      this.spinner.hide();
      return;
    }
  
    // Save new user
    existingUsers.push(data);
    localStorage.setItem('users', JSON.stringify(existingUsers));
  
    this.toastr.success('Registration successful');
    this.router.navigate(['/login']);
    this.registrationForm.reset();
    this.spinner.hide();
  }
  
  
  
}
