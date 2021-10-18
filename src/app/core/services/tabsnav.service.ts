import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabnavService {
  public navigationProccess:Array<any> = [];
  public lastTabName:string = "";
  public currentBack:string = "";
  constructor() { }

  pushTabHistory(tabName:string){
    let navHistory = {
      url:tabName
    };
    this.navigationProccess.push(navHistory)
  }
}