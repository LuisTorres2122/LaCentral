import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent {

  toggleEnmarcado: boolean = false;
  toggleRestauration: boolean = false;
  toggleVentaneria: boolean = false;
  toggleInstalation: boolean = false;

  togglePasseparout: boolean = false;
  toggleVidrio: boolean = false;
  toggleFilete: boolean = false;
  toggleMarco: boolean = false;
  toggleOptions: string[] = ['enmarcado', 'restauration', 'ventaneria', 'instalation'];
  toggleOptionsMaterials: string[] = ['passepartout', 'vidrio', 'filete', 'marco'];

  currentDate:Date = new Date();
  date:string = this.currentDate.toDateString();

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
        } else {
          this.toggleEnmarcado = true;
        }
        break;
      case this.toggleOptions[1]:
        if (this.toggleRestauration) {
          this.toggleRestauration = false;
        } else {
          this.toggleRestauration = true;
        }
        break;
      case this.toggleOptions[2]:
        if (this.toggleVentaneria) {
          this.toggleVentaneria = false;
        } else {
          this.toggleVentaneria = true;
        }
        break;
      case this.toggleOptions[3]:
        if (this.toggleInstalation) {
          this.toggleInstalation = false;
        } else {
          this.toggleInstalation = true;
        }
        break;
    }
  }
}
