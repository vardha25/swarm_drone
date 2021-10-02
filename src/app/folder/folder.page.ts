import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthUserService } from '../core/services/auth.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  data={type:'home',button:'Plan a Mission',description:'This will open up Mission Planner App where you can feed waypoints for the flight.'};
  url="http://10.42.0.1:8000/index.html";
  package = "com.michaeloborne.MissionPlanner"
  role=localStorage.getItem('role')

  constructor(private activatedRoute: ActivatedRoute,private authService:AuthUserService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  logout(){
    this.authService.logout();
  }

}
