import { Component, Input, OnInit } from '@angular/core';
import { OrderDetails, Transaction } from '../../models/order.model';

@Component({
  selector: 'app-order-sheet',
  templateUrl: './order-sheet.component.html',
})
export class OrderSheetComponent implements OnInit {
  @Input() data: Transaction;
  cols: number = 0;
  position: boolean;
  width: boolean;
  ngOnInit(): void {}

  setOrientatioSheet(): void {
    if (this.data.orderDetails.length <= 5) {
      this.position = false;
    } else {
      if (this.data.orderDetails.length <= 10) {
        this.position = true;
        this.width = false;
      } else {
        this.position = true;
        let length = this.data.orderDetails.length;
        let col = Math.ceil(length / 10);
        this.cols = col;
      }
    }
  }
}
