import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { ITab } from '../../interfaces/global.interface';

@Component({
  selector: 'tab',
  styles: [
    `
    .pane{
      padding: 1em;
    }
  `
  ],
  template: `
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
    </div>
  `
})

export class TabComponent {
  @Input('tabTitle') title: string
  @Input() active!: boolean
}


@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>

  constructor() { }
  
  ngAfterContentInit() {
    let activeTabs = this.tabs.filter((tab) => tab.active)
    
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first)
    }
  }
  
  selectTab(tab: any) {
    console.log(tab);
    
    // this.tabs.toArray().forEach((tb) => {
    //   console.log(tab.title == tb.title)      
    //   if(tab.title == tb.title) tab.active = false
    //   else tb.active = false
    // })
    if(tab) {
      tab.active = true
    }
  }
}
