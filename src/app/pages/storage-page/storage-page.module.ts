import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFolder, FilesPageComponent } from './storage-page.component';
import { WrapperTableModule } from 'src/app/shared/components/wrapper-table/wrapper-table.module';
import { IonicModule } from '@ionic/angular';
import { LoaderModule } from 'src/app/shared/widgets/loader/loader.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FilesPageComponent,
    AddFolder
  ],
  imports: [
    CommonModule,
    WrapperTableModule,
    IonicModule,
    LoaderModule,
    ReactiveFormsModule
  ]
})
export class FilesPageModule { }
