import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../../models/order.model';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html'
})
export class PrintComponent {
@Input() data: Transaction;
@Output() show = new EventEmitter<boolean>();
checkboxSeleccionado:string = '';


  seleccionarCheckbox(checkbox: string):void {
    this.checkboxSeleccionado = checkbox;
   console.log(checkbox);
  }

  

closeShow():void{
  this.show.emit(false); 
}


}
