import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AuthGuard } from '../../core/auth.guard';

const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'product-detail/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
    { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
    { path: 'update-product/:id', component: UpdateProductComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventoryRoutingModule { }
