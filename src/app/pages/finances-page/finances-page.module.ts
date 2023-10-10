import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancesPageComponent } from './finances-page.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { WrapperTableModule } from 'src/app/shared/components/wrapper-table/wrapper-table.module';
import { CardItemModule } from 'src/app/shared/components/card-item/card-item.module';
import { LoaderModule } from 'src/app/shared/widgets/loader/loader.module';
import { AddFinance, AllFinancesPageComponent } from './all-finances-page/all-finances-page.component';
import { CardFinancePageComponent } from './card-finance-page/card-finance-page.component';



@NgModule({
  declarations: [
    FinancesPageComponent,
    AddFinance,
    AllFinancesPageComponent,
    CardFinancePageComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    WrapperTableModule,
    CardItemModule,
    LoaderModule
  ]
})
export class FinancesPageModule { }
