import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.scrollToTop();

  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

}
