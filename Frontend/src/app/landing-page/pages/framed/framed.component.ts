import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-framed',
  templateUrl: './framed.component.html'
})
export class FramedComponent implements OnInit {
  show: boolean = false;
  pictureRoute: string = '';
  constructor(private titleService: Title) { }
  ngOnInit(): void {
    this.titleService.setTitle('Enmarcado');
  }

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
