import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from "@angular/core";
import { AuthService } from '../Service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {

  constructor(public Authservice: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('type') !== 'Admin') {
      this.router.navigate(['/']);
    }
  }
  
  logout() {
    // Remove only login-related info
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
  
    this.toastr.success("Logout Successfully");
    this.router.navigate(['/login']);
  }
}
