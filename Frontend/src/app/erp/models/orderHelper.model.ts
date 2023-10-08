import { serviceDetails } from "./order.model";

export class Cpasspartout{
    code: string;
    color: string;
    price: number;
    
}

export class Glass_Fillet{
    type: string;
    price: number;
    color?: string;
}

export class Cframe{
    code: string;
    price: number;
    color: string;
}

export class Card {
    id:number;
    title: string;
    description: string;
    total: number;
  }

export class updateCards{
    cards: Card[];
    Details: serviceDetails[];
}

export class reportRequest{
    firstDate: string;
    lastDate: string;
}