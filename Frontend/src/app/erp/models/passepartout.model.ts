export class Passepartout{
    pkIdPassepartout: number;
    nombreMaterial: string;
    codigoPassepartout: number;
    casaPassepartout?: string;
    colorPassepartout: string;
}
export class SPassepartout{
    pkIdPassepartout: number;
    fkIdMaterial: number;
    codigoPassepartout: number;
    casaPassepartout?: string;
    colorPassepartout: string;
}