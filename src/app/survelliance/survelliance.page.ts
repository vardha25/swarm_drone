import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../core/services/auth.service';

@Component({
  selector: 'survelliance',
  templateUrl: './survelliance.page.html',
  styleUrls: ['./survelliance.page.scss'],
})
export class SurvelliancePage implements OnInit {

  data={type:'svl',button:'Start Mission',title:'Enter waypoint Coordinates'}
  constructor(private authService:AuthUserService) { }

  ngOnInit() {}

  logout(){
    this.authService.logout();
  }

}
