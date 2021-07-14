import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../models/patient';
import { VolunteerProfile } from '../models/volunteer_profile';
import { DatabaseService } from '../service/database.service';
import { UploadServiceCitizenPhoto } from '../service/uploadStorageCitizenPhoto.service';


@Component({
  selector: 'app-patient-profile-volunteer',
  templateUrl: './patient-profile-volunteer.component.html',
  styleUrls: ['./patient-profile-volunteer.component.css']
})
export class PatientProfileVolunteerComponent implements OnInit {

  CF: any;
  patient: Patient = new Patient;
  arrayDatePatient: any[] = [];
  lastChosenTS: any;
  showAge: any;
  photoModified = false;

  editable = false;
  controllerSection = 0;

  public isCollapsed1 = true;
  public currentUser = new VolunteerProfile();

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private db: DatabaseService,
    private storage: UploadServiceCitizenPhoto,
    public router: Router,
    public firebaseAuth: AngularFireAuth,
  ) { 
  }

  ngOnInit(): void {

    const userToConvert = localStorage.getItem('volontario');
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

  changeDatePatient(ts: any) {
    const docRef = this.firestore.collection('citizens').doc(this.CF).collection('data').doc(ts);
    const collectionInstance = docRef.valueChanges();
    collectionInstance.subscribe(ss => {
      this.patient = this.db.createPatientFromSnapshotVolunteer(ss, this.patient);
    });
    this.lastChosenTS = ts;
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

  changeSectionGo(x: number) {
    this.controllerSection = x;
  }

  async modifyDataVolunteer() {
    console.log(this.patient);

    if(this.photoModified){
      await this.storage.uploadFile(this.patient.CF + "_profile", this.patient.CF);
    }

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

        //Dati inseriti dal Volontario
        numeroCartaIdentità : this.patient.datiVolontario.numeroCartaIdentita,
        comuneRilascio : this.patient.datiVolontario.comuneRilascio,
        dataScadenza : this.patient.datiVolontario.dataScadenza,
        contatto1 : this.patient.datiVolontario.contatto1,
        telefono1 : this.patient.datiVolontario.telefono1,
        contatto2 : this.patient.datiVolontario.contatto2,
        telefono2 : this.patient.datiVolontario.telefono2,
        viveSolo : this.patient.datiVolontario.viveSolo,
        areaUtenza : this.patient.datiVolontario.areaUtenza,
        servizioAssociazione : this.patient.datiVolontario.servizioAssociazione,
        dataRilascio : this.patient.datiVolontario.dataRilascio,
        codiceATS : this.patient.datiVolontario.codiceATS,

      }).then(async res => {
        console.log("Modifiche salvate");
        await this.db.delay(2000);
        console.log(this.router.url);
        this.router.navigate(['homeVolunteer']);
      }).catch((error) => {
        window.alert(error)
      })
  }

  onFileChanged(event : any) {
    this.storage.handleFiles(event.target.files[0]);
    this.photoModified = true;
  }

  resetProfile(){
    this.firebaseAuth.sendPasswordResetEmail(this.patient.datiPersonali.email);
  }
}
