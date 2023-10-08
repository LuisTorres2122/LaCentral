export class Fillet{
    pkIdFilete:number;
    nombreMaterial: string;
    tipoFilete: string;
    precioFilete: number;
}
export class SFillet{
    pkIdFilete:number;
    fkIdMaterial: number;
    tipoFilete: string;
    precioFilete: number;
}