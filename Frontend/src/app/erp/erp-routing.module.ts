import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './pages/orders/orders.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayouterpComponent } from './pages/layouterp/layouterp.component';
import { LayoutMantenanceComponent } from './pages/layout-mantenance/layout-mantenance.component';
import { PassepartoutComponent } from './components/forms/passepartout/passepartout.component';
import { VidrioComponent } from './components/forms/vidrio/vidrio.component';
import { FileteComponent } from './components/forms/filete/filete.component';
import { MarcoComponent } from './components/forms/marco/marco.component';
import { DesperdicioComponent } from './components/forms/desperdicio/desperdicio.component';
import { UtilidadComponent } from './components/forms/utilidad/utilidad.component';
import { ClienteComponent } from './components/forms/cliente/cliente.component';
import { GaleriaComponent } from './components/forms/galeria/galeria.component';

const routes: Routes = [
  {
    path: '',
    component: LayouterpComponent,
    children: [
      { path: 'pedidos', component: OrdersComponent },
      { path: 'mantenimientos',
       component: LayoutMantenanceComponent,
      children:[
        {path: 'passepartout', component: PassepartoutComponent},
        {path: 'vidrio', component: VidrioComponent},
        {path: 'filete', component: FileteComponent},
        {path: 'marco', component: MarcoComponent},
        {path: 'desperdicio', component: DesperdicioComponent},
        {path: 'utilidad', component: UtilidadComponent},
        {path: 'cliente', component: ClienteComponent},
        {path: 'galeria', component: GaleriaComponent},
      ] },
      // Agrega más rutas según sea necesario
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ERPRoutingModule {}
