import {Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
declare var google;
import { GoogleMaps, GoogleMap, Environment, GoogleMapOptions, GoogleMapsEvent, Marker } from "@ionic-native/google-maps/";
@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss'],
})
export class GmapComponent implements OnInit{

  // @ViewChild('map') mapElement: ElementRef;
  // map: any;
  map: GoogleMap;
  constructor(public navCtrl: NavController,private platform:Platform) { }

  latitude;
  longitude;
  zoom
  async ngOnInit(){
    await this.platform.ready();
    await this.loadMap();
  }

  getAddress(lat,lng){
    let latLng = new google.maps.LatLng(-lat, lng);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map('map_canvas', mapOptions);
  }


  loadMap(){
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCPePLwFK_QYNpViCNVkRHVnPYQyZgQ8xc',
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCPePLwFK_QYNpViCNVkRHVnPYQyZgQ8xc'
    });

    // this.map = GoogleMaps.create('map_canvas');
    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      snippet: 'teste',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }
}
