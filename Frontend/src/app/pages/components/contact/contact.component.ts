import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.scrollToTop();

  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
