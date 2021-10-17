import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthUserService } from '../core/services/auth.service';

@Component({
  selector: 'survelliance',
  templateUrl: './survelliance.page.html',
  styleUrls: ['./survelliance.page.scss'],
})
export class SurvelliancePage {

  data={type:'svl',button:'Start Mission',title:'Enter waypoint Coordinates'}
  constructor(private authService:AuthUserService) { }

  logout(){
    this.authService.logout();
  }
}
