import { Component, Output, EventEmitter, Input, OnChanges, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { AuthUserService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { Geolocation, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
declare var google;
import * as $ from 'jquery'
import { ParallaxService } from 'src/app/core/services/parallax-service';
@Component({
  selector: 'parallax-layout-1',
  templateUrl: 'parallax-layout-1.page.html',
  styleUrls: ['parallax-layout-1.page.scss'],
})
export class ParallaxLayout1Page implements OnChanges,OnInit,AfterViewInit {
  @Input() data: any;
  @Input() button;
  @Input() url;
  @Input() package;
  lat;
  lng;
  height="5";
  waypoints=[];
  // map: Leaflet.Map;

  @Output() onItemClick = new EventEmitter();
  @Output() onAddToCart = new EventEmitter();
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;

  constructor(private geolocation: Geolocation,private paralaxService:ParallaxService,private nativeGeocoder: NativeGeocoder,private platform:Platform,private httpService:HttpService,private iab: InAppBrowser,private sanitize:DomSanitizer,private authService:AuthUserService) { }


  ngOnInit(){
    if(this.data.type=='delivery' || this.data.type=='svl'){
    // this.loadMap();
    // this.leafletMap();
    // if( navigator.geolocation ){
    //    // Call getCurrentPosition with success and failure callbacks
    //    navigator.geolocation.getCurrentPosition( (value)=>{
    //      console.log("success value",value)
    //      console.log(value?.coords?.latitude,value?.coords?.longitude);
    //      this.lat=value?.coords?.latitude;
    //       this.lng=value?.coords?.longitude;
    //      this.locate()
    //    } );
    // }
    // else
    // {
    //    alert("Sorry, your browser does not support geolocation services.");
    // }

    this.getUserPosition();
    }
  }

  getUserPosition() {
    return new Promise((resolve, reject) => {
    let options = {
      maximumAge: 3000,
      enableHighAccuracy: true
    };
   
    this.geolocation.getCurrentPosition(options).then((pos: Geoposition) => {
    let currentPos = pos;
    const location = {
       lat: pos.coords.latitude,
       lng: pos.coords.longitude,
       time: new Date(),
     };
     this.lat=pos.coords.latitude;
     this.lng=pos.coords.longitude;
    console.log('loc', location);
    resolve(pos);
   }, (err: PositionError) => {
     console.log("error : " + err.message);
     reject(err.message);
    });
   });
  }

  add(){
    this.paralaxService.addMarker.next({lat:this.lat,lng:this.lng})
    this.waypoints.push({lat:this.lat,lng:this.lng,height:this.height})
    this.lat='';
    this.lng='';
    this.height='';
  }

  ngAfterViewInit(){
    $(document).ready(function() {
      const $demo = document.getElementById("demo");
          let processing = false;
          document.addEventListener('DOMContentLoaded', function () {
      $demo.addEventListener('click', () => {
        if (processing) return;
        let reverting = false;
        processing = true;
        const $endListener = document.createElement('div');
        $endListener.classList.add('demo-transitionend-listener');
        $demo.appendChild($endListener);
        const layoutTrigger = $demo.offsetTop;
        $demo.classList.add('s--processing');
        
        $endListener.addEventListener('transitionend', () => {
          if (reverting) return;
          reverting = true;
          $demo.classList.add('s--reverting');
        });
        
        setTimeout(() => {
          $demo.removeChild($endListener);
          $demo.classList.remove('s--processing', 's--reverting');
          processing = false;
        }, 10000);
      });
          })
      });
  }

  ngOnChanges(changes: { [propKey: string]: any }) {
    this.data = changes['data'].currentValue;


  }
  getlatlng(event){
    console.log("got latlng",event)
    this.lat=+(event?.lat)?.toFixed(7);
    this.lng=+(event?.lng)?.toFixed(7);
    console.log(this.lat,this.lng)
  }

  locate(){
    console.log("clicked")
    this.paralaxService.setLatLng({lat:this.lat,lng:this.lng})
  }

  onClick(){
    const $demo = document.getElementById("demo");
          let processing = false;
    if (processing) return;
        let reverting = false;
        processing = true;
        if(this.data?.type=='delivery'){
          this.startDeliveryMission();
        } else if(this.data?.type=='svl'){
          this.startSurvelliance();
        }
        const $endListener = document.createElement('div');
        $endListener.classList.add('demo-transitionend-listener');
        $demo.appendChild($endListener);
        const layoutTrigger = $demo.offsetTop;
        $demo.classList.add('s--processing');
        
        $endListener.addEventListener('transitionend', () => {
          if (reverting) return;
          reverting = true;
          $demo.classList.add('s--reverting');
        });
        
        setTimeout(() => {
          $demo.removeChild($endListener);
          $demo.classList.remove('s--processing', 's--reverting');
          processing = false;
        }, 10000);
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
    this.url = "http://10.42.0.1:8000/index.html";
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
    else if(this.data?.type=='delivery'){
      this.startDeliveryMission();
    } else if(this.data?.type=='svl'){
      this.startSurvelliance();
    }
  }

  startDeliveryMission(){
    console.log(this.waypoints)
    this.httpService.getData(`/delivery?lat=${+this.lat}&lng=${+this.lng}&height=${+this.height}`).subscribe((res)=>{
      console.log(res);
    })
  }

  startSurvelliance(){
    console.log(this.lat,this.lng)
    // this.httpService.getData(`/command?lat=${+this.lat}&lng=${+this.lng}`).subscribe((res)=>{
    //   console.log(res);
    // })
    console.log(this.waypoints)
    this.httpService.postData(`/svl`,{waypoints:this.waypoints}).subscribe((res)=>{
      console.log(res);
    })
  }

  loadMap() {
    // console.log(this.map)
    // this.geolocation.getCurrentPosition().then((resp) => {

    //   this.lat = resp.coords.latitude;
    //   this.lng = resp.coords.longitude;

    //   let latLng = new google.maps.LatLng(this.lat,this.lng);
    //   let mapOptions = {
    //     center: latLng,
    //     zoom: 15,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   }

    //   this.getAddressFromCoords(this.lat, this.lng);

    //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    //   this.map.addListener('dragend', () => {

    //     this.lat = this.map.center.lat();
    //     this.lng = this.map.center.lng();

    //     this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
    //   });

    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });
  }

  getAddressFromCoords(lattitude, longitude) {
    // console.log("getAddressFromCoords " + lattitude + " " + longitude);
    // let options: NativeGeocoderOptions = {
    //   useLocale: true,
    //   maxResults: 5
    // };

    // this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
    //   .then((result: NativeGeocoderResult[]) => {
    //     this.address = "";
    //     let responseAddress = [];
    //     for (let [key, value] of Object.entries(result[0])) {
    //       if (value.length > 0)
    //         responseAddress.push(value);

    //     }
    //     responseAddress.reverse();
    //     for (let value of responseAddress) {
    //       this.address += value + ", ";
    //     }
    //     this.address = this.address.slice(0, -2);
    //   })
    //   .catch((error: any) => {
    //     this.address = "Address Not Available!";
    //   });

  }

  leafletMap() {
    // this.map = Leaflet.map('mapId').setView([28.644800, 77.216721], 5);
    // Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   // attribution: 'edupala.com © Angular LeafLet',
    // }).addTo(this.map);

    // Leaflet.marker([28.6, 77]).addTo(this.map).bindPopup('Delhi').openPopup();
    // Leaflet.marker([34, 77]).addTo(this.map).bindPopup('Leh').openPopup();

    // antPath([[28.644800, 77.216721], [34.1526, 77.5771]],
    //   { color: '#FF0000', weight: 5, opacity: 0.6 })
    //   .addTo(this.map);
  }
}
