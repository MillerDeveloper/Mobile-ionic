import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthLayoutModule } from './layouts/auth-layout/auth-layout.module';
import { CookieService } from 'ngx-cookie-service';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { DefaultLayoutModule } from './layouts/default-layout/default-layout.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    DefaultLayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AuthLayoutModule,
    DefaultLayoutModule,
  ],
  entryComponents: [],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    CookieService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
