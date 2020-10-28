import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { LayoutComponent } from '../../layout/layout.component';
import { AuthGuard } from '../../security/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: 'products',
    component: LayoutComponent, 
    canActivate: [AuthGuard], 
    canActivateChild: [AuthGuard], 
    children: [
      { 
        path: 'list', 
        component: ProductListComponent, 
        data: { roles: ['ADMIN'] } 
      },
      { 
        path: 'form', 
        component: ProductFormComponent,
        data: { roles: ['ADMIN'] } 
      },
      { 
        path: 'form/:id', 
        component: ProductFormComponent,
        data: { roles: ['ADMIN'] } 
      },
      { 
        path: '', 
        redirectTo: '/products/list', 
        pathMatch: 'full' 
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
