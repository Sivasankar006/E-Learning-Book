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
  selector: 'app-order-books',
  templateUrl: './order-books.component.html',
  styleUrls: ['./order-books.component.scss']
})
export class OrderBooksComponent {
  public Editor = ClassicEditor;
  searchTerm: string = '';
  filteredBooks: any = [];
  books: any = [];
  libraryForm: FormGroup | any;
  _id: any;
  isDisabled: boolean = true;
  
  constructor(private fb: FormBuilder, public Authservice: AuthService, private activatedRoute: ActivatedRoute, private route: Router, private service: CommonserviceService,
    private spinner: NgxSpinnerService, private toastr: ToastrService) { }



  ngOnInit() {
    this.getBookdetails();
    window.scrollTo(0, 0);
    this.libraryForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      bookname: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')]],
    });

  }


  orderbook(data: any) {
    window.scrollTo(0, 0);
    if (this.Authservice.isLoggedIn()) {
      this._id = data.id;
      this.libraryForm.patchValue({
        bookname: data.bookname,
        email: localStorage.getItem('email'),
        price: data.price,
      })
    } else {
      this.route.navigate(['/login']);
      this.toastr.error("Please log in to order your books.");
    }

  }


  onSubmit(): void {
    if (this.Authservice.isLoggedIn()) {

      if (this.libraryForm.valid) {

        this.spinner.show();
        const templateParams = {
          from_name: this.libraryForm.value.name,
          to_name: this.libraryForm.value.price,
          from_email: this.libraryForm.value.email,
          subject: this.libraryForm.value.bookname,
          message: this.libraryForm.value.description,
        };

        emailjs.send('service_993v5yk', 'template_uvn7zva', templateParams, 'iF6gAshqmMeDSbXSH')
          .then((response) => {
            this.spinner.hide();
            const successMessage = `Book order contact us successfully. Please wait a few minutes for admin reply to your email.`;
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
      this.toastr.error("Please log in to order your books.");
    }
  }


  get f() {
    return this.libraryForm.controls;
  }

  cancel() {
    this._id = '';
  }

  // getBookdetails() {
  //   this.spinner.show();
  //   this.service.getFunction('api/book/books').subscribe((res: any) => {
  //     if (res.status == true) {
  //       this.books = res.data.filter((e: any) => e.category == 'new');;
  //       this.filteredBooks = this.books;
  //     } else {
  //       this.books = [];
  //     }
  //     this.spinner.hide();
  //   });
  // }

  getBookdetails() {
    this.spinner.show();
  
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
      this.books = this.books.filter((e:any) => e.category == 'new');
      this.filteredBooks = this.books;
    } else {
      this.books = [];
      this.filteredBooks = [];
    }
  
    this.spinner.hide();
  }
  
  

  filterBooks() {
    if (!this.searchTerm) {
      this.filteredBooks = this.books;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredBooks = this.books.filter((book: any) =>
      book.bookname.toLowerCase().includes(searchTermLower) ||
      book.author.toLowerCase().includes(searchTermLower) ||
      book.price.toLowerCase().includes(searchTermLower)
      );
    }
  }

}


