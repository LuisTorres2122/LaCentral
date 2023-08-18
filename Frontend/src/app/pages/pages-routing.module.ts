import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { EnmarcadoComponent } from './components/enmarcado/enmarcado.component';
import { PieceComponent } from './components/piece/piece.component';

const routes: Routes = [
  {path:'inicio', component: HomeComponent},
  {path:'contacto', component: ContactComponent},
  {path: 'nosotros', component: AboutusComponent},
  {path:'galeria', component: GalleryComponent},
  {path: 'enmarcado', component: EnmarcadoComponent },
  {path:'galeria/pieza/:id', component: PieceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
