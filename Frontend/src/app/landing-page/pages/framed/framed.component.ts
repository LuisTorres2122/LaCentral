import { Component } from '@angular/core';

@Component({
  selector: 'app-framed',
  templateUrl: './framed.component.html'
})
export class FramedComponent {
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
