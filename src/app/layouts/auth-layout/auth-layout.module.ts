import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from 'src/app/pages/login-page/login-page.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from 'src/app/shared/services/login-service/login.service';



@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    LoginService
  ]
})
export class AuthLayoutModule { }
