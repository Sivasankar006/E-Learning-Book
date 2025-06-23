import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonserviceService } from '../Service/CommonService/commonservice.service'; // Adjust the path to your service
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-admin-addbook',
  templateUrl: './admin-addbook.component.html',
  styleUrls: ['./admin-addbook.component.scss']
})
export class AdminAddbookComponent {
  public Editor = ClassicEditor;
  libraryForm: FormGroup | any;
  id: any;
  title: any;

  categories = [
    { value: 'new', label: 'New Book' },
    { value: 'coming-soon', label: 'Coming Soon' }
  ];

  useUrl: boolean = true;
  fileError: string = '';

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private service: CommonserviceService,
    private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.id = +this.activatedRoute.snapshot.params['id']; // Get index from route

    this.libraryForm = this.fb.group({
      bookname: ['', Validators.required],
      imgurl: ['', [Validators.required, this.validUrlValidator()]],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')]],
      category: ['', Validators.required],
      author: ['', Validators.required],
    });

    this.title = this.id >= 0 ? 'EDIT BOOKS' : 'ADD BOOKS';

    if (this.id !== null && this.id >= 0) {
      this.fetchBookData();
    }
  }


  onSubmit(): void {
    if (this.libraryForm.invalid) {
      this.toastr.error("Please fill the form field");
      this.libraryForm.markAllAsTouched();
      return;
    }

    this.spinner.show();
    const existingBooks = JSON.parse(localStorage.getItem('books') || '[]');

    if (this.id) {
      // Update existing book by id
      const updatedBooks = existingBooks.map((book: any) => {
        if (book.id === +this.id) {
          return { ...book, ...this.libraryForm.value, id: +this.id };
        }
        return book;
      });
      localStorage.setItem('books', JSON.stringify(updatedBooks));
      this.toastr.success('Book updated successfully');
    } else {
      // Add new book with unique ID
      const newBook = {
        ...this.libraryForm.value,
        id: Date.now()
      };
      existingBooks.push(newBook);
      localStorage.setItem('books', JSON.stringify(existingBooks));
      this.toastr.success('Book added successfully');
    }

    this.libraryForm.reset();
    this.spinner.hide();
    this.router.navigateByUrl(`/list-books`);
  }

  get f() {
    return this.libraryForm.controls;
  }

  fetchBookData(): void {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const book = books.find((b: any) => b.id === this.id);
    if (book) {
      this.libraryForm.patchValue(book);
    } else {
      this.toastr.error('Book not found');
      this.router.navigate(['/list-books']);
    }
  }


  validUrlValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) return { invalidUrl: true };
  
      const urlPattern = /^(http|https):\/\/[^ "]+$/;
      const base64Pattern = /^data:image\/[a-z]+;base64,/;
  
      const isValidUrl = urlPattern.test(value);
      const isBase64 = base64Pattern.test(value);
  
      return isValidUrl || isBase64 ? null : { invalidUrl: { value } };
    };
  }
  

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.fileError = '';
  
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.fileError = 'Only image files are allowed.';
        return;
      }
  
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.libraryForm.patchValue({ imgurl: base64String });
        console.log(this.libraryForm,"this.libraryForm")
      };
      reader.readAsDataURL(file);
    }
  }
}
