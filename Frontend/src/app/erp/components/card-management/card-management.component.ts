import { Component, Input, OnInit } from '@angular/core';
import { PassepartoutService } from '../../services/passepartout.service';
import { FrameService } from '../../services/frame.service';
import { FramedService } from '../../services/Framed.service';
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

@Component({
  selector: 'app-card-management',
  templateUrl: './card-management.component.html',
})
export class CardManagementComponent implements OnInit {
  passepatouts: Passepartout[] = [];
  detailsServiceReceive: serviceDetails[] = [];
  glasses: Glass[] = [];
  fillets: Fillet[] = [];
  frames: Frame[] = [];
  utility: Utility[] = [];
  cardSent: Card;
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

  recieveCard(card: Card): void {
    this.cards.push(card);
    this.total += card.total;
    this.totalHidden = this.total;
  }
  //modify if later it needed to register more than one
  recieveDetails(DetailsServices: serviceDetails[]): void {
    let length = this.detailsServiceReceive.length;
    for (let service of DetailsServices) {
      this.detailsServiceReceive.push(service);
    }
   for (let detail = length; detail < this.detailsServiceReceive.length; detail++
    ) {
      this.detailsServiceReceive[detail].idDetallePedido =
        this.cards[this.cards.length - 1].id;
    }
    console.log(this.cards);
    console.log(this.detailsServiceReceive);
  }
  changePrint(): void {
    this.togglePrint = true;
  }

  UpdateCars(data: updateCards): void {
    this.cards = [];
    this.detailsServiceReceive = [];
    this.cards = data.cards;
    this.detailsServiceReceive = data.Details;
    this
    this.total = 0;
    for (let card of this.cards) {
      this.total += card.total;
    }
    this.totalHidden = this.total;
    this.prepareServiceDetails();
  }
  

  applyDiscount() {
    let discount = 0;
    if (this.discount) {
      let discountPercentage = this.discount * this.totalHidden;
      discount = discountPercentage / 100;
      this.total = parseFloat((this.totalHidden - discount).toFixed(2));
    } else {
      this.total = this.totalHidden;
    }
  }

  recieveClient(client: Client): void {
    this.client = client;
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
      this.total = this.totalHidden;
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

  prepareServiceDetails(): void {
    console.log(this.detailsServiceReceive);
    this.cards.sort((a, b) => a.id - b.id);
    this.detailsServiceReceive.sort((a, b) => {
      /* if (a.idDetallePedido == b.idDetallePedido) {
          return b.idDetallePedido;
        }*/
      return a.idDetallePedido - b.idDetallePedido;
    });
    console.log(this.detailsServiceReceive);

    const lastID = this.lastIdDetails + 1;
    let newId = lastID;
    let newIdDetail = lastID;

    for (let p = 0; p < this.cards.length; p++) {
      this.cards[p].id = newId;
      newId += 1;
    }
    if (this.clients.length > 0) {
      for (let p = 0; p < this.detailsServiceReceive.length; p++) {
        let before = lastID;
        let last;
        if (
          p > 0 &&
          this.detailsServiceReceive[p].idDetallePedido ==
            this.detailsServiceReceive[p - 1].idDetallePedido
        ) {
          before = this.detailsServiceReceive[p].idDetallePedido;
          this.detailsServiceReceive[p].idDetallePedido =
            this.detailsServiceReceive[p - 1].idDetallePedido;
          before = this.detailsServiceReceive[p].idDetallePedido;
          last = this.detailsServiceReceive[p].idDetallePedido;
        } else if (p == 0) {
          last = this.detailsServiceReceive[p].idDetallePedido;
          this.detailsServiceReceive[p].idDetallePedido = before;
        } else if (last == this.detailsServiceReceive[p].idDetallePedido) {
          this.detailsServiceReceive[p].idDetallePedido = before;
        } else {
          before += 1;
          last = this.detailsServiceReceive[p].idDetallePedido;
          this.detailsServiceReceive[p].idDetallePedido = before;
        }
      }
      console.log(this.detailsServiceReceive);
    }
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
    let discount = this.discount.toFixed(2);
    let total = this.total.toFixed(2);
    let payment = this.advance.toFixed(2);
    let estatus = true;
    if (total === payment) {
      estatus = false;
    }
    if (!this.client.pkIdCliente) {
      //doesn't exist
    }
    newHeader.idCliente = this.client.pkIdCliente;
    newHeader.nombre = this.client.nombreCliente;
    newHeader.fecha = this.formatedDate;
    newHeader.descuento = parseFloat(discount);
    newHeader.total = parseFloat(total);
    newHeader.abono = parseFloat(payment);
    newHeader.estatus = estatus;
    return newHeader;
  }

  setTransaction(): void {
    let data = new Transaction();
    data.orderHeader = this.prepareHeader();
    data.orderDetails = this.prepareDetails();
    this.prepareServiceDetails();
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
      },
      error: (err) => {
        console.log(err);
        console.log(data.orderHeader);
        console.log(data.orderDetails);
        console.log(this.detailsServiceReceive);
      },
    });
  }

  clear(): void {
    this.getLastId();
    this.getLastIdDetail();
    this.discount = 0;
    this.total = 0;
    this.totalHidden = 0;
    this.advance = 0;
    this.cards = [];
    this.detailsServiceReceive = [];
  }
}
