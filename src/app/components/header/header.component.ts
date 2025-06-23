import { Component } from "@angular/core";
import { AuthService } from '../../Service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  username: string | null = '';

  constructor(public Authservice: AuthService,  private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    this.username = localStorage.getItem('name');
    console.log(this.username); // Optional for debugging
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

