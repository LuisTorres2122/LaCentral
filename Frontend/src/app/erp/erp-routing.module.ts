import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './pages/orders/orders.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayouterpComponent } from './pages/layouterp/layouterp.component';
import { ClientComponent } from './components/forms/client/client.component';
import { GlassComponent } from './components/forms/glass/glass.component';
import { FilletComponent } from './components/forms/fillet/fillet.component';
import { FrameComponent } from './components/forms/frame/frame.component';
import { PassepartoutComponent } from './components/forms/passepartout/passepartout.component';
import { UtilityComponent } from './components/forms/utility/utility.component';


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
     
    
      
      // Agrega más rutas según sea necesario
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ERPRoutingModule {}
