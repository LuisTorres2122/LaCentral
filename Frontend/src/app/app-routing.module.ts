import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ERPModule } from './erp/erp.module';

const routes: Routes = [
  {path:"pagina", loadChildren: () => import('./pages/pages.module').then((authmodule) => authmodule.PagesModule) },
  {path:"autorizacion", loadChildren: () => import('./auth/auth.module').then((authmodule) => authmodule.AuthModule) },
  {path: "erp", loadChildren: () => import('./erp/erp.module').then((erpmodule) => erpmodule.ERPModule )},
  {path:"**", redirectTo: 'pagina/inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
