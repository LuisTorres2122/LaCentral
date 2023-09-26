import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent {
@Input() type:string;
}
