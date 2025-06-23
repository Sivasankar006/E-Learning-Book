import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonserviceService } from '../Service/CommonService/commonservice.service'; // Adjust the path to your service
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  book: any = {};
  id: any;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private route: Router, private service: CommonserviceService,
    private spinner: NgxSpinnerService, private toastr: ToastrService) { }


    ngOnInit() {
      this.id = this.activatedRoute.snapshot.params['id'];
      if (this.id) {
        this.fetchBookData();
      }
    }
    
    fetchBookData(): void {
      const storedBooks = localStorage.getItem('books');
    
      try {
        const books = JSON.parse(storedBooks || '[]');
    
        if (!Array.isArray(books)) {
          throw new Error('Books is not an array');
        }
    
        const book = books.find((b: any) => b.id === +this.id || b._id === this.id);
    
        if (book) {
          this.book = book;
        } else {
          console.error('Book not found in localStorage');
        }
      } catch (error) {
        console.error('Failed to parse books from localStorage:', error);
      }
    }
    




  downloadDivContent(): void {
    // Get the content of the div
    const divContent = document.getElementById('div-to-download')?.innerHTML;

    if (divContent) {
      // Create a blob with the content
      const blob = new Blob([divContent], { type: 'text/html' });

      // Create a link element
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'div-content.html';

      // Programmatically click the link to trigger the download
      a.click();

      // Clean up
      URL.revokeObjectURL(a.href);
    }
  }

}

