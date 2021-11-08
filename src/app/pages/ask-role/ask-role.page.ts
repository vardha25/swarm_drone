import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-ask-role',
  templateUrl: './ask-role.page.html',
  styleUrls: ['./ask-role.page.scss'],
})
export class AskRolePage implements OnInit {

  public subscription: any;
  constructor(private router:Router,private platform:Platform) { }

  ngOnInit() {
  }

  selectRole(role){
    localStorage.setItem('role',role)
    this.router.navigate(['/folder/Inbox'])
  }
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      // navigator['app'].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

}
