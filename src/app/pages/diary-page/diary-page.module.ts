import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTask, TasksPageComponent } from './tasks-page/tasks-page.component';
import { WrapperTableModule } from 'src/app/shared/components/wrapper-table/wrapper-table.module';
import { AddMeeting, MeetingsPageComponent } from './meetings-page/meetings-page.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/shared/widgets/loader/loader.module';
import { DiaryPageComponent } from './diary-page.component';
import { LogsPageComponent } from './logs-page/logs-page.component';



@NgModule({
  declarations: [
    DiaryPageComponent,
    TasksPageComponent,
    MeetingsPageComponent,
    AddTask,
    AddMeeting,
    LogsPageComponent
  ],
  imports: [
    CommonModule,
    WrapperTableModule,
    IonicModule,
    ReactiveFormsModule,
    LoaderModule
  ],
  exports: [
    TasksPageComponent,
    MeetingsPageComponent,
    AddTask,
    AddMeeting
  ]
})
export class DiaryPageModule { }
