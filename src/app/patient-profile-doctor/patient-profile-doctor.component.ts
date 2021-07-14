import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from "@angular/router";
import { MedicoProfile } from '../models/medico_profile';
import { Patient } from '../models/patient';
import { DatabaseService } from '../service/database.service';


@Component({
  selector: 'app-patient-profile-doctor',
  templateUrl: './patient-profile-doctor.component.html',
  styleUrls: ['./patient-profile-doctor.component.css']
})
export class PatientProfileComponent implements OnInit {

  CF: any;
  patient: Patient = new Patient;
  showAge: any;
  lastChosenTS: any;

  arrayDatePatient: any[] = [];

  controllerSection = 0;
  public isCollapsed1 = true;
  public isCollapsed2 = true;
  public isCollapsed3 = true;
  public isCollapsed4 = true;

  public currentUser : MedicoProfile;

  editable = false;
  ispatient = false;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private db: DatabaseService,
    public router: Router,
  ) {
    this.currentUser = new MedicoProfile();
  }

  ngOnInit() {

    const userToConvert = localStorage.getItem('medico');
    this.currentUser = userToConvert !== null ? JSON.parse(userToConvert) : "";

    this.CF = this.route.snapshot.paramMap.get("patientCF");

    const docRef = this.firestore.collection('citizens').doc(this.CF);
    const collectionInstance = docRef.valueChanges();
    collectionInstance.subscribe(ss => this.patient = this.db.createGeneralPatientFromSnapshot(ss));
    
    // this.firestore.collection('citizens').doc(this.CF).update({
    //   photoURL: "Ciao"
    // });

    let dataDoc = this.firestore.collection('citizens').doc(this.CF).collection('data');
    dataDoc.get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.arrayDatePatient.push(doc.id);
      });
      this.arrayDatePatient = this.arrayDatePatient.reverse();
      this.changeDatePatient(this.arrayDatePatient[0]);
    });

  }

  ageCalculator(age: any) {
    if (age) {
      const convertAge = new Date(age);
      console.log(convertAge);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }
    return this.showAge;
  }

  changeDatePatient(ts: any) {
    const docRef = this.firestore.collection('citizens').doc(this.CF).collection('data').doc(ts);
    const collectionInstance = docRef.valueChanges();
    collectionInstance.subscribe(ss => {
      this.patient = this.db.createPatientFromSnapshotMedico(ss, this.patient);
    });
    this.lastChosenTS = ts;
  }

  changeSectionGo(x: number) {
    this.controllerSection = x;
  }

  addNewPatient() {
    console.log(this.patient);

    this.firestore.collection('citizens').doc(this.patient.CF).collection('data').doc(this.lastChosenTS)
      .update({
        //Dati personali
        CF: this.patient.CF,
        nome: this.patient.nome,
        cognome: this.patient.cognome,
        sesso: this.patient.datiPersonali.sesso,
        dataNascita: this.patient.datiPersonali.dataNascita,
        comuneNascita: this.patient.datiPersonali.comuneNascita,
        indirizzoDomicilio: this.patient.datiPersonali.indirizzoDomicilio,
        CAP: this.patient.datiPersonali.CAP,
        comuneDomicilio: this.patient.datiPersonali.comuneDomicilio,
        telefono: this.patient.datiPersonali.telefono,
        email: this.patient.datiPersonali.email,
        pec: this.patient.datiPersonali.pec,
        provinciaNascita: this.patient.datiPersonali.provinciaNascita,
        provinciaDomicilio: this.patient.datiPersonali.provinciaDomicilio,

        //Dati inseriti dal medico
        codiceEsenzione: this.patient.datiMedico.codiceEsenzione,
        retiPatologieAssistito: this.patient.datiMedico.retiPatologieAssistito,
        capacitaMotoriaAssistito: this.patient.datiMedico.capacitaMotoriaAssistito,
        attivitaLavorativa: this.patient.datiMedico.attivitaLavorativa,
        patologieCronicheRilevanti: this.patient.datiMedico.patologieCronicheRilevanti,
        organiMancanti: this.patient.datiMedico.organiMancanti,
        trapianti: this.patient.datiMedico.trapianti,
        rilevantiMalformazioni: this.patient.datiMedico.rilevantiMalformazioni,
        reazioniAvverseFarmaciAlimenti: this.patient.datiMedico.reazioniAvverseFarmaciAlimenti,
        allergieCutaneeRespiratorieSistemiche: this.patient.datiMedico.allergieCutaneeRespiratorieSistemiche,
        allergieVelenoImenotteri: this.patient.datiMedico.allergieVelenoImenotteri,
        protesi: this.patient.datiMedico.protesi,
        ausili: this.patient.datiMedico.ausili,
        terapieFarmacologicheCroniche: this.patient.datiMedico.terapieFarmacologicheCroniche,
        anamnesiFamigliari: this.patient.datiMedico.anamnesiFamigliari,
        fattoriRischio: this.patient.datiMedico.fattoriRischio,
        terapieFarmacologiche: this.patient.datiMedico.terapieFarmacologiche,
        vaccinazioni: this.patient.datiMedico.vaccinazioni,
        contattoCareGiver: this.patient.datiMedico.contattoCareGiver,
        telefonoCareGiver: this.patient.datiMedico.telefonoCareGiver,
        donazioneOrgani: this.patient.datiMedico.donazioneOrgani,
        patologieInAtto: this.patient.datiMedico.patologieInAtto,
        gravidanzeParti: this.patient.datiMedico.gravidanzeParti,
        altezza: this.patient.datiMedico.altezza,
        peso: this.patient.datiMedico.peso,
        pressioneArteriosa: this.patient.datiMedico.pressioneArteriosa,
        BMI: this.patient.datiMedico.BMI,
        ADI: this.patient.datiMedico.ADI,
        ADP: this.patient.datiMedico.ADP,
        gruppoSanguigno: this.patient.datiMedico.gruppoSanguigno,
        fattoreRH: this.patient.datiMedico.fattoreRH,

      }).then(async res => {
        console.log("Modifiche salvate");
        this.ispatient = true;
        await this.db.delay(2000);
        console.log(this.router.url);
        this.router.navigate(['home']);
      }).catch((error) => {
        this.ispatient = true;
        window.alert(error)
      })
  }

}
