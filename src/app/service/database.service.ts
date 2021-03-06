import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { CovidReport } from '../models/covid_report';
import { MedicoProfile } from '../models/medico_profile';
import { Patient } from '../models/patient';
import { User } from '../models/user';
import { VolunteerProfile } from '../models/volunteer_profile';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  createMedicoFromSnapshot(ss: unknown): MedicoProfile {
    console.log("Wieldoginsdo");
    return new MedicoProfile();
  }

  constructor() { }

  createGeneralPatientFromSnapshot(patientFromArray : any){
    var resultPatient = new Patient();

    resultPatient.CF = patientFromArray.CF
    resultPatient.nome = patientFromArray.nome;

    resultPatient.cognome = patientFromArray.cognome;
    resultPatient.photoURL = patientFromArray.photoURL;
    resultPatient.medicoCF = patientFromArray.CFMedico;
    resultPatient.volunteerCF = patientFromArray.CFVolontario;

    return resultPatient;
  }

  createPatientFromSnapshotMedico(patientFromArray : any, resultPatient : Patient){

    console.log("Ciaoo:")
    console.log(patientFromArray.patologieCronicheRilevanti)
    
    //Dati personali
    resultPatient.CF = patientFromArray.CF
    resultPatient.nome = patientFromArray.nome;
    resultPatient.cognome = patientFromArray.cognome;
    resultPatient.datiPersonali.sesso = patientFromArray.sesso;
    resultPatient.datiPersonali.dataNascita = patientFromArray.dataNascita;
    resultPatient.datiPersonali.comuneNascita = patientFromArray.comuneNascita;
    resultPatient.datiPersonali.indirizzoDomicilio = patientFromArray.indirizzoDomicilio;
    resultPatient.datiPersonali.CAP = patientFromArray.CAP;
    resultPatient.datiPersonali.comuneDomicilio = patientFromArray.comuneDomicilio;
    resultPatient.datiPersonali.telefono = patientFromArray.telefono;
    resultPatient.datiPersonali.email = patientFromArray.email;
    resultPatient.datiPersonali.pec = patientFromArray.pec;
    resultPatient.datiPersonali.provinciaNascita = patientFromArray.provinciaNascita;
    resultPatient.datiPersonali.provinciaDomicilio = patientFromArray.provinciaDomicilio;

    //Dati Medico
    resultPatient.datiMedico.codiceEsenzione = patientFromArray.codiceEsenzione;
    resultPatient.datiMedico.retiPatologieAssistito = patientFromArray.retiPatologieAssistito;
    resultPatient.datiMedico.capacitaMotoriaAssistito = patientFromArray.capacitaMotoriaAssistito;
    resultPatient.datiMedico.attivitaLavorativa = patientFromArray.attivitaLavorativa;
    resultPatient.datiMedico.patologieCronicheRilevanti = patientFromArray.patologieCronicheRilevanti;
    resultPatient.datiMedico.organiMancanti = patientFromArray.organiMancanti;
    resultPatient.datiMedico.trapianti = patientFromArray.trapianti;
    resultPatient.datiMedico.rilevantiMalformazioni = patientFromArray.rilevantiMalformazioni;
    resultPatient.datiMedico.reazioniAvverseFarmaciAlimenti = patientFromArray.reazioniAvverseFarmaciAlimenti;
    resultPatient.datiMedico.allergieCutaneeRespiratorieSistemiche = patientFromArray.allergieCutaneeRespiratorieSistemiche;
    resultPatient.datiMedico.allergieVelenoImenotteri = patientFromArray.allergieVelenoImenotteri;
    resultPatient.datiMedico.protesi = patientFromArray.protesi;
    resultPatient.datiMedico.ausili = patientFromArray.ausili;
    resultPatient.datiMedico.terapieFarmacologicheCroniche = patientFromArray.terapieFarmacologicheCroniche;
    resultPatient.datiMedico.anamnesiFamigliari = patientFromArray.anamnesiFamigliari;
    resultPatient.datiMedico.fattoriRischio = patientFromArray.fattoriRischio;
    resultPatient.datiMedico.terapieFarmacologiche = patientFromArray.terapieFarmacologiche;
    resultPatient.datiMedico.vaccinazioni = patientFromArray.vaccinazioni;
    resultPatient.datiMedico.contattoCareGiver = patientFromArray.contattoCareGiver;
    resultPatient.datiMedico.telefonoCareGiver = patientFromArray.telefonoCareGiver;
    resultPatient.datiMedico.donazioneOrgani = patientFromArray.donazioneOrgani;
    resultPatient.datiMedico.patologieInAtto = patientFromArray.patologieInAtto;
    resultPatient.datiMedico.gravidanzeParti = patientFromArray.gravidanzeParti;
    resultPatient.datiMedico.altezza = patientFromArray.altezza;
    resultPatient.datiMedico.peso = patientFromArray.peso;
    resultPatient.datiMedico.pressioneArteriosa = patientFromArray.pressioneArteriosa;
    resultPatient.datiMedico.BMI = patientFromArray.BMI;
    resultPatient.datiMedico.ADI = patientFromArray.ADI;
    resultPatient.datiMedico.ADP = patientFromArray.ADP;
    resultPatient.datiMedico.gruppoSanguigno = patientFromArray.gruppoSanguigno;
    resultPatient.datiMedico.fattoreRH = patientFromArray.fattoreRH;

    return resultPatient;
  }

  createPatientFromSnapshotVolunteer(patientFromArray : any, resultPatient : Patient){
    
    //Dati personali
    resultPatient.CF = patientFromArray.CF
    resultPatient.nome = patientFromArray.nome;
    resultPatient.cognome = patientFromArray.cognome;
    resultPatient.datiPersonali.sesso = patientFromArray.sesso;
    resultPatient.datiPersonali.dataNascita = patientFromArray.dataNascita;
    resultPatient.datiPersonali.comuneNascita = patientFromArray.comuneNascita;
    resultPatient.datiPersonali.indirizzoDomicilio = patientFromArray.indirizzoDomicilio;
    resultPatient.datiPersonali.CAP = patientFromArray.CAP;
    resultPatient.datiPersonali.comuneDomicilio = patientFromArray.comuneDomicilio;
    resultPatient.datiPersonali.telefono = patientFromArray.telefono;
    resultPatient.datiPersonali.email = patientFromArray.email;
    resultPatient.datiPersonali.pec = patientFromArray.pec;
    resultPatient.datiPersonali.provinciaNascita = patientFromArray.provinciaNascita;
    resultPatient.datiPersonali.provinciaDomicilio = patientFromArray.provinciaDomicilio;

    //Dati Volontario
    resultPatient.datiVolontario.numeroCartaIdentita = patientFromArray.numeroCartaIdentit??;
    resultPatient.datiVolontario.comuneRilascio = patientFromArray.comuneRilascio;
    resultPatient.datiVolontario.dataScadenza = patientFromArray.dataScadenza;
    resultPatient.datiVolontario.contatto1 = patientFromArray.contatto1;
    resultPatient.datiVolontario.telefono1 = patientFromArray.telefono1;
    resultPatient.datiVolontario.contatto2 = patientFromArray.contatto2;
    resultPatient.datiVolontario.telefono2 = patientFromArray.telefono2;
    resultPatient.datiVolontario.viveSolo = patientFromArray.viveSolo;
    resultPatient.datiVolontario.areaUtenza = patientFromArray.areaUtenza;
    resultPatient.datiVolontario.servizioAssociazione = patientFromArray.servizioAssociazione;
    resultPatient.datiVolontario.codiceATS = patientFromArray.codiceATS;
    resultPatient.datiVolontario.dataRilascio = patientFromArray.dataRilascio;


    return resultPatient;
  }

  createPatientFromSnapshot(patientFromDB : any, resultPatient : Patient){
    
    //Dati personali
    resultPatient.CF = patientFromDB.CF
    resultPatient.nome = patientFromDB.nome;
    resultPatient.cognome = patientFromDB.cognome;
    resultPatient.datiPersonali.sesso = patientFromDB.sesso;
    resultPatient.datiPersonali.dataNascita = patientFromDB.dataNascita;
    resultPatient.datiPersonali.comuneNascita = patientFromDB.comuneNascita;
    resultPatient.datiPersonali.indirizzoDomicilio = patientFromDB.indirizzoDomicilio;
    resultPatient.datiPersonali.CAP = patientFromDB.CAP;
    resultPatient.datiPersonali.comuneDomicilio = patientFromDB.comuneDomicilio;
    resultPatient.datiPersonali.telefono = patientFromDB.telefono;
    resultPatient.datiPersonali.email = patientFromDB.email;
    resultPatient.datiPersonali.pec = patientFromDB.pec;
    resultPatient.datiPersonali.provinciaNascita = patientFromDB.provinciaNascita;
    resultPatient.datiPersonali.provinciaDomicilio = patientFromDB.provinciaDomicilio;

    //Dati Medico
    resultPatient.datiMedico.codiceEsenzione = patientFromDB.codiceEsenzione;
    resultPatient.datiMedico.retiPatologieAssistito = patientFromDB.retiPatologieAssistito;
    resultPatient.datiMedico.capacitaMotoriaAssistito = patientFromDB.capacitaMotoriaAssistito;
    resultPatient.datiMedico.attivitaLavorativa = patientFromDB.attivitaLavorativa;
    resultPatient.datiMedico.patologieCronicheRilevanti = patientFromDB.patologieCronicheRilevanti;
    resultPatient.datiMedico.organiMancanti = patientFromDB.organiMancanti;
    resultPatient.datiMedico.trapianti = patientFromDB.trapianti;
    resultPatient.datiMedico.rilevantiMalformazioni = patientFromDB.rilevantiMalformazioni;
    resultPatient.datiMedico.reazioniAvverseFarmaciAlimenti = patientFromDB.reazioniAvverseFarmaciAlimenti;
    resultPatient.datiMedico.allergieCutaneeRespiratorieSistemiche = patientFromDB.allergieCutaneeRespiratorieSistemiche;
    resultPatient.datiMedico.allergieVelenoImenotteri = patientFromDB.allergieVelenoImenotteri;
    resultPatient.datiMedico.protesi = patientFromDB.protesi;
    resultPatient.datiMedico.ausili = patientFromDB.ausili;
    resultPatient.datiMedico.terapieFarmacologicheCroniche = patientFromDB.terapieFarmacologicheCroniche;
    resultPatient.datiMedico.anamnesiFamigliari = patientFromDB.anamnesiFamigliari;
    resultPatient.datiMedico.fattoriRischio = patientFromDB.fattoriRischio;
    resultPatient.datiMedico.terapieFarmacologiche = patientFromDB.terapieFarmacologiche;
    resultPatient.datiMedico.vaccinazioni = patientFromDB.vaccinazioni;
    resultPatient.datiMedico.contattoCareGiver = patientFromDB.contattoCareGiver;
    resultPatient.datiMedico.telefonoCareGiver = patientFromDB.telefonoCareGiver;
    resultPatient.datiMedico.donazioneOrgani = patientFromDB.donazioneOrgani;
    resultPatient.datiMedico.patologieInAtto = patientFromDB.patologieInAtto;
    resultPatient.datiMedico.gravidanzeParti = patientFromDB.gravidanzeParti;
    resultPatient.datiMedico.altezza = patientFromDB.altezza;
    resultPatient.datiMedico.peso = patientFromDB.peso;
    resultPatient.datiMedico.pressioneArteriosa = patientFromDB.pressioneArteriosa;
    resultPatient.datiMedico.BMI = patientFromDB.BMI;
    resultPatient.datiMedico.ADI = patientFromDB.ADI;
    resultPatient.datiMedico.ADP = patientFromDB.ADP;
    resultPatient.datiMedico.gruppoSanguigno = patientFromDB.gruppoSanguigno;
    resultPatient.datiMedico.fattoreRH = patientFromDB.fattoreRH;

    //Dati Volontario
    resultPatient.datiVolontario.numeroCartaIdentita = patientFromDB.numeroCartaIdentit??;
    resultPatient.datiVolontario.comuneRilascio = patientFromDB.comuneRilascio;
    resultPatient.datiVolontario.dataScadenza = patientFromDB.dataScadenza;
    resultPatient.datiVolontario.contatto1 = patientFromDB.contatto1;
    resultPatient.datiVolontario.telefono1 = patientFromDB.telefono1;
    resultPatient.datiVolontario.contatto2 = patientFromDB.contatto2;
    resultPatient.datiVolontario.telefono2 = patientFromDB.telefono2;
    resultPatient.datiVolontario.viveSolo = patientFromDB.viveSolo;
    resultPatient.datiVolontario.areaUtenza = patientFromDB.areaUtenza;
    resultPatient.datiVolontario.servizioAssociazione = patientFromDB.servizioAssociazione;
    resultPatient.datiVolontario.codiceATS = patientFromDB.codiceATS;
    resultPatient.datiVolontario.dataRilascio = patientFromDB.dataRilascio;

    return resultPatient;
  }


  createUserMedicoFromSnapshot(userSnapshot : any){
    var user = new MedicoProfile();

    user.CF = userSnapshot.CF;
    user.email = userSnapshot.email;
    user.emailVerified = userSnapshot.emailVerified;
    user.photoURL = userSnapshot.photoURL;
    user.uid = userSnapshot.uid;
    user.userType = userSnapshot.userType;

    return user;
  }

  createUserVolunteerFromSnapshot(userSnapshot : any){
    var user = new VolunteerProfile();

    user.CF = userSnapshot.CF;
    user.email = userSnapshot.email;
    user.emailVerified = userSnapshot.emailVerified;
    user.photoURL = userSnapshot.photoURL;
    user.uid = userSnapshot.uid;
    user.userType = userSnapshot.userType;

    return user;
  }

  createCompleteMedicoFromSnapshot(userSnapshot : any, medicoUser : MedicoProfile){
    var user = new MedicoProfile();

    user = medicoUser;

    user.nome = userSnapshot.nome;
    user.cognome = userSnapshot.cognome;
    user.pec = userSnapshot.pec;
    user.telefono = userSnapshot.telefono;

    return user;
  }

  createCompleteVolunteerFromSnapshot(userSnapshot : any, volunteerUser : VolunteerProfile){
    var user = new VolunteerProfile();

    user = volunteerUser;

    user.nome = userSnapshot.nome;
    user.cognome = userSnapshot.cognome;
    user.pec = userSnapshot.pec;
    user.telefono = userSnapshot.telefono;

    return user;
  }

  createMedicoFromStorage(medicoRaw : any){
    var medico = new MedicoProfile();

    medico.CF = medicoRaw['CF'];
    medico.cognome = medicoRaw['cognome'];
    medico.email = medicoRaw['email'];
    medico.emailVerified = medicoRaw['emailVerified'];
    medico.nome = medicoRaw['nome'];
    medico.pec = medicoRaw['pec'];
    medico.photoURL = medicoRaw['photoURL'];
    medico.telefono = medicoRaw['telefono'];
    medico.uid = medicoRaw['uid'];
    medico.userType = medicoRaw['userType'];

    return medico;
  }

  createVolunteerFromStorage(volunteerRaw : any){
    var volunteer = new VolunteerProfile();

    volunteer.CF = volunteerRaw['CF'];
    volunteer.cognome = volunteerRaw['cognome'];
    volunteer.email = volunteerRaw['email'];
    volunteer.emailVerified = volunteerRaw['emailVerified'];
    volunteer.nome = volunteerRaw['nome'];
    volunteer.pec = volunteerRaw['pec'];
    volunteer.photoURL = volunteerRaw['photoURL'];
    volunteer.telefono = volunteerRaw['telefono'];
    volunteer.uid = volunteerRaw['uid'];
    volunteer.userType = volunteerRaw['userType'];

    return volunteer;
  }

  createReportFromSnapshot(reportRaw : any){
    var report = new CovidReport;

    report.tipologia = reportRaw.tipologia;
    report.esito = reportRaw.esito;
    report.link = reportRaw.link;
    report.data = reportRaw.data;
    report.nomeVaccino = reportRaw.nomeVaccino;
    report.ts = reportRaw.ts;

    return report;
  }

  delay(ms:number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  cancelSubscriptions(mySubs : Subscription[]){
    mySubs.forEach(element => {element.unsubscribe()});
  }
}
