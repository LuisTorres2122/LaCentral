//class for showing
export class Glass {
  pkIdVidrio: number;

  nombreMaterial: string;

  tipoVidrio: string;

  precioVidrio: number;
}
//class for insert, update
export class SGlass {
  pkIdVidrio: number;

  fkIdMaterial: number;

  tipoVidrio: string;

  precioVidrio: number;
}
