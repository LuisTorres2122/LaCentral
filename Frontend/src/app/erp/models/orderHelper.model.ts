import { serviceDetails } from "./order.model";

export class Cpasspartout{
    code: number;
    price: number;
    home: string;
}

export class Glass_Fillet{
    type: string;
    price: number;
}

export class Cframe{
    code: number;
    price: number;
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