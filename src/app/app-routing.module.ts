import { AuthGuard } from './security/auth.guard';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from './core/page-not-found.component';
import { UnauthorizedComponent } from './core/unauthorized.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'home', component: LayoutComponent, children: [
    { path : '', component: HomeComponent, canActivate : [AuthGuard] }
  ]},

  { path: 'unauthorized', component: LayoutComponent, children: [
    { path: '', component: UnauthorizedComponent }
  ]},

  { path: 'page-not-found', component: LayoutComponent, children: [
    { path: '', component: PageNotFoundComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
