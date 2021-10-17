import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { NavController, Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthUserService } from './core/services/auth.service';
import { Router, RouterEvent } from '@angular/router';
import { TabnavService } from './core/services/tabsnav.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  localstorage=localStorage;
  public selectedIndex = 0;
  isAuthenticated;
  role;
  public appPages = [
    {
      title: 'Home',
      url: '/folder/Inbox', 
      icon: 'play-circle-outline'
    },
    {
      title: 'Survelliance',
      url: '/mission/survelliance',
      icon: 'play-circle-outline'
    },
    {
      title: 'Delivery',
      url: '/mission/delivery',
      icon: 'play-circle-outline'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService:AuthUserService,
    private router:Router,
    private navctrl:NavController,
    private tabNavService:TabnavService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(this.platform.is('android')){
        this.router.events.subscribe((event:RouterEvent)=>{

          if(event.url !== undefined){
            if(this.tabNavService.lastTabName !== event.url && event.url !== this.tabNavService.currentBack){
              // we put last tab name not equal event.url so the event don't go twice through array
              // we put event.url not equal current back that is since when navcontroll in back button go back its considered a router event and we don't need it to be inserted again
              this.tabNavService.pushTabHistory(event.url);
            }
            this.tabNavService.lastTabName = event.url;
          }
        });
      }

      this.platform.backButton.subscribeWithPriority(99999999,async()=>{
        let pushHistoryCount = this.tabNavService.navigationProccess.length;
        if(this.router.url.includes('tabs') == true && pushHistoryCount > 1){
          let url = this.tabNavService.navigationProccess[pushHistoryCount-2].url;
          this.tabNavService.navigationProccess.splice(pushHistoryCount-1, 1);
          this.tabNavService.currentBack = url;
          //currentBack should be assigned before navgiate back
          this.navctrl.navigateBack(url);
        }else if(this.router.url.includes('tabs') == true && pushHistoryCount <2){
      // here is the array less than 2 which is one (you could make it ==0 but i make it if app glitches or something)
      //so if app is on main start point it exit on back pressed
      navigator['app'].exitApp();
    }
      });

    });
  }

  showSideBar(){
    return this.authService.getRole() && this.authService.isAuthenticated()
  }


  ngOnInit() {
    this.isAuthenticated=this.authService.isAuthenticated();
    this.role=this.authService.getRole();
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
