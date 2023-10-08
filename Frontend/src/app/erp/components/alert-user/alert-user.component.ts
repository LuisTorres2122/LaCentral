import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-user',
  templateUrl: './alert-user.component.html'
})
export class AlertUserComponent {
  @Input() type:string;
}
