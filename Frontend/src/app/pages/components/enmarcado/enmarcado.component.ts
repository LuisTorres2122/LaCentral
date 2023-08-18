import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-enmarcado',
  templateUrl: './enmarcado.component.html',
  styleUrls: ['./enmarcado.component.css'],
})
export class EnmarcadoComponent {
  show: boolean = false;
  pictureRoute: string = '';

  ngAfterViewInit(): void {
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  hidePicture(): void {
    this.show = false;
  }


  changePictureRoute(route: string): string {
    this.show = true;
    return (this.pictureRoute = route);
  }
}
