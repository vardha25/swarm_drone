import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryPage } from '../delivery/delivery.page';
import { SurvelliancePage } from '../survelliance/survelliance.page';

const routes: Routes = [

      {
        path: 'survelliance',
        component:SurvelliancePage
      },
      {
        path: 'delivery',
        component:DeliveryPage
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MissionRoutingModule {}