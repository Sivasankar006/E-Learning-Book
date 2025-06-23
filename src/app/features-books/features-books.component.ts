import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonserviceService } from '../Service/CommonService/commonservice.service'; // Adjust the path to your service
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-features-books',
  templateUrl: './features-books.component.html',
  styleUrls: ['./features-books.component.scss']
})
export class FeaturesBooksComponent {
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private route: Router, private service: CommonserviceService,
    private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  books: any = [];
  searchTerm: string = '';
  filteredBooks:any=[];

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getBookdetails();
  }

  // getBookdetails() {
  //   this.spinner.show();
  //   this.service.getFunction('api/book/books').subscribe((res: any) => {
  //     if (res.status == true) {
  //       this.books = res.data.filter((e:any) => e.category == 'coming-soon');
  //       this.filteredBooks = this.books.filter((e:any) => e.category == 'coming-soon');
  //     } else {
  //       this.books = [];
  //     }
  //     this.spinner.hide();
  //   });
  // }

  getBookdetails() {
    this.spinner.show();
  
    // const storedBooks = localStorage.getItem('books');
    // if (storedBooks) {
    //   this.books = JSON.parse(storedBooks);
    // } else {
    //   this.books = [];
    // }
  
    // this.spinner.hide();

    this.spinner.show();
  
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
      this.books = this.books.filter((e:any) => e.category == 'coming-soon');
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
        book.author.toLowerCase().includes(searchTermLower) 
      );
    }
  }
  

  upcomming() {
    this.toastr.warning("This book is coming soon! Please check back in a few days.");
  }
 
}
