import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PassepartoutService } from '../../services/passepartout.service';
import { FrameService } from '../../services/frame.service';
import { FilletService } from '../../services/fillet.service';
import { GlassService } from '../../services/glass.service';
import { UtilityService } from '../../services/utility.service';
import { Passepartout } from '../../models/passepartout.model';
import { Glass } from '../../models/glass.model';
import { Fillet } from '../../models/fillet.model';
import { Frame } from '../../models/frame.model';
import { Utility } from '../../models/utility.models';
import { Card, updateCards } from '../../models/orderHelper.model';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { OrderService } from '../../services/order.service';
import {
  Order,
  OrderDetails,
  Transaction,
  serviceDetails,
} from '../../models/order.model';
import { DefaultUrlSerializer } from '@angular/router';
import { OrdersComponent } from '../../pages/orders/orders.component';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-card-management',
  templateUrl: './card-management.component.html',
})
export class CardManagementComponent implements OnInit {
  private labourSubject = new Subject<number>();
  @ViewChild('OrdersC') hijoComponent: OrdersComponent;
  passepatouts: Passepartout[] = [];
  currentOrderSheet: Transaction;
  showOrderSheet: boolean = false;
  detailsServiceReceive: serviceDetails[] = [];
  glasses: Glass[] = [];
  labour:number = 0;
  badNotify: string ='';
  fillets: Fillet[] = [];
  frames: Frame[] = [];
  utility: Utility[] = [];
  cardSent: Card;
  Pastcards: Card[] = [];
  cards: Card[] = [];
  clients: Client[] = [];
  discount: number = 0;
  discountEnabled: boolean = true;
  client: Client;
  advance: number = 0;
  lastId: number = 0;
  lastIdDetails: number = 0;
  servicesOption: Card;
  previousTotal: number = 0;
  totalHidden: number;
  togglePrint: boolean = false;

  total: number = 0;

  today = new Date();
  year = this.today.getFullYear();
  month = String(this.today.getMonth() + 1).padStart(2, '0'); // Se suma 1 porque los meses van de 0 a 11
  day = String(this.today.getDate()).padStart(2, '0');
  formatedDate = `${this.year}-${this.month}-${this.day}`;
  ngOnInit(): void {
    this.chargeFrames();
    this.chargePass();
    this.chargeGlass();
    this.chargeFillet();
    this.chargeUtility();
    this.chargeClients();
    this.getLastId();
    this.getLastIdDetail();
    this.labourSubject.pipe(
      debounceTime(1000), // Espera 1 segundo después de la última emisión
      distinctUntilChanged() // Solo emite si el valor es diferente al anterior
    ).subscribe(value => {
      this.sumLabour(value);
    });
  }

  constructor(
    private passService: PassepartoutService,
    private frameService: FrameService,
    private filletService: FilletService,
    private glassService: GlassService,
    private utilityService: UtilityService,
    private clientService: ClientService,
    private orderService: OrderService
  ) {}


  deleteNotify() {
    setTimeout(() => {
      this.badNotify = '';
    }, 3000);
  }

  recieveCard(card: Card): void {
    this.cards.push(card);
    this.total += card.total;
    this.totalHidden = this.total;
    console.log(this.cards);
  }

  recieveDetails(DetailsServices: serviceDetails[]): void {
    for (let detail of DetailsServices) {
      this.detailsServiceReceive.push(detail);
    }
    console.log(this.detailsServiceReceive);
  }
  changePrint(): void {
    this.togglePrint = true;
  }

  UpdateCars(data: updateCards): void {
    this.detailsServiceReceive = [];
    this.detailsServiceReceive = data.Details;
    this.total = 0;
    for (let card of this.cards) {
      this.total += card.total;
    }
    this.totalHidden = this.total;
   this.prepareServiceDetails();
  }

  sumLabour(value: number): void {
    if(value){
      this.total += value;
    } else {
      this.total = this.totalHidden;
    }
  }

  onLabourChange(value: number): void {
    this.labourSubject.next(value);
  }

  applyDiscount() {
    let discount = 0;
    if (this.discount) {
      let discountPercentage;
      if(this.labour){
        let newtotal = this.totalHidden+this.labour;
        console.log(newtotal);
        discountPercentage = this.discount * newtotal;
        console.log(discountPercentage);
        discount = discountPercentage / 100;
        console.log(discount);
      this.total = parseFloat((newtotal - discount).toFixed(2));
      }else{
        discountPercentage = this.discount * this.totalHidden;
        discount = discountPercentage / 100;
      this.total = parseFloat((this.totalHidden - discount).toFixed(2));
      }
      
    } else {
      if(this.labour){
        this.total = this.totalHidden + this.labour;
      }else{
        this.total = this.totalHidden;
      }
      
    }
  }

  recieveClient(client: Client): void {
    let lastIdClient = this.clients.length;
    
    if(client.pkIdCliente == null || client.pkIdCliente == undefined){
      this.clientService.createClient(client).subscribe({
        next: res => {
          console.log('Cliente Creado');
          this.client = res;
          console.log(client);
          console.log(client.pkIdCliente);
          client.pkIdCliente = this.clients[lastIdClient-1].pkIdCliente+1;
          this.client = client;
        },
        error: err =>{
          console.log(err);
          this.badNotify = ' Cliente no creado';
          this.deleteNotify();
          this.hijoComponent.clearClient();
        }
      });
    }else{
      this.client = client;
    }
  }

