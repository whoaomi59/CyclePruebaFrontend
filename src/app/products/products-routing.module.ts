import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutProductsComponent } from './layout-products/layout-products.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { CardProductsComponent } from './pages/card-products/card-products.component';

export const routes:Routes = [{
    path: '', component: LayoutProductsComponent,
    children: [
        {path: 'table', component: ListProductsComponent},
        {path: 'card',  component: CardProductsComponent},
        {path: '**', redirectTo: 'card'}
    ]
}];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class  ProductsRoutingModule { }