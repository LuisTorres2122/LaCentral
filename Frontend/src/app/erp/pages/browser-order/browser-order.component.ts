import { Component } from '@angular/core';
import { Order, OrderDetails } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-browser-order',
  templateUrl: './browser-order.component.html'
})
export class BrowserOrderComponent {
  headers: string[]=["idPedido","idCliente","nombre","fecha", "descuento", "total", "abono", "estatus" ];
  headersDetails: string[] =["idDetallePedido", "idPedido", "descripcion", "precio"]
  elements: Order [] = [];
  toggleOpts: boolean[] = [];
  detailsOrder: OrderDetails[] =[];
  toggledata: boolean = false;
  search: string = "";
  colspanValue: number = 0;

  constructor(private orderService: OrderService){}

  buscarElements():void{
    this.elements = [];
    if(this.search.length > 0){
      this.orderService.getOrders(this.search).subscribe(data =>{
        this.elements = data;
      })
    }
  }

  findDetails(id: number):void{
    this.detailsOrder = [];
    this.orderService.getDetailOrder(id).subscribe( data =>
      this.detailsOrder = data
    );

  }

  switchToggleOptions(index: number, id: number): void {
    if (this.toggleOpts[index]) {
      this.toggleOpts[index] = false;
    } else {
      this.toggleOpts[index] = true;
      this.findDetails(id);
    }
  }


}
