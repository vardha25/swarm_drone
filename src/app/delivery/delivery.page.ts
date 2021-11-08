import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AuthUserService } from '../core/services/auth.service';

@Component({
  selector: 'delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage{
  lat;
  lng;
  public subscription: any;
  constructor(private router:Router,private authService:AuthUserService,private platform:Platform,private navController: NavController) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      this.router.navigate(['/folder/Inbox'])
    });
   }

  data={type:'delivery',button:'Start Mission',title:'Enter waypoint Coordinates'}


  logout(){
    this.authService.logout();
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      // navigator['app'].exitApp();
      this.navController.back();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }


}
