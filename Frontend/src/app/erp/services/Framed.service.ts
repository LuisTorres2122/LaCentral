import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import { Utility } from '../models/utility.models';
import { Fillet } from '../models/fillet.model';
import {
  Cframe,
  Cpasspartout,
  Glass_Fillet,
} from '../models/orderHelper.model';
import { Passepartout } from '../models/passepartout.model';

@Injectable({
  providedIn: 'root',
})
export class FramedService {
  constructor(private utilityService: UtilityService) {}

  public calcPasspartout(passpartout: Cpasspartout[], measure: string): number {
    let total = 0;
    var measures = this.transformPiece(measure);

    if (measures) {
      for (const pass of passpartout) {
        total +=  pass.price;
      }
    }

    return total;
  }

  public calcGlass(glasses: Glass_Fillet[], measure: string, border:number): number {
    let total = 0;
    let prices = 0;
    
    var measures = this.transformPiece(measure);
    if (measures) {
      let h = measures[0] + (border*2);
      let w = measures[1] + (border*2);
      let descripcion = h * w;
      console.log(descripcion);
      for (const glass of glasses) {
        prices += glass.price;
      }
      total += descripcion * prices;
    }
    return total;
  }

  public calcFillet(
    fillets: Glass_Fillet[],
    measure: string,
    utility: Utility[]
  ): number {
    let total = 0;
    let prices = 0;
    var measures = this.transformPiece(measure);
    var waste = this.filterData(utility, 'Desperdicio Filete');

    if (measures) {
      let h = measures[0];
      let w = measures[1];
      let descripcion = (h + w) * 2;
      console.log(descripcion);
      for (const fillet of fillets) {
        prices += fillet.price;
        console.log(prices);
      }

      total = (descripcion + waste) * prices;
      console.log(total);
    }

    return total;
  }

  public calcFrame(
    frames: Cframe[],
    measure: string,
    pass: boolean,
    utility: Utility[],
    border:number
  ): number {
    let total = 0;
    var measures = this.transformPiece(measure);
    var waste = this.filterData(utility, 'Desperdicio Marco');
    let h;
    let w;
    let prices=0;
    let descripcion;
    if (measures) {
      if (pass) {
        h = measures[0] + (border*2);
        w = measures[1] + (border*2);
        descripcion = (h + w) * 2;
        
      } else {
        h = measures[0];
        w = measures[1];
        descripcion = (h + w) * 2;
        
      }
      console.log(descripcion);
      for (const frame of frames) {
        prices += frame.price;
      }
      console.log(prices);
      total = (descripcion + waste) * prices;
      console.log(total);
    }

    return total;
  }

  private filterData(utility: Utility[], name: string): number {
    let value = 0;
    if (utility) {
      let utilityFrame = utility.filter(
        (ut: Utility) =>
          ut.nombreUtilidad.toLowerCase().trim() === name.toLowerCase().trim()
      );
      value = utilityFrame[0].valorUtilidad;
    }
    return value;
  }

  private transformPiece(measure: string): number[] | null {
    var numbers = [];
    const matches = measure.match(/^(\d+)x(\d+)$/);
    if (matches) {
      numbers[0] = parseInt(matches[1]);
      numbers[1] = parseInt(matches[2]);
      return numbers;
    }
    return null;
  }
}
