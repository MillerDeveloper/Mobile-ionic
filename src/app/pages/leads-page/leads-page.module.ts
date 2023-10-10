import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddLead, AllLeadsPageComponent } from './all-leads-page/all-leads-page.component';
import { LeadsPageComponent } from './leads-page.component';
import { LoaderModule } from 'src/app/shared/widgets/loader/loader.module';
import { IonicModule } from '@ionic/angular';
import { WrapperTableModule } from 'src/app/shared/components/wrapper-table/wrapper-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardLeadPageComponent } from './card-lead-page/card-lead-page.component';
import { CardItemModule } from 'src/app/shared/components/card-item/card-item.module';



@NgModule({
  declarations: [
    LeadsPageComponent,
    AllLeadsPageComponent,
    AddLead,
    CardLeadPageComponent
  ],
  imports: [
    CommonModule,
    LoaderModule,
    IonicModule,
    WrapperTableModule,
    ReactiveFormsModule,
    CardItemModule
  ]
})
export class LeadsPageModule { }
