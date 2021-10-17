
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class AuthUserService {
  UserDetails = {
    Data:'data',
    Role:'role'
  }
  constructor(
    private router: Router,
    private httpService: HttpService,
    private alertService: AlertService
  ) { }

  /** User authenticated or not **/
  isAuthenticated(): boolean {
    if (JSON.parse(localStorage.getItem(this.UserDetails.Data))) {
      return true;
    }
    return false;
  }

  getRole():boolean{
    if (localStorage.getItem(this.UserDetails.Role)) {
      return true;
    }
    return false;
  }

  /** User logout **/
  logout() {
      localStorage.removeItem(this.UserDetails.Data);
      localStorage.clear();
      this.router.navigate(['/login']);
  }

  /** Set user details **/
  setUserDetails(key,value) {
    localStorage.setItem(key,value);
    return;
  }

  /** Get user details **/
  getUserDetails(key) {
    return localStorage.getItem(key);
  }
}
