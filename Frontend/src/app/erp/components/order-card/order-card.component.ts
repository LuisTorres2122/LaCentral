import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html'
})
export class OrderCardComponent implements OnInit {
  cardActivate: boolean[] = [];

  ngOnInit(): void {}
  Cards: Card[] = [
    {
      title: 'Enmarcado personalizado escultura',
      Materiales: {
        pasepartout: '2 87078 rojo',
        vidrio: '1 opaco',
        filete: '',
        marco: '1 899869 dorado',
      },
      Total: 1500,
    },
    {
      title: 'Instalacion vidrieria obras ',
      Materiales: {
        pasepartout: '',
        vidrio: '',
        filete: '',
        marco: '',
      },
      Total: 2500,
    },
    {
      title: 'Enmarcado personalizado escultura',
      Materiales: {
        pasepartout: '2 87078 rojo',
        vidrio: '1 opaco',
        filete: '',
        marco: '1 899869 dorado',
      },
      Total: 1500,
    },
  ];

  deleted(index: number): void {
    this.Cards.splice(index, 1);
    this.cardActivate.splice(index, 1);
  }

  changeToggle(index: number): void {
    if (this.cardActivate[index]) {
      this.cardActivate[index] = false;
    } else {
      this.cardActivate[index] = true;
    }
  }
}
export interface Card {
  title: string;
  Materiales: {
    pasepartout: string;
    vidrio: string;
    filete: string;
    marco: string;
  };
  Total: number;
}

export interface displayCard {
  position: number;
  status: boolean;
}
