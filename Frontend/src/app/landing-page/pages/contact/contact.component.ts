import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  constructor(private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Contacto');
  }
}
