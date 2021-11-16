import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpRequestInterceptor } from './core/interceptor/http.interceptor';
import { HttpService } from './core/services/http.service';
import { LoginComponent } from './login/login.component';
import { AskRolePage } from './pages/ask-role/ask-role.page';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';


@NgModule({
  declarations: [AppComponent,LoginComponent,AskRolePage],
  entryComponents: [],
  imports: [BrowserModule, FormsModule,ReactiveFormsModule,IonicModule.forRoot({
    hardwareBackButton: true
  }),HttpClientModule, AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InAppBrowser,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    },
    Geolocation,
    NativeGeocoder,
    AndroidPermissions,
    LocationAccuracy,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
