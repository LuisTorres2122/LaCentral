import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badalert',
  templateUrl: './badalert.component.html'
})
export class BadalertComponent {
  @Input() type:string;
}
