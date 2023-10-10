import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    LoaderComponent
  ]
})
export class LoaderModule { }
