import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../core/services/auth.service';
import { HttpService } from '../core/services/http.service';

@Component({
  selector: 'delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage implements OnInit {
  lat;
  lng;
  constructor(private httpService:HttpService,private authService:AuthUserService) { }

  data={type:'delivery',button:'Start Mission',title:'Enter waypoint Coordinates'}
  ngOnInit() {}



  logout(){
    this.authService.logout();
  }

}
