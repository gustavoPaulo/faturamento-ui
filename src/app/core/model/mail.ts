import { Faturamento } from "./faturamento";

export class Mail { 
    
    status!: string;
    message!: string;
    destination!: string;
    invoice!: Faturamento;
}