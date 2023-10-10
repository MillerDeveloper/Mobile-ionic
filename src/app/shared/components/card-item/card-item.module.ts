import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardItemComponent } from './card-item.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from '../../widgets/tabs/tabs.module';
import { StateModule } from '../../widgets/state/state.module';
import { DiaryPageModule } from 'src/app/pages/diary-page/diary-page.module';
import { CallNumber } from '@ionic-native/call-number/ngx';



@NgModule({
  declarations: [
    CardItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    TabsModule,
    StateModule,
    DiaryPageModule
  ],
  exports: [
    CardItemComponent
  ],
  providers: [
    CallNumber
  ]
})
export class CardItemModule { }
