import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Card } from '../../models/orderHelper.model';
import { serviceDetails } from '../../models/order.model';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html'
})
export class OrderCardComponent {
  cardActivate: boolean[] = [];
  @Input() Cards: Card[];
  @Input() Details: serviceDetails[];
  @Output() UpdatedCards = new EventEmitter<Card[]>();
  @Output() UpdatedDetails = new EventEmitter<serviceDetails[]>();



  deleted(index: number): void {
    let id = this.Cards[index].id;
    this.Details = this.Details.filter(x => x.idDetallePedido == id);
    this.Cards.splice(index, 1);
    this.cardActivate.splice(index, 1);
    this.UpdatedCards.emit(this.Cards);
    this.UpdatedDetails.emit(this.Details);
  }

  changeToggle(index: number): void {
    if (this.cardActivate[index]) {
      this.cardActivate[index] = false;
    } else {
      this.cardActivate[index] = true;
    }
  }
}

export interface displayCard {
  position: number;
  status: boolean;
}
