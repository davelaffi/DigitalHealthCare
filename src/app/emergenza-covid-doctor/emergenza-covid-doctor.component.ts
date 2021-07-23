import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CovidReport } from '../models/covid_report';
import { MedicoProfile } from '../models/medico_profile';
import { Patient } from '../models/patient';
import { DatabaseService } from '../service/database.service';
import { UploadService } from '../service/uploadStorage.service';
import { UploadServiceFile } from '../service/uploadStorageFile.service';

@Component({
  selector: 'app-emergenza-covid-doctor',
  templateUrl: './emergenza-covid-doctor.component.html',
  styleUrls: ['./emergenza-covid-doctor.component.css']
})
export class EmergenzaCovidComponent implements OnInit {

  showAllPatients : boolean = false;
  public currentUser = new MedicoProfile();

  controllerSection = 0;
  visualizeList = true;
  tipologie = ["Tampone", "Sierologico", "Vaccinazione"];
  tipologia = "";
  reportUploaded = false;
  reportAdded = false;

  tampone: any[] = [];
  sierologico: any[] = [];
  vaccinazioni: any[] = [];

  patient = new Patient;
  selectedCF = "";
  reportToAdd = new CovidReport;

  //Where I put patients list
  myArray: any[] = [];

  //Array of reports
  report: CovidReport[] = [];

  data!: NgbDateStruct;

  mySubs: Subscription[] = [];
  myArray1: any[] = [];

  searchText = "";

  constructor(
    private firestore: AngularFirestore,
    public db: DatabaseService,
    private modalService: NgbModal,
    private storage: UploadServiceFile,
  ) {
  }

  ngOnInit(): void {

    const userToConvert = localStorage.getItem('medico');
    this.currentUser = userToConvert !== null ? JSON.parse(userToConvert) : "";

    this.myArray = [];
    const collectionRef = this.firestore.collection('citizens');
    const collectionInstance = collectionRef.valueChanges();
    var sub = collectionInstance.subscribe(ss => {
      this.myArray = ss;
      this.mySubs.push(sub);
    });
  }

  changeSectionGo(x: number, el: HTMLElement) {
    this.controllerSection = x;

    switch (x) {
      case 1: { this.tipologia = this.tipologie[0]; break; }
      case 2: { this.tipologia = this.tipologie[1]; break; }
      case 3: { this.tipologia = this.tipologie[2]; break; }
      default: { this.tipologia = ""; }
    }

    this.db.delay(100).then(res => { el.scrollIntoView(); });

  }

  selectedPatient(selectedCF: string) {
    this.visualizeList = false;
    this.selectedCF = selectedCF;

    const docRef = this.firestore.collection('citizens').doc(this.selectedCF);
    const collectionInstance = docRef.valueChanges();
    var sub = collectionInstance.subscribe(ss => {
      this.patient = this.db.createGeneralPatientFromSnapshot(ss);
      console.log(this.patient);
      this.mySubs.push(sub);
    });

    let dataDoc = docRef.collection('covid19');

    var sub1 = dataDoc.valueChanges().subscribe((querySnapshot) => {
      this.report = [];
      querySnapshot.forEach((doc) => {
        this.report.push(this.db.createReportFromSnapshot(doc));
      });
      this.report = this.report.sort((a,b) => a.data.localeCompare(b.data)).reverse();
      this.mySubs.push(sub1);
    });
  }

  triggerModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }

  closeAll() {
    this.reportToAdd = new CovidReport;
    this.reportUploaded = false;
    this.modalService.dismissAll('Cross click');
  }


  onFileChanged(event: any) {
    this.storage.handleFiles(event.target.files[0]);
    this.reportUploaded = true;
  }

  async registerChanges() {
    const ts = Date.now().toString();
    
    await this.storage.uploadFile(this.patient.CF + "_report" + ts, this.patient.CF, ts, this.reportToAdd).then(res => {
      this.reportAdded = true;
      this.closeAll();
    }).catch(error => { window.alert(error); console.log("Errore update"); });
  }

  openDocument(url: string){
    window.open(url);
  }

  dateFormat(date : NgbDateStruct ) : string{
    return date.year + '-' + date.month + '-' + date.day;
  }

  deleteReport(selectedReport : CovidReport){
    console.log(selectedReport);
    this.firestore.collection('citizens').doc(this.selectedCF).collection('covid19').doc(selectedReport.ts).delete()
    .catch(error => {window.alert(error)});
  }

}

// let dataDoc = docRef.collection('covid19');
//       let dataDocRef = dataDoc.ref.orderBy('date');

//       dataDocRef.get().then( res => {
//         res.forEach((doc) => console.log(doc.id))
//       }
//       )