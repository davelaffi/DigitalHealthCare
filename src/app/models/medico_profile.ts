import { User } from "./user";

export class MedicoProfile extends User{
    
    public nome : string;
    public cognome: string;
    public telefono: string;
    public pec: string;

    constructor(){    
        super();
        this.nome = "";
        this.cognome = "";
        this.telefono = "";
        this.pec = "";
    }
    
}