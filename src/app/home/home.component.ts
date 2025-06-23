import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonserviceService } from '../Service/CommonService/commonservice.service'; // Adjust the path to your service
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../Service/auth/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchTerm: string = '';
  filteredBooks:any=[];

  constructor(private fb: FormBuilder, public Authservice: AuthService,private activatedRoute: ActivatedRoute, private route: Router, private service: CommonserviceService,
    private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  books: any = [];


  ngOnInit() {
    window.scrollTo(0, 0);
    this.getBookdetails();
  }

  // getBookdetails() {
  //   this.spinner.show();
  //   this.service.getFunction('api/book/books').subscribe((res: any) => {
  //     if (res.status == true) {
  //       this.books = res.data.filter((e:any) => e.category == 'new');
  //       this.filteredBooks = this.books;
  //       this.spinner.hide();
  //     } else {
  //       this.books = [];
  //       this.spinner.hide();
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
  
  readmore(book: any) {
    const bookId = book._id || book.id;
  
    if (this.Authservice.isLoggedIn()) {
      this.route.navigate(['/book', bookId]);
    } else {
      this.toastr.error("Please log in to read books.");
      this.route.navigate(['/login']);
    }
  }
  
  
  
 
  filterBooks() {
    if (!this.searchTerm) {
      this.filteredBooks = this.books;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredBooks = this.books.filter((book:any) =>
      book.bookname.toLowerCase().includes(searchTermLower) ||
      book.author.toLowerCase().includes(searchTermLower)
      );
    }
  }
 
}
