import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonserviceService } from '../Service/CommonService/commonservice.service'; // Adjust the path to your service
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import emailjs from '@emailjs/browser';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AuthService } from '../Service/auth/auth.service';

@Component({
  selector: 'app-own-book',
  templateUrl: './own-book.component.html',
  styleUrls: ['./own-book.component.scss']
})
export class OwnBookComponent {

  public Editor = ClassicEditor;
  libraryForm: FormGroup | any;
  _id: any;
  isDisabled: boolean = true;

  constructor(private fb: FormBuilder, public Authservice: AuthService, private activatedRoute: ActivatedRoute, private route: Router, private service: CommonserviceService,
    private spinner: NgxSpinnerService, private toastr: ToastrService) { }



  ngOnInit() {
    window.scrollTo(0, 0);
    this.libraryForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      bookname: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.petchdetails();
  }

  petchdetails() {
    if (this.Authservice.isLoggedIn()) {
      this.libraryForm.patchValue({
        email: localStorage.getItem('email'),
      })
    } else {
      this.toastr.error("Please log in to your own book publishing .");
    }
  }

  onSubmit(): void {
    if (this.Authservice.isLoggedIn()) {

      if (this.libraryForm.valid) {

        this.spinner.show();
        const templateParams = {
          from_name: this.libraryForm.value.name,
          to_name: 'Own Book Price Set',
          from_email: this.libraryForm.value.email,
          subject: this.libraryForm.value.bookname,
          message: this.libraryForm.value.description,
        };

        emailjs.send('service_993v5yk', 'template_uvn7zva', templateParams, 'iF6gAshqmMeDSbXSH')
          .then((response) => {
            this.spinner.hide();
            const successMessage = `Your book publishing request has been received successfully. Please wait a few minutes for an admin to reply to your email`;
            this.toastr.success(successMessage);
            this._id = '';
            this.libraryForm.get('bookname').reset();
            this.libraryForm.get('name').reset();
            this.libraryForm.get('description').reset();
          }, (err) => {
            this.spinner.hide();
            this._id = '';
            this.toastr.error('Something went wrong.');
          });

      } else {
        this.toastr.error("Please fill all the form fields.");
        this.spinner.hide();
        this.libraryForm.markAllAsTouched();
      }
    } else {
      this.toastr.error("Please log in to your own book publishing .");
    }
  }


  get f() {
    return this.libraryForm.controls;
  }

  cancel() {
    this._id = '';
  }


}



