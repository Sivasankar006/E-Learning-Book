import { Injectable } from '@angular/core';
import { AuthService } from '../Service/auth/auth.service';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGardService {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.auth.isLoggedIn()) {
        return true;
      } else {
        localStorage.clear();
        this.router.navigate(['/']);
        return false;
      }
  }
}
