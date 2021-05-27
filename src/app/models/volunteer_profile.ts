import { User } from "./user";

export class VolunteerProfile extends User{

    public cognome: string;
    public nome: string;
    public telefono: string;
    public pec: string;

    constructor(){    
        super();
        this.cognome = "";
        this.nome = "";
        this.telefono = "";
        this.pec = "";
    }
    
}