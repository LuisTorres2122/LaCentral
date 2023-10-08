export class Order {
  idPedido: number;
  idCliente: number;
  nombre: string;
  fecha: string;
  descuento: number;
  total: number;
  abono: number;
  estatus: boolean;
}

export class OrderDetails {
  idDetallePedido: number;
  idPedido: number;
  descripcion: string;
  precio: number;
}

export class serviceDetails {
  idDetallePedido: number;
  linea: number;
  idMaterial: number;
  nombre: string;
  precio: number;
  color?: string;
}

export class Transaction{
    orderHeader: Order;
    orderDetails: OrderDetails[];
    serviceDetails?: serviceDetails[];
}
