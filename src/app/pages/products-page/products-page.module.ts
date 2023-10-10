import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './products-page.component';
import { AddProduct, AllProductsPageComponent } from './all-products-page/all-products-page.component';
import { CardProductPageComponent } from './card-product-page/card-product-page.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { WrapperTableModule } from 'src/app/shared/components/wrapper-table/wrapper-table.module';
import { LoaderModule } from 'src/app/shared/widgets/loader/loader.module';
import { CardItemModule } from 'src/app/shared/components/card-item/card-item.module';



@NgModule({
  declarations: [
    ProductsPageComponent,
    AllProductsPageComponent,
    CardProductPageComponent,
    AddProduct
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
export class ProductsPageModule { }
