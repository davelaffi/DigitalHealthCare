import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { CovidReport } from '../models/covid_report';
import { Patient } from '../models/patient';
import { VolunteerProfile } from '../models/volunteer_profile';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-emergenza-covid-volunteer',
  templateUrl: './emergenza-covid-volunteer.component.html',
  styleUrls: ['./emergenza-covid-volunteer.component.css']
})
export class EmergenzaCovidVolunteerComponent implements OnInit {

  showAllPatients : boolean = false;
  public currentUser = new VolunteerProfile();

  controllerSection = 0;
  visualizeList = true;
  tipologie = ["Tampone", "Sierologico", "Vaccinazione"];
  tipologia = "";

  tampone: any[] = [];
  sierologico: any[] = [];
  vaccinazioni: any[] = [];

  patient = new Patient();
  selectedCF = "";

  greenPassValid = false;

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
    public modalService : NgbModal,
  ) { }

  ngOnInit(): void {

    const userToConvert = localStorage.getItem('volontario');
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
        console.log(doc);
        this.report.push(this.db.createReportFromSnapshot(doc));
        
      });
      this.report = this.report.sort((a,b) => a.data.localeCompare(b.data)).reverse();
      this.mySubs.push(sub1);
    });
  }

  openDocument(url: string){
    window.open(url);
  }

  dateFormat(date : NgbDateStruct ) : string{
    return date.year + '-' + date.month + '-' + date.day;
  }

  checkGreenPass(){
    this.report.forEach((rep) =>{
      if(rep.tipologia == this.tipologie[0]){
        if(rep.esito == "Negativo" && this.calculateDiffDate(rep.data) <= 2){
          this.greenPassValid = true;
        }
      }

      else if(rep.tipologia == this.tipologie[2]){
        if(rep.esito == "Richiamo" && this.calculateDiffDate(rep.data) < 90){
          this.greenPassValid = true;
        }
        else if(rep.nomeVaccino == "Johnson" && this.calculateDiffDate(rep.data) < 90){
          this.greenPassValid = true;
        }
      }
      console.log(this.greenPassValid);
    })
  }

  calculateDiffDate(dateSent : any){
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
}
triggerModal(content : any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
}

}
