import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent, TabsComponent } from './tabs.component';



@NgModule({
  declarations: [
    TabsComponent,
    TabComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TabsComponent,
    TabComponent
  ]
})
export class TabsModule { }
