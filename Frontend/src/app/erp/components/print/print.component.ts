import { Component, Input } from '@angular/core';
import { Transaction } from '../../models/order.model';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html'
})
export class PrintComponent {
@Input() data: Transaction;
@Input() show: boolean;

closeShow():void{
  this.show = false;
}
}
