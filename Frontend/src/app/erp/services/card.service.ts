import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { Card } from '../models/orderHelper.model';
import { serviceDetails } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  public cards: Card[] = [];
  public detailsService: serviceDetails[] = [];

  addData(card:Card, detail: serviceDetails[]):void{
    this.cards.push(card);
    let id = card.id;

    for(let position =0; position < detail.length; position++){
        detail[position].idDetallePedido = id;
        this.detailsService.push(detail[position]);
    }
  }

  deleteData(index: number):void{
    this.cards.splice(index, 1);
    let id = this.cards[index].id;
    this.detailsService = this.detailsService.filter(id => id.idDetallePedido != id.idDetallePedido);
  }

  


}
