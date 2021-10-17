import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthUserService } from './core/services/auth.service';

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
    private authService:AuthUserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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
