import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SurvelliancePage } from '../survelliance/survelliance.page';
import { DeliveryPage } from '../delivery/delivery.page';
import { MissionRoutingModule } from './mission.routing.module';
import { SharedModule } from '../components/shared.module';



@NgModule({
  declarations: [SurvelliancePage,DeliveryPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MissionRoutingModule,
    SharedModule
  ]
})
export class MissionModule { 

}
