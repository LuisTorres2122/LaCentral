import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Card, updateCards } from '../../models/orderHelper.model';
import { serviceDetails } from '../../models/order.model';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html'
})
export class OrderCardComponent {
  cardActivate: boolean[] = [];
  @Input() Cards: Card[];
  @Input() Details: serviceDetails[];//no se reciben bien
  @Output() updatedData = new EventEmitter<updateCards>();





  deleted(index: number): void {
    console.log(this.Cards);
    console.log(this.Details);
    let id = this.Cards[index].id;
    const data = new updateCards();
    
    this.Details = this.Details.filter(x => x.idDetallePedido != id);
    console.log(this.Details);
    this.Cards.splice(index, 1);
    this.cardActivate.splice(index, 1);
    data.cards = this.Cards;
    data.Details = this.Details;
    this.updatedData.emit(data);
    
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
