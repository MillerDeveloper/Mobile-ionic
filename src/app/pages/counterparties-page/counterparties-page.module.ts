import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterpartiesPageComponent } from './counterparties-page.component';
import { AddCounterparty, AllCounterpartiesPageComponent } from './all-counterparties-page/all-counterparties-page.component';
import { CardCounterpartyPageComponent } from './card-counterparty-page/card-counterparty-page.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { WrapperTableModule } from 'src/app/shared/components/wrapper-table/wrapper-table.module';
import { LoaderModule } from 'src/app/shared/widgets/loader/loader.module';
import { CardItemModule } from 'src/app/shared/components/card-item/card-item.module';



@NgModule({
  declarations: [
    CounterpartiesPageComponent,
    AllCounterpartiesPageComponent,
    CardCounterpartyPageComponent,
    AddCounterparty
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    WrapperTableModule,
    LoaderModule,
    CardItemModule
  ],
  exports: [
    AddCounterparty
  ]
})
export class CounterpartiesPageModule { }
