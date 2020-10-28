import { UnauthorizedComponent } from './pages/unauthorized.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from './pages/page-not-found.component';

import { AuthGuard } from './security/auth.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'home', 
    component: LayoutComponent, 
    children: [
      { 
        path : '', 
        component: HomeComponent, 
        canActivate : [AuthGuard] 
      }
    ]
  },
  { 
    path: 'unauthorized', 
    component: LayoutComponent, 
    children: [
      { 
        path: '', 
        component: UnauthorizedComponent 
      }
    ]
  },
  { 
    path: 'page-not-found', 
    component: LayoutComponent, 
    children: [
      { 
        path: '', 
        component: PageNotFoundComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
