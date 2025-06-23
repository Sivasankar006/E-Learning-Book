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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup | any;
  forgotForm1: FormGroup | any;
  verifystatus: any = false;
  model: any = {};

  constructor(private fb: FormBuilder, private auth: AuthService, private spinner: NgxSpinnerService, public service: CommonserviceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.forgotForm1 = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    const data = {
      email: this.forgotForm.value.email,
    };

    this.spinner.show();

    this.service.postFunction('api/auth/forgot', data).subscribe((res: any) => {
      if (res.status === true) {
        this.verifystatus = true;
        this.model.email = this.forgotForm.value.email
        this.toastr.success(res.message);
        this.spinner.hide();
      } else {
        this.toastr.error(res.message || 'forgot failed');
        this.spinner.hide();
      }
    }
    );
  }


  onSubmit1(): void {

    if (this.forgotForm1.invalid || this.forgotForm1.errors?.passwordMismatch) {
      this.forgotForm1.markAllAsTouched();
      return;
    }

    const data = {
      email: this.model.email,
      password: this.forgotForm1.value.password,
    };

    this.spinner.show();
    this.service.postFunction('api/auth/updateforgotUser', data).subscribe(
      (res: any) => {
        if (res.status === true) {
          this.verifystatus = true;
          this.toastr.success(res.message);
          this.router.navigate(['/login']);
          this.spinner.hide();
          this.forgotForm1.reset();
        } else {
          this.toastr.error(res.message || 'forgot failed');
          this.spinner.hide();
        }
      }
    );
  }


  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}


