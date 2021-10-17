import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
declare var google;
import { GoogleMaps, GoogleMap, Environment, GoogleMapOptions, GoogleMapsEvent, Marker } from "@ionic-native/google-maps/";
import * as L from 'leaflet';
import { ParallaxService } from '../core/services/parallax-service';
@Component({
  selector: 'app-delivery-gmap',
  templateUrl: './delivery-gmap.component.html',
  styleUrls: ['./delivery-gmap.component.scss'],
})
export class DeliveryGmapComponent implements OnInit, AfterViewInit,OnDestroy {

  // @ViewChild('map') mapElement: ElementRef;
  // map: any;
  private map: L.Map;
  marker;
  greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // map: GoogleMap;

  constructor(public navCtrl: NavController, private platform: Platform, private paralaxService: ParallaxService) { }

  @Input() lat;
  @Input() lng;
  @Output() sendlatlng = new EventEmitter();
  latitude;
  longitude;
  zoom
  async ngOnInit() {

    await this.platform.ready();
    // await this.loadMap();
    this.latitude = this.lat;
    this.longitude = this.lng;

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


  loadMap() {

    // Environment.setEnv({
    //   'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCPePLwFK_QYNpViCNVkRHVnPYQyZgQ8xc',
    //   'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCPePLwFK_QYNpViCNVkRHVnPYQyZgQ8xc'
    // });

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

  ngAfterViewInit(): void {
    let that = this;
    this.initMap();
    setTimeout(() => { 
      that.map.invalidateSize()
       }, 100)

  }

  private initMap() {
    let that = this;
    // let mymap = L.DomUtil.get('map');
    // if(!mymap._leaflet_id){
      // this.map._leaflet_id = null;
      this.map = L.map('dmap', {
        // center: [ 22.55057, 75.7625 ],
        zoom: 11
      });
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      this.map.locate({setView: true, maxZoom: 11});
      tiles.addTo(this.map);
      this.map.on('click', function (e) {
  
        console.log(e.latlng); // e is an event object (MouseEvent in this case)
        that.locateMarker(e.latlng)
      });
      this.map.on('locationfound', this.onLocationFound);
  
      this.map.on('locationerror', this.onLocationError);
      that.paralaxService.latlng.subscribe((res) => {
        if (res) {
          that.locateMarker(res)
        }
      });
      this.paralaxService.addMarker.subscribe((res) => {
        if (res) {
          this.addMarker(res)
        }
      })
    // }


  }

  addMarker(latlng) {
    // if (this.marker) {
    //   this.map.removeLayer(this.marker);
    // }
    let marker: Marker;
    marker = L.marker(latlng, { draggable: false,icon:this.greenIcon }).addTo(this.map);
    this.sendlatlng.emit(latlng);
    // this.map.panTo(new L.LatLng(latlng.lat, latlng.lng));
  }

  locateMarker(latlng) {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = L.marker(latlng, { draggable: true }).addTo(this.map);
    this.sendlatlng.emit(latlng);
    this.map.panTo(new L.LatLng(latlng.lat, latlng.lng));
  }

  onLocationFound(e) {
    if(this.map){
    var radius = e.accuracy;

    L.marker(e.latlng)?.addTo(this.map)
      .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(this.map);
    this.locateMarker(e.latlng);
    }
  }
  onLocationError(e) {
    alert(e.message);
  }
  ngOnDestroy(){
    // this.map.remove();
    // this.map.off();
  }
}
