import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badalert',
  templateUrl: './badalert.component.html',
  styleUrls: ['./badalert.component.css']
})
export class BadalertComponent {
  @Input() type:string;
}
