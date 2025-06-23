import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonserviceService } from '../Service/CommonService/commonservice.service'; // Adjust the path to your service
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.scss']
})
export class AdminHistoryComponent {

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private service: CommonserviceService,
    private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  books: any = [];


  ngOnInit() {
    window.scrollTo(0, 0);

    if (localStorage.getItem('type') !== 'Admin') {
      this.router.navigate(['/']);
    }
    this.getBookdetails();
  }

  getBookdetails() {
    this.spinner.show();
  
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
    } else {
      this.books = [];
    }
  
    this.spinner.hide();
  }


  addBook(book: any): void {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    this.books = books;
  }
  

  updateBook(updatedBook: any, id: number): void {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    if (books[id]) {
      books[id] = updatedBook;
      localStorage.setItem('books', JSON.stringify(books));
      this.books = books;
    }
  }
  
  editBook(book: any): void {
    this.router.navigateByUrl(`/edit-books/${book.id}`);
  }
  
  deleteBook(index: number): void {
    this.spinner.show();
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    books.splice(index, 1); // Delete by index
    localStorage.setItem('books', JSON.stringify(books));
    this.books = books; // Update the UI
    this.toastr.success('Book deleted successfully');
    this.spinner.hide();
  }
  
  
}
