import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  
  {path:"lacentral", loadChildren: () => import('./landing-page/landing-page.module').then((landing) => landing.LandingPageModule) },
  {path: "erp", canActivate:[AuthGuard], loadChildren: () => import('./erp/erp.module').then((erpmodule) => erpmodule.ERPModule )},
  {path:"**", redirectTo: 'lacentral/inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
