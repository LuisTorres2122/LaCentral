import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() phrase:string="";
  @Input() author:string="";
  @Input() image:string="";
}
