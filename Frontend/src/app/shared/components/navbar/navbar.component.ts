import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isScrolled:boolean = false;
  toggleNav:boolean = false;


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }


  
  changeToggle():void{
    if (this.toggleNav) {
      this.toggleNav = false;
    }else{
      this.toggleNav = true;
    }
  }
  
  
}
