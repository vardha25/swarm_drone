import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AuthUserService } from '../core/services/auth.service';

@Component({
  selector: 'survelliance',
  templateUrl: './survelliance.page.html',
  styleUrls: ['./survelliance.page.scss'],
})
export class SurvelliancePage {

  data={type:'svl',button:'Start Mission',title:'Enter Waypoint Co-ordinates'}
  public subscription: any;
  constructor(private authService:AuthUserService, private platform:Platform,private router:Router,private navController: NavController) {
    // this.platform.backButton.subscribeWithPriority(10, () => {
    //   console.log('Handler was called!');
    //   this.router.navigate(['/folder/Inbox'])
    // });
   }

  logout(){
    this.authService.logout();
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      // navigator['app'].exitApp();
      // this.navController.back();
      this.router.navigate(['/folder/Inbox'])
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

}
