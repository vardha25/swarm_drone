import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  data={type:'home',button:'Plan a Mission',description:'This will open up Mission Planner App where you can feed waypoints for the flight.'};
  url="http://10.42.0.1:8000";
  package = "com.michaeloborne.MissionPlanner"

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
