import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutProductsComponent } from './layout-products/layout-products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TargetProductComponent } from './components/target-product/target-product.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { CardProductsComponent } from './pages/card-products/card-products.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { InfoProductComponent } from './components/info-product/info-product.component';


@NgModule({
  declarations: [
    LayoutProductsComponent,
    TargetProductComponent,
    ListProductsComponent,
    CardProductsComponent,
    FormProductComponent,
    InfoProductComponent
  ],
  imports: [
    ProductsRoutingModule,
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProductsModule { }
