import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { ParallaxHeader } from './parallax/parallax-header';
import { ParallaxLayout1Page } from './parallax/parallax-layout-1/parallax-layout-1.page';
import { ExpandableListLayout1Page } from './expandable-list/expandable-list-layout-1/expandable-list-layout-1.page';
import { GmapComponent } from '../gmap/gmap.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeliveryGmapComponent } from '../delivery-gmap/delivery-gmap.component';

@NgModule({
  imports: [CommonModule, IonicModule,FormsModule,ReactiveFormsModule],
  declarations: [ParallaxHeader, ParallaxLayout1Page, ExpandableListLayout1Page,GmapComponent,DeliveryGmapComponent],
  exports: [ParallaxHeader, ParallaxLayout1Page, ExpandableListLayout1Page,NativeGeocoder],
  providers:[Geolocation,NativeGeocoder],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
