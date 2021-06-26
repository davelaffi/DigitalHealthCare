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

    return resultPatient;
  }

  createPatientFromSnapshotMedico(patientFromArray : any, resultPatient : Patient){
    
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
    resultPatient.datiMedico.codiceATS = patientFromArray.codiceATS;

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
    resultPatient.datiVolontario.numeroCartaIdentita = patientFromArray.numeroCartaIdentità;
    resultPatient.datiVolontario.comuneRilascio = patientFromArray.comuneRilascio;
    resultPatient.datiVolontario.dataScadenza = patientFromArray.dataScadenza;
    resultPatient.datiVolontario.contatto1 = patientFromArray.contatto1;
    resultPatient.datiVolontario.telefono1 = patientFromArray.telefono1;
    resultPatient.datiVolontario.contatto2 = patientFromArray.contatto2;
    resultPatient.datiVolontario.telefono2 = patientFromArray.telefono2;
    resultPatient.datiVolontario.viveSolo = patientFromArray.viveSolo;
    resultPatient.datiVolontario.areaUtenza = patientFromArray.areaUtenza;
    resultPatient.datiVolontario.servizioAssociazione = patientFromArray.servizioAssociazione;


    return resultPatient;
  }

  createPatientFromSnapshot(patientFromArray : any, resultPatient : Patient){
    
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
    resultPatient.datiMedico.codiceATS = patientFromArray.codiceATS;

    //Dati Volontario
    resultPatient.datiVolontario.numeroCartaIdentita = patientFromArray.numeroCartaIdentità;
    resultPatient.datiVolontario.comuneRilascio = patientFromArray.comuneRilascio;
    resultPatient.datiVolontario.dataScadenza = patientFromArray.dataScadenza;
    resultPatient.datiVolontario.contatto1 = patientFromArray.contatto1;
    resultPatient.datiVolontario.telefono1 = patientFromArray.telefono1;
    resultPatient.datiVolontario.contatto2 = patientFromArray.contatto2;
    resultPatient.datiVolontario.telefono2 = patientFromArray.telefono2;
    resultPatient.datiVolontario.viveSolo = patientFromArray.viveSolo;
    resultPatient.datiVolontario.areaUtenza = patientFromArray.areaUtenza;
    resultPatient.datiVolontario.servizioAssociazione = patientFromArray.servizioAssociazione;

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

    return report;
  }

  delay(ms:number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  cancelSubscriptions(mySubs : Subscription[]){
    mySubs.forEach(element => {element.unsubscribe()});
  }
}
