export type Arma = {
    id?:number;
    modelo:string;
    registro:string;
    emprestada:boolean;
}

export type ArmaError = {
    modelo:string;
    registro:string;
    emprestada:string;
}

