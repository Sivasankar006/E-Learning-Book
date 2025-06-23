import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonserviceService } from '../Service/CommonService/commonservice.service'; // Adjust the path to your service
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../Service/auth/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private route: Router, private service: CommonserviceService,
    private spinner: NgxSpinnerService, private toastr: ToastrService, private auth: AuthService) { }

  userdetails: any = [];


  ngOnInit() {
    window.scrollTo(0, 0);
    if (localStorage.getItem('type') !== 'Admin') {
      this.route.navigate(['/']);
    }
    this.getuserdetails();
  }

  getuserdetails(): void {
    this.spinner.show();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.userdetails = users;
    console.log(this.userdetails,"this.userdetails")
    this.spinner.hide();
  }


  addBook(book: any): void {
    this.userdetails.push(book);
  }

  updateBook(updatedBook: any): void {
    const index = this.userdetails.findIndex((b: any) => b.id === updatedBook.id);
    if (index !== -1) {
      this.userdetails[index] = updatedBook;
    }
  }


  deleteBook(email: string): void {
    this.spinner.show();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.filter((user: any) => user.email !== email);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    this.userdetails = updatedUsers;
    this.toastr.success('User deleted successfully');
    this.spinner.hide();
  }
  
  
  getFormattedDate(timestamp: number): string {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }
  
  
}
