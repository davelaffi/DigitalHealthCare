import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { CovidReport } from '../models/covid_report';
import { Patient } from '../models/patient';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-emergenza-covid',
  templateUrl: './emergenza-covid.component.html',
  styleUrls: ['./emergenza-covid.component.css']
})
export class EmergenzaCovidComponent implements OnInit {

  controllerSection = 0;
  visualizeList = true;
  tipologia = "";

  tampone: any[] = [];
  sierologico: any[] = [];
  vaccinazioni: any[] = [];

  patient = new Patient;
  selectedCF = "";

  //Where I put patients list
  myArray: any[] = [];

  //Array of reports
  report: CovidReport[] = [];

  mySubs: Subscription[] = [];

  searchText = "";

  constructor(
    private firestore: AngularFirestore,
    public db: DatabaseService
  ) { }

  ngOnInit(): void {
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
    
    switch(x){
      case 1 : {this.tipologia = "tampone"; break;}
      case 2 : {this.tipologia = "sierologico"; break;}
      case 3 : {this.tipologia = "vaccinazione"; break;}
      default : {this.tipologia = "";}
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

      var sub1 = dataDoc.get().subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.report.push(this.db.createReportFromSnapshot(doc.data()));
        });
        this.report = this.report.reverse();
        this.mySubs.push(sub1);
      });
  }

}

// let dataDoc = docRef.collection('covid19');
//       let dataDocRef = dataDoc.ref.orderBy('date');

//       dataDocRef.get().then( res => {
//         res.forEach((doc) => console.log(doc.id))
//       }
//       )