  chargeClients(): void {
    this.clientService.getData().subscribe((data: any) => {
      this.clients = data;
    });
  }

  chargeFrames(): void {
    this.frameService.getData().subscribe((data: any) => {
      this.frames = data;
    });
  }

  chargeUtility(): void {
    this.utilityService.getData().subscribe((data: any) => {
      this.utility = data;
    });
  }

  chargePass(): void {
    this.passService.getData().subscribe((data: any) => {
      this.passepatouts = data;
    });
  }

  chargeGlass(): void {
    this.glassService.getData().subscribe((data: any) => {
      this.glasses = data;
    });
  }
  chargeFillet(): void {
    this.filletService.getData().subscribe((data: any) => {
      this.fillets = data;
    });
  }

  discountCheck(): void {
    if (this.discountEnabled) {
      this.discountEnabled = false;
      this.discount = 0;
    } else {
      this.discountEnabled = true;
      this.discount = 0;
      if(this.labour){
        this.total = this.totalHidden + this.labour;
      }else{
        this.total = this.totalHidden;
      }
      
    }
  }

  getLastId(): void {
    this.orderService.getLastId().subscribe((last: any) => {
      this.lastId = last['lastid'];
    });
  }

  getLastIdDetail(): void {
    this.orderService.getLastIdDetails().subscribe((last: any) => {
      this.lastIdDetails = last['lastid'];
    });
  }

  recievePastCards(cards: Card[]) {
    this.Pastcards = cards;
   
  }
  prepareServiceDetails(): void {
  

    const lastID = this.lastIdDetails + 1;
    let newId = lastID;
    let newIdDetail: serviceDetails[] = [];
    let newCards: Card[] = [];
    

    for (let p = 0; p < this.Pastcards.length; p++) {
      let card = new Card();
      let id = this.Pastcards[p].id;

      card = this.Pastcards[p];
      card.id = newId;
    
      let filter = this.detailsServiceReceive.filter(
        (x) => x.idDetallePedido === id
      );
      
      for (let det of filter) {
        det.idDetallePedido = newId;
        newIdDetail.push(det);
      }
      newId += 1;
      newCards.push(card);
    }
    this.detailsServiceReceive = newIdDetail;
    this.cards = newCards;
     console.log(this.cards);
    console.log(this.detailsServiceReceive);
  }

  prepareDetails(): OrderDetails[] {
    var details: OrderDetails[] = [];
    let idOrder = this.lastId + 1;
    for (let detail = 0; detail < this.cards.length; detail++) {
      let det = new OrderDetails();
      det.idPedido = idOrder;
      det.idDetallePedido = this.cards[detail].id;
      det.precio = this.cards[detail].total;
      let description = `${this.cards[detail].title} ${this.cards[detail].description}`;
      det.descripcion = description;
      details.push(det);
    }

    return details;
  }

  prepareHeader(): Order {
    var newHeader = new Order();
    newHeader.idPedido = this.lastId + 1;
    let discount = this.discount;
    let total = this.total.toFixed(2);
    let payment = this.advance.toFixed(2);
    let estatus = true;
    if (total === payment) {
      estatus = false;
    }
    
    newHeader.idCliente = this.client.pkIdCliente;
    newHeader.nombre = this.client.nombreCliente;
    newHeader.fecha = this.formatedDate;
    newHeader.descuento = discount;
    newHeader.total = parseFloat(total);
    newHeader.abono = parseFloat(payment);
    newHeader.estatus = estatus;
    return newHeader;
  }

  setTransaction(): void {
    if( this.client){
      let data = new Transaction();
      data.orderHeader = this.prepareHeader();
      data.orderDetails = this.prepareDetails();
      if (this.detailsServiceReceive.length > 0) {
        data.serviceDetails = this.detailsServiceReceive;
      }
  
      console.log(data.orderHeader);
      console.log(data.orderDetails);
      console.log(this.detailsServiceReceive);
      this.orderService.createOrder(data).subscribe({
        next: (res) => {
          console.log('Registro exitoso');
          console.log(res);
          this.clear();
          this.currentOrderSheet = data;
          this.showOrderSheet = true;
        },
        error: (err) => {
          console.log(err);
          console.log(data.orderHeader);
          console.log(data.orderDetails);
          console.log(this.detailsServiceReceive);
          this.badNotify = ' No se realizo el pedido';
          this.deleteNotify();
        },
      });
    }else{
      this.badNotify=' Por favor llene todos los campos';
      this.deleteNotify();
    }
   
  }

  clear(): void {
    this.getLastId();
    this.getLastIdDetail();
    this.discount = 0;
    this.total = 0;
    this.totalHidden = 0;
    this.advance = 0;
    this.labour = 0;
    this.cards = [];
    this.detailsServiceReceive = [];
    this.hijoComponent.clearClient();
  }
}
