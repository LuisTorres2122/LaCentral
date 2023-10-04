import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ERPRoutingModule } from './erp-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { LayouterpComponent } from './pages/layouterp/layouterp.component';
import { CardManagementComponent } from './components/card-management/card-management.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutMantenanceComponent } from './pages/layout-mantenance/layout-mantenance.component';
import {  HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './components/alert/alert.component';
import { ClientComponent } from './components/forms/client/client.component';
import { NotifyComponent } from './components/notify/notify.component';
import { BadalertComponent } from './components/badalert/badalert.component';
import { GlassComponent } from './components/forms/glass/glass.component';
import { FilletComponent } from './components/forms/fillet/fillet.component';
import { FrameComponent } from './components/forms/frame/frame.component';
import { PassepartoutComponent } from './components/forms/passepartout/passepartout.component';
import { UtilityComponent } from './components/forms/utility/utility.component';
import { PieceComponent } from './components/forms/piece/piece.component';

import { ChangePasswordComponent } from './components/forms/change-password/change-password.component';
import { RegisterComponent } from './components/forms/register/register.component';
import { AlertUserComponent } from './components/alert-user/alert-user.component';
import { OrderSheetComponent } from './components/order-sheet/order-sheet.component';
import { PrintComponent } from './components/print/print.component';



@NgModule({
  declarations: [
    SidebarComponent,
    OrdersComponent,
    LayouterpComponent,
    CardManagementComponent,
    OrderCardComponent,
    LayoutMantenanceComponent,
    AlertComponent,
    ClientComponent,
    NotifyComponent,
    BadalertComponent,
    GlassComponent,
    FilletComponent,
    FrameComponent,
    PassepartoutComponent,
    UtilityComponent,
    PieceComponent,
    ChangePasswordComponent,
    RegisterComponent,
    AlertUserComponent,
    OrderSheetComponent,
    PrintComponent
  ],
  imports: [
    CommonModule,
    ERPRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports:[
    AlertComponent, 
    BadalertComponent
  ]
})
export class ERPModule { }
