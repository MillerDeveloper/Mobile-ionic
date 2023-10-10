import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesPageComponent } from './sales-page.component';
import { AddSale, AllSalesPageComponent } from './all-sales-page/all-sales-page.component';
import { CardSalePageComponent } from './card-sale-page/card-sale-page.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { WrapperTableModule } from 'src/app/shared/components/wrapper-table/wrapper-table.module';
import { LoaderModule } from 'src/app/shared/widgets/loader/loader.module';
import { CardItemModule } from 'src/app/shared/components/card-item/card-item.module';



@NgModule({
  declarations: [
    SalesPageComponent,
    AllSalesPageComponent,
    CardSalePageComponent,
    AddSale
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    WrapperTableModule,
    LoaderModule,
    CardItemModule
  ]
})
export class SalesPageModule { }
