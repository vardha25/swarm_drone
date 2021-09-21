import { Component, Output, EventEmitter, Input, OnChanges, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { AuthUserService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
declare var google;
@Component({
  selector: 'parallax-layout-1',
  templateUrl: 'parallax-layout-1.page.html',
  styleUrls: ['parallax-layout-1.page.scss'],
})
export class ParallaxLayout1Page implements OnChanges,OnInit {
  @Input() data: any;
  @Input() button;
  @Input() url;
  @Input() package;
  lat;
  lng;

  @Output() onItemClick = new EventEmitter();
  @Output() onAddToCart = new EventEmitter();
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;

  constructor(private geolocation: Geolocation,private nativeGeocoder: NativeGeocoder,private platform:Platform,private httpService:HttpService,private iab: InAppBrowser,private sanitize:DomSanitizer,private authService:AuthUserService) { }


  ngOnInit(){
    if(this.data.type=='delivery'){
    this.loadMap();
    }
  }

  ngOnChanges(changes: { [propKey: string]: any }) {
    this.data = changes['data'].currentValue;
  }

  onAddToCartFunc(params) {
    if (event) {
      event.stopPropagation();
    }
    this.onAddToCart.emit(params);
  }
  
  onItemClickFunc(params) {
    if (event) {
      event.stopPropagation();
    }
    this.onItemClick.emit(params);
  }

  urlpaste(){
    this.url = "http://10.42.0.1:8000";
    return this.sanitize.bypassSecurityTrustResourceUrl(this.url);
  }

  logout(){
    this.authService.logout();
  }

  async launchApp(){
    
    if(this.platform.is('android')) {
      //  this.appAvailability.check(this.package).then(()=> {
             this.iab.create('android-app://'+this.package, '_system', 'location=yes')
          // }).catch(()=> {
          //    // not installed
          // })
    }
  }

  onButtonClick(){
    if(this.data?.type=='home'){
      this.launchApp();
    }
    else if(this.data?.type=='delivery' || this.data?.type=='svl'){
      this.startMission();
    }
  }

  startMission(){
    console.log(this.lat,this.lng)
    this.httpService.getData(`/command?lat=${+this.lat}&lng=${+this.lng}`).subscribe((res)=>{
      console.log(res);
    })
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;

      let latLng = new google.maps.LatLng(this.lat,this.lng);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.getAddressFromCoords(this.lat, this.lng);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('dragend', () => {

        this.lat = this.map.center.lat();
        this.lng = this.map.center.lng();

        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
      });

  }
}
