import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperTableComponent } from './wrapper-table.component';
import { FilterComponent } from '../filter/filter.component';
import { IonicModule } from '@ionic/angular';
import { StateModule } from '../../widgets/state/state.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CallNumber } from '@ionic-native/call-number/ngx';

@NgModule({ 
  declarations: [
    WrapperTableComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    StateModule,
    ReactiveFormsModule
  ],
  exports: [
    WrapperTableComponent
  ],
  providers: [
    CallNumber
  ]
})
export class WrapperTableModule { }
