import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { AllCounterpartiesPageComponent } from './pages/counterparties-page/all-counterparties-page/all-counterparties-page.component';
import { CardCounterpartyPageComponent } from './pages/counterparties-page/card-counterparty-page/card-counterparty-page.component';
import { CounterpartiesPageComponent } from './pages/counterparties-page/counterparties-page.component';
import { DiaryPageComponent } from './pages/diary-page/diary-page.component';
import { FilesPageComponent } from './pages/storage-page/storage-page.component';
import { FinancesPageComponent } from './pages/finances-page/finances-page.component';
import { AllLeadsPageComponent } from './pages/leads-page/all-leads-page/all-leads-page.component';
import { CardLeadPageComponent } from './pages/leads-page/card-lead-page/card-lead-page.component';
import { LeadsPageComponent } from './pages/leads-page/leads-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AllProductsPageComponent } from './pages/products-page/all-products-page/all-products-page.component';
import { CardProductPageComponent } from './pages/products-page/card-product-page/card-product-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { AllSalesPageComponent } from './pages/sales-page/all-sales-page/all-sales-page.component';
import { CardSalePageComponent } from './pages/sales-page/card-sale-page/card-sale-page.component';
import { SalesPageComponent } from './pages/sales-page/sales-page.component';
import { AllFinancesPageComponent } from './pages/finances-page/all-finances-page/all-finances-page.component';
import { CardFinancePageComponent } from './pages/finances-page/card-finance-page/card-finance-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
     {path: 'login', component: LoginPageComponent},
     {path: '', redirectTo: '/login', pathMatch: 'full'}
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {path: 'leads', component: LeadsPageComponent, children: [
        {path: '', component: AllLeadsPageComponent},
        {path: ':id', component: CardLeadPageComponent},
      ]},
      {path: 'sales', component: SalesPageComponent, children: [
        {path: '', component: AllSalesPageComponent},
        {path: ':id', component: CardSalePageComponent},
      ]},
      {path: 'products', component: ProductsPageComponent, children: [
        {path: '', component: AllProductsPageComponent},
        {path: ':id', component: CardProductPageComponent},
      ]},
      {path: 'diary', component: DiaryPageComponent},
      {path: 'counterparties', component: CounterpartiesPageComponent, children: [
        {path: '', component: AllCounterpartiesPageComponent},
        {path: ':id', component: CardCounterpartyPageComponent},
      ]},
      {path: 'finances', component: FinancesPageComponent, children: [
        {path: '', component: AllFinancesPageComponent},
        {path: ':id', component: CardFinancePageComponent},
      ]},
      {path: 'files', component: FilesPageComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
