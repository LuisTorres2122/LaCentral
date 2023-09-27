import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html'
})
export class NotifyComponent {
@Input() type:string;
}
