import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Card, updateCards } from '../../models/orderHelper.model';
import { serviceDetails } from '../../models/order.model';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
})
export class OrderCardComponent {
  cardActivate: boolean[] = [];
  @Input() Cards: Card[];
  PastCards: Card[] = [];
  @Input() Details: serviceDetails[]; //no se reciben bien
  @Output() updatedData = new EventEmitter<updateCards>();
  @Output() sendPastCard = new EventEmitter<Card[]>();

  deleted(index: number): void {
    let CurrentCards = this.Cards.slice();
    this.PastCards = CurrentCards;
    let id = this.Cards[index].id;
    const data = new updateCards();
    this.Details = this.Details.filter((x) => x.idDetallePedido != id);
    CurrentCards.splice(index, 1);
    this.Cards.splice(index, 1);
    this.cardActivate.splice(index, 1);
    data.Details = this.Details;
    this.sendPastCard.emit(CurrentCards);
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
