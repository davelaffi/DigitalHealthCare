import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Patient } from '../models/patient';
import { DatabaseService } from '../service/database.service';
import { UploadServiceCitizenPhoto } from '../service/uploadStorageCitizenPhoto.service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-new-patient-volunteer',
  templateUrl: './add-new-patient-volunteer.component.html',
  styleUrls: ['./add-new-patient-volunteer.component.css']
})
export class AddNewPatientVolunteerComponent implements OnInit {

  patientToAdd = new Patient();
  patientAdded = false;
  CFVolunteer = "";
  photoModified = false;

  validEmail = false;
  email = "";

  dataScadenza!: NgbDateStruct;
  dataRilascio!: NgbDateStruct;

  controllerSection = 1;
  arrayDatePatient: any[] = [];

  constructor(
    private firestore: AngularFirestore,
    public router: Router,
    private storage: UploadServiceCitizenPhoto,
    public db: DatabaseService,
    public firebaseAuth: AngularFireAuth,
    private modalService: NgbModal,
    private calendar: NgbCalendar
  ) { }

  ngOnInit(): void {

    //Take patient from listPatient
    const patientRaw = localStorage.getItem('patientToAdd');
    const patientToAddRaw = patientRaw !== null ? JSON.parse(patientRaw) : "";

    //Take patient from listPatient
    const cfVolunteerRaw = localStorage.getItem('volontarioCF');
    this.CFVolunteer = cfVolunteerRaw !== null ? JSON.parse(cfVolunteerRaw) : "";

    this.patientToAdd.nome = patientToAddRaw.nome;
    this.patientToAdd.cognome = patientToAddRaw.cognome;
    this.patientToAdd.CF = patientToAddRaw.CF;
    this.patientToAdd.medicoCF = patientToAddRaw.CFMedico;
    this.patientToAdd.photoURL = patientToAddRaw.photoURL;


    console.log(this.CFVolunteer);
  }

  async addNewCitizen() {
    console.log(this.patientToAdd);

    //Set CFVolunteer
    let generalDoc = this.firestore.collection('citizens').doc(this.patientToAdd.CF).update({
      CFVolontario: this.CFVolunteer
    });

    if (this.photoModified) {
      await this.storage.uploadFile(this.patientToAdd.CF + "_profile", this.patientToAdd.CF);
    }

    let dataDoc = this.firestore.collection('citizens').doc(this.patientToAdd.CF).collection('data');
    dataDoc.get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.arrayDatePatient.push(doc.id);
      });
      this.arrayDatePatient = this.arrayDatePatient.reverse();
      
      console.log(this.patientToAdd);
      console.log(this.email);

      dataDoc.doc(this.arrayDatePatient[0]).update({
        numeroCartaIdentità: this.patientToAdd.datiVolontario.numeroCartaIdentita,
        comuneRilascio: this.patientToAdd.datiVolontario.comuneRilascio,
        dataScadenza: this.patientToAdd.datiVolontario.dataScadenza,
        contatto1: this.patientToAdd.datiVolontario.contatto1,
        telefono1: this.patientToAdd.datiVolontario.telefono1,
        contatto2: this.patientToAdd.datiVolontario.contatto2,
        telefono2: this.patientToAdd.datiVolontario.telefono2,
        viveSolo: this.patientToAdd.datiVolontario.viveSolo,
        areaUtenza: this.patientToAdd.datiVolontario.areaUtenza,
        servizioAssociazione: this.patientToAdd.datiVolontario.servizioAssociazione,
        codiceATS: this.patientToAdd.datiVolontario.codiceATS,
        dataRilascio: this.patientToAdd.datiVolontario.dataRilascio,
        email : this.email,
      }).then(res => {
        var randomstring = Math.random().toString(36).slice(-8);
        this.firebaseAuth.createUserWithEmailAndPassword(this.email, randomstring).then(res => {
          this.firebaseAuth.sendPasswordResetEmail(this.email).then(res => {
            this.modalService.dismissAll();
            this.router.navigate(['/ListPatientVolunteer']);
          })
          .catch((error) => {
            window.alert(error)
          });
        })
        .catch((error) => {
          window.alert(error)
        });
        console.log(randomstring);
      }).catch(error => window.alert(error));
    });

    this.patientAdded = true;

    localStorage.removeItem('patientToAdd');
  }

  onFileChanged(event: any) {
    this.storage.handleFiles(event.target.files[0]);
    this.photoModified = true;
  }

  triggerModal(content : any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  validateEmail(){
    let regexp = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    this.validEmail = regexp.test(this.email);
  }

  dateFormat(date : NgbDateStruct ) : string{
    return date.year + '-' + date.month + '-' + date.day;
  }

}
