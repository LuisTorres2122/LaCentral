import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Card,
  Cframe,
  Cpasspartout,
  Glass_Fillet,
} from '../../models/orderHelper.model';
import { Passepartout } from '../../models/passepartout.model';
import { Frame } from '../../models/frame.model';
import { Glass } from '../../models/glass.model';
import { Fillet } from '../../models/fillet.model';
import { Utility } from '../../models/utility.models';
import { FramedService } from '../../services/Framed.service';
import { CServicesDetails } from '../../models/servicesDetails.model';
import { Client } from '../../models/client.model';
import { serviceDetails } from '../../models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent {
  @Input() allowClient:boolean;
  client: string;
  @Output() cardEvent = new EventEmitter<Card>();
  @Output() detailsServiceSent = new EventEmitter<serviceDetails[]>();
  toggleEnmarcado: boolean = false;
  toggleRestauration: boolean = false;
  toggleVentaneria: boolean = false;
  toggleInstalation: boolean = false;
  togglePasseparout: boolean = false;
  toggleVidrio: boolean = false;
  toggleFilete: boolean = false;
  toggleMarco: boolean = false;
  toggleOptions: string[] = [
    'enmarcado',
    'restauration',
    'ventaneria',
    'instalation',
  ];
  toggleOptionsMaterials: string[] = [
    'passepartout',
    'vidrio',
    'filete',
    'marco',
    'vidrio2',
    'marco2',
  ];
  currentDate: Date = new Date();
  date: string = this.currentDate.toDateString();
  passpartoutAdded: Cpasspartout[] = [];
  filterPass: Passepartout[] = [];
  @Input() passepatouts: Passepartout[];
  allowPass: boolean = false;

  glassAdded: Glass_Fillet[] = [];
  selectedGlass: string;
  selectedPass: string;
  @Input() glasses: Glass[];
  @Input() clients: Client[];
  filterClients: Client[] = [];

  filletAdded: Glass_Fillet[] = [];
  selectedfillet: string;
  @Input() fillets: Fillet[];
  filterFrame: Frame[] = [];
  allowFrame: boolean = false;
  frameAdded: Cframe[] = [];
  @Input() frames: Frame[];
  selectedframe: string;
  selectedUtility: string;
  selectedClient: Client;
  detailsService: serviceDetails[] = [];
  @Input() cardId: number;
  detailsId: number=0;
  clientDisabled: boolean = false;

  framedCard: Card[] = [];
  @Input() utility: Utility[];
  badNotify: string = '';
  @Output() sendClient = new EventEmitter<Client>();

  //cards
  servicesDetails: CServicesDetails[] = [];

  constructor(private framedService: FramedService) {}
  ngOnInit(): void {}

  deleteNotify() {
    setTimeout(() => {
      this.badNotify = '';
    }, 3000);
  }
  FramedForm = new FormGroup({
    name: new FormControl('', Validators.required),
    measure: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+x\d+$/),
    ]),
    border: new FormControl(''),
    vitrina: new FormControl('', Validators.required),
    float: new FormControl('', Validators.required),
    utility: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    total: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  passPartoutForm = new FormGroup({
    code: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    color: new FormControl({ value: '', disabled: true }),
  });

  frameForm = new FormGroup({
    code: new FormControl('', Validators.required),
    price: new FormControl({ value: '', disabled: true }, Validators.required),
    color: new FormControl('', Validators.required),
  });

  glassForm = new FormGroup({
    type: new FormControl('', Validators.required),
    price: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  filletForm = new FormGroup({
    type: new FormControl('', Validators.required),
    price: new FormControl({ value: '', disabled: true }, Validators.required),
    color: new FormControl('', Validators.required),
  });

  ventaneriaForm = new FormGroup({
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });
  instalationForm = new FormGroup({
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  restaurationForm = new FormGroup({
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  clearClient():void {
    this.client = "";
    this.clientDisabled = false;
  }

  findClient(): void {
    this.filterClients = this.clients.filter((client: Client) => {
      return client.nombreCliente
        .toLowerCase()
        .trim()
        .includes(this.client.toLowerCase().trim());
    });
    if (this.client.length == 0) {
      this.filterClients = [];
      this.clientDisabled=false;
    }
  }

  prepareClient(): void {
    let client = new Client();
    if(!this.clientDisabled){
      if (this.client) {
        this.filterClients = [];
        client.nombreCliente = this.client;
        this.selectedClient = client;
        
        this.clientDisabled=true;
        this.sendClient.emit(this.selectedClient);
      }else{
        this.badNotify='No se escribio el nombre';
        this.deleteNotify();
      }
    }
  
  }

  selectClient(client: Client): void {
    this.selectedClient = client;
    this.client = client.nombreCliente;
    this.filterClients = [];
    this.sendClient.emit(this.selectedClient);
    this.clientDisabled=true;
  }

  addCardRestauration(): void {
    let formRestauration = this.restaurationForm.value;
    let cardSend = new Card();
    if (formRestauration && formRestauration.description) {
      cardSend.description = formRestauration.description;
    }
    if (formRestauration && formRestauration.price) {
      cardSend.total = parseFloat(formRestauration.price);
    }
    cardSend.title = 'Restauración';
    cardSend.id = this.cardId + 1;
    this.cardId += 1;
    this.cardEvent.emit(cardSend);
    this.clearForm(this.restaurationForm);
    this.toggleRestauration = false;
  }
  addCardinstalation(): void {
    let formInstalation = this.instalationForm.value;
    let cardSend = new Card();
    if (formInstalation && formInstalation.description) {
      cardSend.description = formInstalation.description;
    }
    if (formInstalation && formInstalation.price) {
      cardSend.total = parseFloat(formInstalation.price);
    }
    cardSend.id = this.cardId + 1;
    this.cardId += 1;
    cardSend.title = 'Instalación';
    this.cardEvent.emit(cardSend);
    this.clearForm(this.instalationForm);
    this.toggleInstalation = false;
  }

  addCardVentaneria(): void {
    let formVentaneria = this.ventaneriaForm.value;
    let cardSend = new Card();
    if (formVentaneria && formVentaneria.description) {
      cardSend.description = formVentaneria.description;
    }
    if (formVentaneria && formVentaneria.price) {
      cardSend.total = parseFloat(formVentaneria.price);
    }
    cardSend.id = this.cardId + 1;
    this.cardId += 1;
    cardSend.title = 'Ventaneria';
    this.cardEvent.emit(cardSend);
    this.clearForm(this.ventaneriaForm);
    this.toggleVentaneria = false;
  }

  addCardFramed(): void {
    let stringFramed: string[] = [];
    let details: serviceDetails[] = [];
    let currentDetailsId = this.cardId + 1;
    let stringCode = '';
    let line = 0;
    let cardSend = new Card();
    let total = this.FramedForm.get('total')?.value;
    let form = this.FramedForm.value;
    
  
    if(form){
      if(form.border){
        stringFramed[0] = `Enmarcado: ${form.name} ${form.measure} borde ${form.border}" \n`;
      }else{
        stringFramed[0] = `Enmarcado: ${form.name} ${form.measure} \n`;
      }
      
    }

    if (this.passpartoutAdded.length > 0) {
      stringCode = `${this.convertNumberToText(
        this.passpartoutAdded.length 
      )} Passepartout `;
      for (let pass = 0; pass < this.passpartoutAdded.length; pass++) {
        stringCode += ` ${this.passpartoutAdded[
          pass
        ].code.toString()}, ${this.passpartoutAdded[
          pass
        ].color.toString()} \n`;
        let detail = new serviceDetails();
        line += 1;

        detail.idDetallePedido = currentDetailsId;
        detail.linea = line;
        detail.idMaterial = 1;
        detail.nombre =
          'PassPartout Codigo: ' + this.passpartoutAdded[pass].code;
        detail.precio = this.passpartoutAdded[pass].price;
        detail.color = this.passpartoutAdded[pass].color;
        details.push(detail);
      }
      stringFramed[1] = stringCode;
    }

    if (this.glassAdded.length > 0) {
      stringCode = `${this.convertNumberToText(
        this.glassAdded.length 
      )} Vidrio `;
      for (let glass = 0; glass < this.glassAdded.length; glass++) {
        stringCode += ` ${this.glassAdded[glass].type.toString()} \n`;
        let detail = new serviceDetails();
        line += 1;

        detail.idDetallePedido = currentDetailsId;
        detail.linea = line;
        detail.idMaterial = 2;
        detail.nombre = 'Vidrio Tipo: ' + this.glassAdded[glass].type;
        detail.precio = this.glassAdded[glass].price;
        details.push(detail);
      }
      stringFramed[2] = stringCode;
    }

    if (this.filletAdded.length > 0) {
      stringCode = `${this.convertNumberToText(
        this.filletAdded.length 
      )} Filete `;
      for (let fillet = 0; fillet < this.filletAdded.length; fillet++) {
        stringCode += ` ${this.filletAdded[fillet].type.toString()}, ${this.filletAdded[fillet].color} \n`;
        let detail = new serviceDetails();
        line += 1;

        detail.idDetallePedido = currentDetailsId;
        detail.linea = line;
        detail.idMaterial = 3;
        detail.nombre = 'Filete Tipo: ' + this.filletAdded[fillet].type;
        detail.precio = this.filletAdded[fillet].price;
        detail.color = this.filletAdded[fillet].color;
        details.push(detail);
      }
      stringFramed[3] = stringCode;
    }
    if (this.frameAdded.length > 0) {
      stringCode = `${this.convertNumberToText(
        this.frameAdded.length 
      )} Marco `;
      for (let frame = 0; frame < this.frameAdded.length; frame++) {
        stringCode += ` ${this.frameAdded[frame].code.toString()}, ${this.frameAdded[frame].color} \n`;
        let detail = new serviceDetails();
        line += 1;

        detail.idDetallePedido = currentDetailsId;
        detail.linea = line;
        detail.idMaterial = 4;
        detail.nombre = 'Marco Codigo: ' + this.frameAdded[frame].code;
        detail.precio = this.frameAdded[frame].price;
        detail.color = this.frameAdded[frame].color;
        details.push(detail);
      }
      stringFramed[4] = stringCode;
    }

    if(form){
      let vit="";
      let flo="";
      if(form.vitrina?.toLowerCase() == "vitrina"){
        vit ="en vitrina";
      }
      if(form.vitrina?.toLowerCase() == "flotante"){
        flo ="flotante";
      }
      stringFramed[5] = `${vit} ${flo}`
    }
    
    
    if (total) {
      cardSend.title = 'Enmarcado';
      cardSend.description =
        (stringFramed[0] == undefined ? '' : '\n ' + stringFramed[0]) +
        (stringFramed[1] == undefined ? '' : '\n ' + stringFramed[1]) +
        (stringFramed[2] == undefined ? '' : '\n ' + stringFramed[2]) +
        (stringFramed[3] == undefined ? '' : '\n ' + stringFramed[3]) +  
        (stringFramed[4] == undefined ? '' : '\n ' + stringFramed[4]) +
        (stringFramed[5] == undefined ? '' : '\n ' + stringFramed[5]);
      cardSend.total = parseFloat(total);
    }
    
    cardSend.id = currentDetailsId;
    console.log(cardSend);
    this.cardId += 1;
    this.cardEvent.emit(cardSend);
    this.detailsServiceSent.emit(details);
    console.log(cardSend);
    console.log(details);
    this.clearFramed();
  }

  convertNumberToText(numero: number): string {
    switch (numero) {
      case 1:
        return 'Un';
      case 2:
        return 'Doble';
      case 3:
        return 'Triple';
      case 4:
        return 'Cuádruple';
      case 5:
        return 'Quíntuple';
      case 6:
        return 'Séxtuple';
      case 7:
        return 'Séptuple';
      case 8:
        return 'Óctuple';
      case 9:
        return 'Nóveno';
      case 10:
        return 'Décimo';
      default:
        return 'Número no soportado';
    }
  }

  addFramed(): void {
    let totalPass = 0;
    let totalGlass = 0;
    let totalFillet = 0;
    let totalFrame = 0;
    let subtotal = 0;
    let total = 0;

    let measure = this.FramedForm.get('measure')?.value;
    let border = this.FramedForm.get('border')?.value;

    if (this.passpartoutAdded.length > 0 && measure) {
      totalPass = this.framedService.calcPasspartout(
        this.passpartoutAdded,
        measure
      );
      console.log('pass' + totalPass);
    }

    if (this.glassAdded.length > 0 && measure) {
      if (border) {
        totalGlass = this.framedService.calcGlass(
          this.glassAdded,
          measure,
          parseFloat(border)
        );
      } else {
        totalGlass = this.framedService.calcGlass(this.glassAdded, measure, 0);
      }
      console.log('glass' + totalGlass);
    }

    if (this.filletAdded.length > 0 && measure) {
      totalFillet = this.framedService.calcFillet(
        this.filletAdded,
        measure,
        this.utility
      );
      console.log('fillet ' + totalFillet);
    }

    if (this.frameAdded.length > 0 && measure) {
      if (this.passpartoutAdded.length > 0) {
        if (border) {
          totalFrame = this.framedService.calcFrame(
            this.frameAdded,
            measure,
            true,
            this.utility,
            parseFloat(border)
          );
        } else {
          totalFrame = this.framedService.calcFrame(
            this.frameAdded,
            measure,
            true,
            this.utility,
            0
          );
        }

        console.log('frame w ' + totalFrame);
      } else {
        if (border) {
          totalFrame = this.framedService.calcFrame(
            this.frameAdded,
            measure,
            false,
            this.utility,
            parseFloat(border)
          );
        } else {
          totalFrame = this.framedService.calcFrame(
            this.frameAdded,
            measure,
            false,
            this.utility,
            0
          );
        }
        console.log('frame wo ' + totalFrame);
      }
    }

    subtotal = totalPass + totalGlass + totalFillet + totalFrame;

    let utilty = this.FramedForm.get('utility')?.value;
    let totalWutility = 0;

    if (utilty) {
      totalWutility = parseFloat(utilty);
    }
    console.log('utilidad ' + totalWutility);
    total = subtotal * totalWutility;

    this.FramedForm.patchValue({ total: total.toFixed(2) });
  }

  buscarPass(): void {
    const code = this.passPartoutForm.value?.code;
    if (code) {
      this.filterPass = this.passepatouts.filter((ele: Passepartout) => {
        const value = ele.codigoPassepartout;

        return value.toString() == code;
      });
    } else {
      this.filterPass = [];
    }
    if (this.filterPass.length > 0) {
      this.selectedPass = this.filterPass[0].colorPassepartout.toString();
      this.passPartoutForm.patchValue({
        color: this.filterPass[0].colorPassepartout.toString(),
      });
    } else {
      this.passPartoutForm.patchValue({
        color: '',
      });
    }
  }

  findFrame(): void {
    const frameCode = this.frameForm.value?.code;

    if (frameCode) {
      this.filterFrame = this.frames.filter((frame: Frame) => {
        const value = frame.codigoMarco;

        return value == frameCode;
      });
    } else {
      this.filterFrame = [];
    }
    console.log(this.filterFrame);
    if (this.filterFrame.length > 0) {
      this.selectedframe = this.filterFrame[0].precioMarco.toString();
      this.frameForm.patchValue({
        price: this.filterFrame[0].precioMarco.toString(),
      });
    } else {
      this.frameForm.patchValue({
        price: '',
      });
    }
  }

  setPriceGlass(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    var type = selectElement.value;
    var glassFound = this.glasses.filter((glass: Glass) => {
      return (
        glass.tipoVidrio.toLowerCase().trim() === type.toLowerCase().trim()
      );
    });
    this.selectedGlass = glassFound[0].precioVidrio.toString();

    this.glassForm.patchValue({ price: glassFound[0].precioVidrio.toString() });
  }

  setPriceFillet(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    var type = selectElement.value;
    var glassFound = this.fillets.filter((fillet: Fillet) => {
      return (
        fillet.tipoFilete.toLowerCase().trim() === type.toLowerCase().trim()
      );
    });
    this.selectedfillet = glassFound[0].precioFilete.toString();

    this.filletForm.patchValue({
      price: glassFound[0].precioFilete.toFixed(2),
    });
  }

  addPasspartout(): void {
    var pass = this.passPartoutForm.value;
    var newPass = new Cpasspartout();

    if (pass && pass.code) {
      newPass.code = pass.code;

      if (this.filterPass.length > 0) {
        this.allowPass = true;
      }
    }

    newPass.color = this.selectedPass;

    if (pass && pass.price) {
      newPass.price = parseFloat(pass.price);
    }

    if (this.allowPass) {
      this.passpartoutAdded.push(newPass);
      this.clearForm(this.passPartoutForm);
    } else {
      this.badNotify = ' No existe el codigo';
      this.deleteNotify();
      this.clearForm(this.passPartoutForm);
    }
    this.FramedForm.patchValue({ float: '' });
  }

  deleteFrame(index: number): void {
    this.frameAdded.splice(index, 1);
    this.FramedForm.patchValue({ float: '' });
  }

  addFrame(): void {
    var frame = this.frameForm.value;
    var newFrame = new Cframe();

    if (frame && frame.code) {
      newFrame.code = frame.code;

      if (this.filterFrame.length > 0) {
        this.allowFrame = true;
      }
    }

    newFrame.price = parseFloat(this.selectedframe);

    if (frame && frame.color) {
      newFrame.color = frame.color;
    }

    if (this.allowFrame) {
      this.frameAdded.push(newFrame);
      this.clearForm(this.frameForm);
    } else {
      console.log(newFrame);
      this.badNotify = ' No existe el codigo';
      this.deleteNotify();
      this.clearForm(this.frameForm);
    }
    this.FramedForm.patchValue({ float: '' });
  }

  deletePasspartout(index: number): void {
    this.passpartoutAdded.splice(index, 1);
    this.FramedForm.patchValue({ float: '' });
  }

  deleteGlass(index: number): void {
    this.glassAdded.splice(index, 1);
    this.FramedForm.patchValue({ float: '' });
  }

  addGlass(): void {
    var glass = this.glassForm.value;
    var newGlass = new Glass_Fillet();

    if (glass && glass.type) {
      newGlass.type = glass.type;
    }

    newGlass.price = parseFloat(this.selectedGlass);

    console.log(glass);
    this.glassAdded.push(newGlass);
    this.clearForm(this.glassForm);
    this.FramedForm.patchValue({ float: '' });
  }

  deleteFillet(index: number): void {
    this.filletAdded.splice(index, 1);
    this.FramedForm.patchValue({ float: '' });
  }

  addFillet(): void {
    var fillet = this.filletForm.value;
    var newFillet = new Glass_Fillet();

    if (fillet && fillet.type) {
      newFillet.type = fillet.type;
    }

    newFillet.price = parseFloat(this.selectedfillet);
    if (fillet && fillet.color) {
      newFillet.color = fillet.color;
    }
    console.log(fillet);
    this.filletAdded.push(newFillet);
    this.clearForm(this.filletForm);
    this.FramedForm.patchValue({ float: '' });
  }

  clearForm(group: FormGroup): void {
    group.reset();
  }

  clearFramed(): void {
    this.frameAdded = [];
    this.passpartoutAdded = [];
    this.filletAdded = [];
    this.glassAdded = [];
    this.FramedForm.reset();
    this.toggleEnmarcado = false;
    this.FramedForm.patchValue({ float: '', vitrina: '' });
  }

  clearInstalation(): void {
    this.clearForm(this.ventaneriaForm);
  }

  setUpFramed(): void {
    var utility = this.utility.filter(
      (ut: Utility) => ut.nombreUtilidad.toLowerCase().trim() == 'utilidad'
    );

    if (utility.length > 0) {
      this.selectedUtility = utility[0].valorUtilidad.toString();
      this.FramedForm.patchValue({
        utility: utility[0].valorUtilidad.toString(),
      });
    }
  }

  changeToggle(option: string): void {
    switch (option) {
      case this.toggleOptionsMaterials[0]:
        if (this.togglePasseparout) {
          this.togglePasseparout = false;
        } else {
          this.togglePasseparout = true;
        }
        break;
      case this.toggleOptionsMaterials[1]:
        if (this.toggleVidrio) {
          this.toggleVidrio = false;
        } else {
          this.toggleVidrio = true;
        }
        break;
      case this.toggleOptionsMaterials[2]:
        if (this.toggleFilete) {
          this.toggleFilete = false;
        } else {
          this.toggleFilete = true;
        }
        break;
      case this.toggleOptionsMaterials[3]:
        if (this.toggleMarco) {
          this.toggleMarco = false;
        } else {
          this.toggleMarco = true;
        }
        break;
    }
  }

  changeToggleServices(option: string): void {
    switch (option) {
      case this.toggleOptions[0]:
        if (this.toggleEnmarcado) {
          this.toggleEnmarcado = false;
          this.clearFramed();
        } else {
          this.toggleEnmarcado = true;
          this.setUpFramed();
        }
        break;
      case this.toggleOptions[1]:
        if (this.toggleRestauration) {
          this.toggleRestauration = false;
        } else {
          this.toggleRestauration = true;
          this.clearForm(this.restaurationForm);
        }
        break;
      case this.toggleOptions[2]:
        if (this.toggleVentaneria) {
          this.toggleVentaneria = false;
        } else {
          this.toggleVentaneria = true;
          this.clearForm(this.ventaneriaForm);
        }
        break;
      case this.toggleOptions[3]:
        if (this.toggleInstalation) {
          this.toggleInstalation = false;
        } else {
          this.toggleInstalation = true;
          this.clearForm(this.ventaneriaForm);
        }
        break;
    }
  }
}
