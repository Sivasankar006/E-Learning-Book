import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonserviceService } from '../../Service/CommonService/commonservice.service';
import { AuthService } from '../../Service/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmpassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }

  return null;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  resetForm: FormGroup | any;
  resetForm1: FormGroup | any;
  verifystatus: any = false;
  model: any = {};

  constructor(private fb: FormBuilder, private auth: AuthService, private spinner: NgxSpinnerService, public service: CommonserviceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.resetForm1 = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: passwordMatchValidator });

  }

  onSubmit(): void {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    const data = {
      email: this.resetForm.value.email,
      password: this.resetForm.value.password,
    };

    this.spinner.show();

    this.service.postFunction('api/auth/login', data).subscribe((res: any) => {
      if (res.status === true) {
        this.verifystatus = true;
        this.model.email = this.resetForm.value.email
        this.toastr.success("User verify successfully");
        this.spinner.hide();
      } else {
        this.toastr.error("Invalid email or password");
        this.spinner.hide();
      }
    }
    );
  }


  onSubmit1(): void {

    if (this.resetForm1.invalid || this.resetForm1.errors?.passwordMismatch) {
      this.resetForm1.markAllAsTouched();
      return;
    }

    const data = {
      email: this.model.email,
      password: this.resetForm1.value.password,
    };

    this.spinner.show();
    this.service.postFunction('api/auth/updateforgotUser', data).subscribe(
      (res: any) => {
        if (res.status === true) {
          this.toastr.success("Reset password updated successfully");
          this.router.navigate(['/login']);
          this.verifystatus = false;
          this.spinner.hide();
          this.resetForm1.reset();
        } else {
          this.toastr.error("User not found" || 'Reset failed');
          this.spinner.hide();
        }
      }
    );
  }


  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}



