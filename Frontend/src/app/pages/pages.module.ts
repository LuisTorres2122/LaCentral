import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './components/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactComponent } from './components/contact/contact.component';
import { SharedModule } from '../shared/shared.module';
import { EnmarcadoComponent } from './components/enmarcado/enmarcado.component';
import { PieceComponent } from './components/piece/piece.component';
import { MolduraComponent } from './components/moldura/moldura.component';
import { ShowPictureComponent } from './components/show-picture/show-picture.component';
import { HeaderComponent } from './components/header/header.component';




@NgModule({
  declarations: [
    HomeComponent,
    GalleryComponent,
    AboutusComponent,
    ContactComponent,
    EnmarcadoComponent,
    PieceComponent,
    MolduraComponent,
    ShowPictureComponent,
    HeaderComponent,
   

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    NgOptimizedImage
    
  ]
})
export class PagesModule { }
