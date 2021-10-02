import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ask-role',
  templateUrl: './ask-role.page.html',
  styleUrls: ['./ask-role.page.scss'],
})
export class AskRolePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  selectRole(role){
    localStorage.setItem('role',role)
    this.router.navigate(['/folder/Inbox'])
  }

}
