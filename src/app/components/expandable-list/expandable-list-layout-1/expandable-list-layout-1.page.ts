import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'expandable-list-layout-1',
  templateUrl: 'expandable-list-layout-1.page.html',
  styleUrls: ['expandable-list-layout-1.page.scss'],
})
export class ExpandableListLayout1Page implements OnChanges {
  
  @Input() data: any;
  @Output() onItemClick = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: { [propKey: string]: any }) {
    this.data = changes['data'].currentValue;
  }

  onItemClickFunc(item) {
    if (event) {
      event.stopPropagation();
    }
    this.onItemClick.emit(item);
  }



  toggleGroup(group: any) {
    if (event) {
      event.stopPropagation();
    }
    group.show = !group.show;
  }
}
