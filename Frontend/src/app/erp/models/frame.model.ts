export class Frame{
    pkIdMarco:number;
    nombreMaterial: string;
    codigoMarco: string;
    precioMarco: number;
}
export class SFrame{
    pkIdMarco:number;
    fkIdMaterial: number;
    codigoMarco: string;
    precioMarco: number;
}