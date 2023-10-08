import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { FramedComponent } from './pages/framed/framed.component';
import { PieceComponent } from './pages/piece/piece.component';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';

const routes: Routes = [
{
  path: '',
    component: MainLayoutComponent,
    children: [
  {path:'inicio', component: HomeComponent},
  {path:'contacto', component: ContactComponent},
  {path: 'nosotros', component: AboutUsComponent},
  {path:'galeria', component: GalleryComponent},
  {path: 'enmarcado', component: FramedComponent },
  {path:'galeria/pieza/:id', component: PieceComponent},
  {path:'login', component: LoginComponent, },
],
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
