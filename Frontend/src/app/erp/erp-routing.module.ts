import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './pages/orders/orders.component';

import { LayouterpComponent } from './pages/layouterp/layouterp.component';
import { ClientComponent } from './components/forms/client/client.component';
import { GlassComponent } from './components/forms/glass/glass.component';
import { FilletComponent } from './components/forms/fillet/fillet.component';
import { FrameComponent } from './components/forms/frame/frame.component';
import { PassepartoutComponent } from './components/forms/passepartout/passepartout.component';
import { UtilityComponent } from './components/forms/utility/utility.component';
import { PieceComponent } from './components/forms/piece/piece.component';
import { RegisterComponent } from './components/forms/register/register.component';
import { ChangePasswordComponent } from './components/forms/change-password/change-password.component';

import { CardManagementComponent } from './components/card-management/card-management.component';
import { PendingComponent } from './pages/pending/pending.component';
import { BrowserOrderComponent } from './pages/browser-order/browser-order.component';
import { ReportComponent } from './pages/report/report.component';


const routes: Routes = [
  {
    path: '',
    component: LayouterpComponent,
    children: [
      { path: 'pedidos', component: OrdersComponent },
      { path: 'cliente', component: ClientComponent },
      {path: 'vidrio', component: GlassComponent},
      {path: 'filete', component: FilletComponent},
      {path: 'marco', component: FrameComponent},
      {path: 'passepartout', component: PassepartoutComponent},
      {path: 'utilidad', component: UtilityComponent},
      {path: 'galeria', component: PieceComponent},
      {path: 'registrar', component: RegisterComponent},
      {path: 'cambiarContraseña', component: ChangePasswordComponent}, 
      {path: 'pedido', component: CardManagementComponent},
      {path: 'pendiente', component: PendingComponent},
      {path: 'busqueda', component: BrowserOrderComponent},
      {path: 'reporte', component: ReportComponent}
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ERPRoutingModule {}
