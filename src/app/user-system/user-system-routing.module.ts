import { UserSystemListComponent } from './user-system-list/user-system-list.component';
import { UserSystemFormComponent } from './user-system-form/user-system-form.component';
import { AuthGuard } from './../security/auth.guard';
import { LayoutComponent } from './../layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: 'user-systems',
    component: LayoutComponent, 
    canActivate: [AuthGuard], 
    canActivateChild: [AuthGuard], 
    children: [
      { 
        path: 'list', 
        component: UserSystemListComponent, 
        data: { roles: ['ADMIN'] } 
      },
      { 
        path: 'form', 
        component: UserSystemFormComponent,
        data: { roles: ['ADMIN'] } 
      },
      { 
        path: 'form/:id', 
        component: UserSystemFormComponent,
        data: { roles: ['ADMIN'] } 
      },
      { 
        path: '', 
        redirectTo: '/user-systems/list', 
        pathMatch: 'full' 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSystemRoutingModule { }
