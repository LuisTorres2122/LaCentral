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
  toggleVidrio2: boolean = false;
  toggleMarco2: boolean = false;
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
  filterPass: any[] = [];
  @Input() passepatouts: Passepartout[];
  allowPass: boolean = false;

  glassAdded: Glass_Fillet[] = [];
  glassAdded2: Glass_Fillet[] = [];
  frameAdded2: Cframe[] = [];
  selectedGlass: string;
  selectedGlass2: string;
  @Input() glasses: Glass[];
  @Input() clients: Client[];
  filterClients: Client[]=[];

  filletAdded: Glass_Fillet[] = [];
  selectedfillet: string;
  @Input() fillets: Fillet[];
  filterFrame: Frame[] = [];
  filterFrame2: Frame[] = [];
  allowFrame: boolean = false;
  frameAdded: Cframe[] = [];
  @Input() frames: Frame[];
  selectedframe: string;
  selectedframe2: string;
  selectedUtility: string;
  selectedUtility2: string;
  selectedClient: Client;
  detailsService: serviceDetails[] =[];
  @Input() cardId: number;

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
    measure: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+x\d+$/),
    ]),
    labour: new FormControl('', Validators.required),
    utility: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    total: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  ventaneriaForm = new FormGroup({
    measure: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+x\d+$/),
    ]),
    labour: new FormControl('', Validators.required),
    utility: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    total: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  frameVForm = new FormGroup({
    code: new FormControl('', Validators.required),
    price: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  glassVForm = new FormGroup({
    type: new FormControl('', Validators.required),
    price: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  passPartoutForm = new FormGroup({
    code: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    home: new FormControl({ value: '', disabled: true }),
  });

  frameForm = new FormGroup({
    code: new FormControl('', Validators.required),
    price: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  glassForm = new FormGroup({
    type: new FormControl('', Validators.required),
    price: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  filletForm = new FormGroup({
    type: new FormControl('', Validators.required),
    price: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  restaurationForm = new FormGroup({
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  instalationForm = new FormGroup({
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  findClient(): void { 
    
    this.filterClients = this.clients.filter((client: Client) => {
      return client.nombreCliente.toLowerCase().trim().includes(this.client.toLowerCase().trim());
    });
    if(this.client.length == 0){
      this.filterClients = [];
    }
  }

  prepareClient():void{
    let client = new Client();
    if(this.client.length >= 0){
      this.filterClients = [];
      client.nombreCliente = this.client;
      this.selectedClient = client;
      this.sendClient.emit(this.selectedClient);
    }
   
  }

  selectClient(client: Client):void{
    this.selectedClient = client;
    this.client = client.nombreCliente;
    this.filterClients = [];
    this.sendClient.emit(this.selectedClient);
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
    cardSend.id = this.cardId +1;
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
    cardSend.id = this.cardId +1;
    this.cardId += 1;
    cardSend.title = 'Instalación';
    this.cardEvent.emit(cardSend);
    this.clearForm(this.instalationForm);
    this.toggleInstalation = false;
  }

  addCardFramed(): void {
    let stringFramed: string[] = [];
    let details : serviceDetails[] =[];
    let stringCode = '';
    let line = 0;
    let cardSend = new Card();
    let total = this.FramedForm.get('total')?.value;

    if (this.passpartoutAdded.length > 0) {
      for (let pass = 0; pass < this.passpartoutAdded.length; pass++) {
        stringCode = `Codigo: ${this.passpartoutAdded[
          pass
        ].code.toString()} \n`;
        let detail = new serviceDetails();
        line += 1;
        detail.linea = line;
        detail.idMaterial = 1;
        detail.nombre = "PassPartout Codigo: "+this.passpartoutAdded[pass].code;
        detail.precio = this.passpartoutAdded[pass].price;
        details.push(detail);
      }
      stringFramed[0] = ` ${this.convertNumberToText(
        this.passpartoutAdded.length
      )} Passepartout \n ${stringCode}`;
    }

    if (this.glassAdded.length > 0) {
      for (let glass = 0; glass < this.glassAdded.length; glass++) {
        stringCode = `Tipo: ${this.glassAdded[glass].type.toString()} \n`;
        let detail = new serviceDetails();
        line += 1;
        detail.linea = line;
        detail.idMaterial = 2;
        detail.nombre = "Vidrio Tipo: "+this.glassAdded[glass].type;
        detail.precio = this.glassAdded[glass].price;
        details.push(detail);
      }
      stringFramed[1] = ` ${this.convertNumberToText(
        this.glassAdded.length
      )} Vidrio \n ${stringCode}`;
    }

    if (this.filletAdded.length > 0) {
      for (let fillet = 0; fillet < this.filletAdded.length; fillet++) {
        stringCode = `Tipo: ${this.filletAdded[fillet].type.toString()} \n`;
        let detail = new serviceDetails();
        line += 1;
        detail.linea = line;
        detail.idMaterial = 3;
        detail.nombre = "Filete Tipo: "+this.filletAdded[fillet].type;
        detail.precio = this.filletAdded[fillet].price;
        details.push(detail);
      }
      stringFramed[2] = ` ${this.convertNumberToText(
        this.filletAdded.length
      )} Filete \n ${stringCode}`;
    }
    if (this.frameAdded.length > 0) {
      for (let frame = 0; frame < this.frameAdded.length; frame++) {
        stringCode = `Codigo: ${this.frameAdded[frame].code.toString()} \n`;
        let detail = new serviceDetails();
        line += 1;
        detail.linea = line;
        detail.idMaterial = 4;
        detail.nombre = "Marco Codigo: "+this.frameAdded[frame].code;
        detail.precio = this.frameAdded[frame].price;
        details.push(detail);
        
      }
      stringFramed[3] = ` ${this.convertNumberToText(
        this.frameAdded.length
      )} Marco \n ${stringCode}`;
    }

    if (total) {
      cardSend.title = 'Enmarcado';
      cardSend.description =
        (stringFramed[0] == undefined ? '' : '\n ' + stringFramed[0]) +
        (stringFramed[1] == undefined ? '' : '\n ' + stringFramed[1]) +
        (stringFramed[2] == undefined ? '' : '\n ' + stringFramed[2]) +
        (stringFramed[3] == undefined ? '' : '\n ' + stringFramed[3]);
      cardSend.total = parseFloat(total);
    }
    cardSend.id = this.cardId +1;
    this.cardId += 1;
    this.cardEvent.emit(cardSend);
    this.detailsServiceSent.emit(details);
    this.clearFramed();
  }

  addCardVentaneria(): void {
    let stringFramed: string[] = [];
    let details : serviceDetails[] =[];
    let stringCode = '';
    let line = 0;
    let cardSend = new Card();
    let total = this.ventaneriaForm.get('total')?.value;

    if (this.glassAdded2.length > 0) {
      for (let glass = 0; glass < this.glassAdded2.length; glass++) {
        stringCode = `Tipo: ${this.glassAdded2[glass].type.toString()} \n`;
        let detail = new serviceDetails();
        line += 1;
        detail.linea = line;
        detail.idMaterial = 2;
        detail.nombre = "Vidrio Tipo: "+this.glassAdded[glass].type;
        detail.precio = this.glassAdded[glass].price;
        details.push(detail);
      }
      stringFramed[0] = ` ${this.convertNumberToText(
        this.glassAdded2.length
      )} Vidrio \n ${stringCode}`;
    }

    if (this.frameAdded2.length > 0) {
      for (let frame = 0; frame < this.frameAdded2.length; frame++) {
        stringCode = `Codigo: ${this.frameAdded2[frame].code.toString()} \n`;
        let detail = new serviceDetails();
        line += 1;
        detail.linea = line;
        detail.idMaterial = 4;
        detail.nombre = "Marco Codigo: "+this.frameAdded[frame].code;
        detail.precio = this.frameAdded[frame].price;
        details.push(detail);
      }
      stringFramed[1] = ` ${this.convertNumberToText(
        this.frameAdded2.length
      )} Marco \n ${stringCode}`;
    }

    if (total) {
      cardSend.title = 'Ventaneria';
      cardSend.description =
        (stringFramed[0] == undefined ? '' : '\n ' + stringFramed[0]) +
        (stringFramed[1] == undefined ? '' : '\n ' + stringFramed[1]);
      cardSend.total = parseFloat(total);
    }
    cardSend.id = this.cardId +1;
    this.cardId += 1;
    this.cardEvent.emit(cardSend);
    this.detailsServiceSent.emit(details);
    this.clearVentaneria();
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
    if (this.passpartoutAdded.length > 0 && measure) {
      totalPass = this.framedService.calcPasspartout(
        this.passpartoutAdded,
        measure
      );
      console.log('pass' + totalPass);
    }

    if (this.glassAdded.length > 0 && measure) {
      totalGlass = this.framedService.calcGlass(this.glassAdded, measure);
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
        totalFrame = this.framedService.calcFrame(
          this.frameAdded,
          measure,
          true,
          this.utility
        );
        console.log('frame w ' + totalFrame);
      } else {
        totalFrame = this.framedService.calcFrame(
          this.frameAdded,
          measure,
          false,
          this.utility
        );
        console.log('frame wo ' + totalFrame);
      }
    }

    subtotal = totalPass + totalGlass + totalFillet + totalFrame;

    let labour = this.FramedForm.get('labour')?.value;
    let utilty = this.FramedForm.get('utility')?.value;
    let totalWlabour = 0;
    let totalWutility = 0;
    if (labour) {
      totalWlabour = parseFloat(labour);
    }
    if (utilty) {
      totalWutility = parseFloat(utilty);
    }

    total = (subtotal + totalWlabour) * totalWutility;

    this.FramedForm.patchValue({ total: total.toFixed(2) });
  }

  addVentaneria(): void {
    let totalGlass = 0;
    let totalFrame = 0;
    let subtotal = 0;
    let total = 0;

    let measure = this.ventaneriaForm.get('measure')?.value;

    if (this.glassAdded2.length > 0 && measure) {
      totalGlass = this.framedService.calcGlass(this.glassAdded2, measure);
      console.log('glass' + totalGlass);
    }

    if (this.frameAdded2.length > 0 && measure) {
      totalFrame = this.framedService.calcFrame(
        this.frameAdded2,
        measure,
        false,
        this.utility
      );
      console.log('frame wo ' + totalFrame);
    }

    subtotal = totalGlass + totalFrame;

    let labour = this.ventaneriaForm.get('labour')?.value;
    let utilty = this.ventaneriaForm.get('utility')?.value;
    let totalWlabour = 0;
    let totalWutility = 0;
    if (labour) {
      totalWlabour = parseFloat(labour);
    }
    if (utilty) {
      totalWutility = parseFloat(utilty);
    }

    total = (subtotal + totalWlabour) * totalWutility;

    this.ventaneriaForm.patchValue({ total: total.toString() });
  }

  buscarPass(): void {
    this.filterPass = this.passepatouts.filter((ele: Passepartout) => {
      const value = ele.codigoPassepartout;
      var code = this.passPartoutForm.get('code')?.value;

      if (code != undefined) {
        return value.toString() == code;
      }
      return null;
    });
    if (this.filterPass.length >= 1) {
      this.passPartoutForm.get('home')?.enable();
    } else {
      this.passPartoutForm.get('home')?.disable();
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

  setPriceGlass2(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    var type = selectElement.value;
    var glassFound = this.glasses.filter((glass: Glass) => {
      return (
        glass.tipoVidrio.toLowerCase().trim() === type.toLowerCase().trim()
      );
    });
    this.selectedGlass2 = glassFound[0].precioVidrio.toString();

    this.glassVForm.patchValue({
      price: glassFound[0].precioVidrio.toString(),
    });
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
      newPass.code = parseInt(pass.code);

      if (
        this.filterPass.length > 0 &&
        this.filterPass[0].codigoPassepartout == pass.code
      ) {
        this.allowPass = true;
      }
    }
    if (pass && pass.price) {
      newPass.price = parseFloat(pass.price);
    }
    if (pass && pass.home) {
      newPass.home = pass.home;
    }
    if (this.allowPass) {
      this.passpartoutAdded.push(newPass);
      this.clearForm(this.passPartoutForm);
    } else {
      this.badNotify = ' No existe el codigo';
      this.deleteNotify();
      this.clearForm(this.passPartoutForm);
    }
  }

  deleteFrame(index: number): void {
    this.frameAdded.splice(index, 1);
  }

  deleteFrame2(index: number): void {
    this.frameAdded2.splice(index, 1);
  }

  addFrame(): void {
    var frame = this.frameForm.value;
    var newFrame = new Cframe();

    if (frame && frame.code) {
      newFrame.code = parseInt(frame.code);

      if (this.filterFrame.length > 0) {
        this.allowFrame = true;
      }
    }

    newFrame.price = parseFloat(this.selectedframe);

    if (this.allowFrame) {
      this.frameAdded.push(newFrame);
      this.clearForm(this.frameForm);
    } else {
      console.log(newFrame);
      this.badNotify = ' No existe el codigo';
      this.deleteNotify();
      this.clearForm(this.frameForm);
    }
  }

  findFrame2(): void {
    const frameCode = this.frameVForm.value?.code;

    if (frameCode) {
      this.filterFrame2 = this.frames.filter((frame: Frame) => {
        const value = frame.codigoMarco;

        return value == frameCode;
      });
    } else {
      this.filterFrame2 = [];
    }
    console.log(this.filterFrame2);
    if (this.filterFrame2.length > 0) {
      this.selectedframe2 = this.filterFrame2[0].precioMarco.toString();
      this.frameVForm.patchValue({
        price: this.filterFrame2[0].precioMarco.toString(),
      });
    } else {
      this.frameVForm.patchValue({
        price: '',
      });
    }
  }

  addFrame2(): void {
    var frame = this.frameVForm.value;
    var newFrame = new Cframe();

    if (frame && frame.code) {
      newFrame.code = parseInt(frame.code);

      if (this.filterFrame2.length > 0) {
        this.allowFrame = true;
      }
    }

    newFrame.price = parseFloat(this.selectedframe2);

    if (this.allowFrame) {
      this.frameAdded2.push(newFrame);
      this.clearForm(this.frameVForm);
    } else {
      console.log(newFrame);
      this.badNotify = ' No existe el codigo';
      this.deleteNotify();
      this.clearForm(this.frameVForm);
    }
  }

  deletePasspartout(index: number): void {
    this.passpartoutAdded.splice(index, 1);
  }

  deleteGlass(index: number): void {
    this.glassAdded.splice(index, 1);
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
  }
  deleteGlass2(index: number): void {
    this.glassAdded2.splice(index, 1);
  }

  addGlass2(): void {
    var glass = this.glassVForm.value;
    var newGlass = new Glass_Fillet();

    if (glass && glass.type) {
      newGlass.type = glass.type;
    }

    newGlass.price = parseFloat(this.selectedGlass2);

    console.log(glass);
    this.glassAdded2.push(newGlass);
    this.clearForm(this.glassVForm);
  }

  deleteFillet(index: number): void {
    this.filletAdded.splice(index, 1);
  }

  addFillet(): void {
    var fillet = this.filletForm.value;
    var newFillet = new Glass_Fillet();

    if (fillet && fillet.type) {
      newFillet.type = fillet.type;
    }

    newFillet.price = parseFloat(this.selectedfillet);

    console.log(fillet);
    this.filletAdded.push(newFillet);
    this.clearForm(this.filletForm);
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
  }

  clearVentaneria(): void {
    this.frameAdded2 = [];
    this.glassAdded2 = [];
    this.ventaneriaForm.reset();
    this.toggleVentaneria = false;
  }

  clearInstalation(): void {
    this.clearForm(this.instalationForm);
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

  setUpVentaneria(): void {
    var utility = this.utility.filter(
      (ut: Utility) => ut.nombreUtilidad.toLowerCase().trim() == "utilidad"
    );
    
    if (utility.length > 0) {
      this.selectedUtility2 = utility[0].valorUtilidad.toString();
      this.ventaneriaForm.patchValue({
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
      case this.toggleOptionsMaterials[4]:
        if (this.toggleVidrio2) {
          this.toggleVidrio2 = false;
        } else {
          this.toggleVidrio2 = true;
        }
        break;
      case this.toggleOptionsMaterials[5]:
        if (this.toggleMarco2) {
          this.toggleMarco2 = false;
        } else {
          this.toggleMarco2 = true;
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
          this.clearVentaneria();
        } else {
          this.toggleVentaneria = true;
          this.setUpVentaneria();
        }
        break;
      case this.toggleOptions[3]:
        if (this.toggleInstalation) {
          this.toggleInstalation = false;
        } else {
          this.toggleInstalation = true;
          this.clearForm(this.instalationForm);
        }
        break;
    }
  }
}
