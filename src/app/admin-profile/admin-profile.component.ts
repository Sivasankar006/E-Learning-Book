import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonserviceService } from '../Service/CommonService/commonservice.service'; // Adjust the path to your service
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent {

  // admin: any = {
  //   name: 'Admin',
  //   email: 'Admin@gmail.com',
  //   mobileNo: '73739-39439',
  //   address: 'Solai alagupuram ramamoorthynagar madurai-11',
  //   role: 'Administrator',
  //   joinedDate: new Date()
  // };
  userDetails: any;


  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private service: CommonserviceService,
    private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router) { }

  // ngOnInit(): void {


  //   if (localStorage.getItem('type') !== 'Admin') {
  //     this.router.navigate(['/']);
  //   }
  // }


  ngOnInit(): void {
    const name = localStorage.getItem('name');
    const type = localStorage.getItem('type'); // 'Admin' or 'user'

    const users = JSON.parse(localStorage.getItem('users') || '[]'); // get registered users list
    const result = users.find((e: any) => e.name === name); // find current user
    console.log(result)
    if (!result) {
      console.error("User not found in localStorage!");
      return;
    }

    if (type === 'Admin') {
      this.userDetails = {
        name: result.name,
        email: result.email,
        role: 'Administrator',
        mobileNo: '73739-39439',
        address: 'Solai Alagupuram, Madurai-11',
        joinedDate: result.date
      };
    } else if (type === 'user') {
      this.userDetails = {
        name: result.name,
        email: result.email,
        role: 'User',
        joinedDate: result.date
      };
    }

    console.log(this.userDetails);
  }

}
