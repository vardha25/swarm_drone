import { Component, QueryList, ViewChildren } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { IonRouterOutlet, NavController, Platform, ToastController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthUserService } from './core/services/auth.service';
import { Router, RouterEvent } from '@angular/router';
import { TabnavService } from './core/services/tabsnav.service';
// import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  localstorage=localStorage;
  public selectedIndex = 0;
  isAuthenticated;
    // set up hardware back button event.
    lastTimeBackPress = 0;
    timePeriodToExit = 2000;
  
    //code for exit app

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
      title: 'Payload Delivery',
      url: '/mission/delivery',
      icon: 'play-circle-outline'
    }
  ];
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService:AuthUserService,
    private router:Router,
    private navctrl:NavController,
    private tabNavService:TabnavService,
    private toastController: ToastController
  ) {
    this.initializeApp();
    this.backButtonEvent();
  }

  initializeApp() {
    this.initgeolocation();
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
    // active hardware back button
    backButtonEvent() {
      this.platform.backButton.subscribe(async () => {
  
        this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
         if (this.router.url === '/folder/Inbox' || this.router.url === '/login' || this.router.url === '/ask-role') {
            if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
              // this.platform.exitApp(); // Exit from app
              navigator['app'].exitApp(); // work in ionic 4
  
            } else {
              const toast = await this.toastController.create({
                message: '      Press back again to exit App.',
                duration: 2000,
                position: 'middle',
                cssClass: "yourCssClassName",
              });
              toast.present();
              // console.log(JSON.stringify(toast));
              this.lastTimeBackPress = new Date().getTime();
            }
          } else if (outlet && outlet.canGoBack()) {
            outlet.pop();
  
          } 
        });
      });
    }

    initgeolocation(){
      // const config: BackgroundGeolocationConfig = {
        // desiredAccuracy: 10,
        // stationaryRadius: 20,
//         distanceFilter: 30,
//         debug: true, //  enable this hear sounds for background-geolocation life-cycle.
//         stopOnTerminate: false, // enable this to clear background location settings when the app terminates
// };

// this.backgroundGeolocation.configure(config)
// .then(() => {

// this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
//   console.log(location);

//   // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
//   // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
//   // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
//   this.backgroundGeolocation.finish(); // FOR IOS ONLY
// });

// });

// // start recording location
// this.backgroundGeolocation.start();

// If you wish to turn OFF background-tracking, call the #stop method.
// this.backgroundGeolocation.stop();
    }
}
