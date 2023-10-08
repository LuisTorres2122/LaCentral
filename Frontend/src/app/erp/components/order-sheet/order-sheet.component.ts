import { Component, Input, OnInit } from '@angular/core';
import { OrderDetails, Transaction } from '../../models/order.model';

@Component({
  selector: 'app-order-sheet',
  templateUrl: './order-sheet.component.html',
})
export class OrderSheetComponent implements OnInit {
  @Input() data: Transaction;
  @Input() orientation: string = '';
  cols: number = 0;
  position: boolean;
  width: boolean;
  labour: number;
  ngOnInit(): void {}

  setLabourEnmarcado(): number {
    let getEnmarcado = this.data.orderDetails.filter((x) => {
      const regex = /enmarcado/i; // La 'i' hace que la búsqueda sea insensible a mayúsculas/minúsculas
      return regex.test(x.descripcion);
    });
    let total = this.data.orderHeader.total;
    console.log(total);
    let discount = this.data.orderHeader.descuento;
    console.log(discount);
    let setDiscountToFloat = discount / 100;
    console.log(setDiscountToFloat);
    let setDiscount = 1 - setDiscountToFloat;
    console.log(setDiscount);
    let value = total / setDiscount;
    console.log(value);
    let totalCards = 0;
    for (let a of this.data.orderDetails) {
      totalCards += a.precio;
    }
    console.log(totalCards);
    let labour = value - totalCards;
    console.log(labour);
    console.log(getEnmarcado);
    console.log(labour / getEnmarcado.length);
    return labour / getEnmarcado.length;
  }

  setPrice(element: OrderDetails): number {
    let division = this.setLabourEnmarcado();
    console.log(division);
    const regex = /enmarcado/i; // La 'i' hace que la búsqueda sea insensible a mayúsculas/minúsculas
    let selection = regex.test(element.descripcion.toLowerCase());
    if (selection) {
      console.log(element.precio + division);
      return element.precio + division;
    } else {
      console.log(element.precio);
      return element.precio;
    }
  }

  getLength(): number {
    return this.data.orderDetails.length;
  }
}
