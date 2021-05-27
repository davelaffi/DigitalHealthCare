import { medicoData } from "./medicoData";
import { personalData } from "./personalData";
import { volontarioData } from "./volontarioData";

export class Patient{
    public ts: number;
    public nome: string;
    public cognome: string;
    public CF: string;
    public photoURL: string;
    public datiPersonali : personalData;
    public datiMedico : medicoData;
    public datiVolontario : volontarioData;
    public medicoCF : string;
    public volunteerCF : string;

    constructor(){
        this.ts = 0;
        this.nome = "";
        this.cognome = "";
        this.CF = "";
        this.photoURL = "";
        this.datiPersonali = new personalData();
        this.datiMedico = new medicoData();
        this.datiVolontario = new volontarioData();
        this.medicoCF = "";
        this.volunteerCF = "";
    }
}