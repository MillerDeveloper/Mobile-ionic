import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TokenInterceptor, TokenInterceptorImport } from 'src/app/shared/interceptors/token.interceptor';
import { LeadsPageModule } from 'src/app/pages/leads-page/leads-page.module';
import { APP_INITIALIZER } from '@angular/core';
import { CompaniesService } from 'src/app/shared/services/companies-service/companies.service';
import { UsersService } from 'src/app/shared/services/users-service/users.service';
import { SalesPageModule } from 'src/app/pages/sales-page/sales-page.module';
import { DiaryPageModule } from 'src/app/pages/diary-page/diary-page.module';
import { ProductsPageModule } from 'src/app/pages/products-page/products-page.module';
import { CounterpartiesPageModule } from 'src/app/pages/counterparties-page/counterparties-page.module';
import { FinancesPageModule } from 'src/app/pages/finances-page/finances-page.module';
import { FilesPageModule } from 'src/app/pages/storage-page/storage-page.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    LeadsPageModule,
    SalesPageModule,
    DiaryPageModule,
    ProductsPageModule,
    CounterpartiesPageModule,
    FinancesPageModule,
    FilesPageModule,
    HttpClientModule
  ],
  providers: [
    TokenInterceptor,
    TokenInterceptorImport,
    {
      provide: APP_INITIALIZER,
      useFactory: (companiesService: CompaniesService, usersService: UsersService) => async () => {
        await companiesService.fetchCurrentCompany()
        await usersService.fetchUsersWithCurrent()
      },
      deps: [CompaniesService, UsersService],
      multi: true
    }
  ]
})
export class DefaultLayoutModule { }
