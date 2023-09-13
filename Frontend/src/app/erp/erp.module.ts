import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ERPRoutingModule } from './erp-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { LayouterpComponent } from './pages/layouterp/layouterp.component';
import { CardManagementComponent } from './components/card-management/card-management.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { FormsModule } from '@angular/forms';
import { LayoutMantenanceComponent } from './pages/layout-mantenance/layout-mantenance.component';
import { PassepartoutComponent } from './components/forms/passepartout/passepartout.component';
import { VidrioComponent } from './components/forms/vidrio/vidrio.component';
import { FileteComponent } from './components/forms/filete/filete.component';
import { MarcoComponent } from './components/forms/marco/marco.component';
import { DesperdicioComponent } from './components/forms/desperdicio/desperdicio.component';
import { UtilidadComponent } from './components/forms/utilidad/utilidad.component';
import { ClienteComponent } from './components/forms/cliente/cliente.component';
import { GaleriaComponent } from './components/forms/galeria/galeria.component';


@NgModule({
  declarations: [
    SidebarComponent,
    OrdersComponent,
    LayouterpComponent,
    CardManagementComponent,
    OrderCardComponent,
    LayoutMantenanceComponent,
    PassepartoutComponent,
    VidrioComponent,
    FileteComponent,
    MarcoComponent,
    DesperdicioComponent,
    UtilidadComponent,
    ClienteComponent,
    GaleriaComponent
  ],
  imports: [
    CommonModule,
    ERPRoutingModule,
    FormsModule
  ]
})
export class ERPModule { }
