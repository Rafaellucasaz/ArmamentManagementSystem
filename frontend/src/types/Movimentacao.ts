export type Movimentacao = {
    id?:number;
    armeiro_id?:number;
    data:string;
    hora:string;
    tipo:boolean;
    arma_id?:number;
    balas?:number;
    calibre:string;
    carregadores?:number;
    guarda_id?:number;
    observacao:string|null;
}

export type MovimentacaoError = {
    error:string;
    armeiro_id:string;
    data:string;
    hora:string;
    tipo:string;
    arma_id:string;
    balas:string;
    calibre:string;
    carregadores:string;
    guarda_id:string;
}