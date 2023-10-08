import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FramedComponent } from './pages/framed/framed.component';
import { FrameComponent } from './components/frame/frame.component';
import { ShowPictureComponent } from './components/show-picture/show-picture.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { PieceComponent } from './pages/piece/piece.component';
import { LoginComponent } from './pages/login/login.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ReactiveFormsModule } from '@angular/forms';
import { ERPModule } from '../erp/erp.module';


@NgModule({
  declarations: [
    MainLayoutComponent,
    NavbarComponent,
    FooterComponent,
    AboutUsComponent,
    HeaderComponent,
    ContactComponent,
    FramedComponent,
    FrameComponent,
    ShowPictureComponent,
    GalleryComponent,
    HomeComponent,
    PieceComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    LazyLoadImageModule,
    ReactiveFormsModule,
    ERPModule
  ]
})
export class LandingPageModule { }
