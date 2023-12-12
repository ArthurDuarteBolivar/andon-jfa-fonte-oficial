import { NameID } from "./nameid";

export interface Nodemcu {
    id:          number;
    nameId:      NameID;
    count:       number;
    time:        number;
    state:       string;
    data:        number;
    currentTC:   number;
    maintenance: number;
    shortestTC: number;
    firtlastTC: number;
    secondtlastTC: number;
    thirdlastTC: number;
    qtdeTCexcedido: number;
    tcmedio: number;
    localTC: number;
}