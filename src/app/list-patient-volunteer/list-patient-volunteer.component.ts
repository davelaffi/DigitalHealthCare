import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Patient } from '../models/patient';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-list-patient-volunteer',
  templateUrl: './list-patient-volunteer.component.html',
  styleUrls: ['./list-patient-volunteer.component.css']
})
export class ListPatientVolunteerComponent implements OnInit {

  myArray: any[] = [];
  mySubs : Subscription[] = [];

  searchText = "";
  patient = new Patient();

  constructor(
    private firestore: AngularFirestore,
    public db : DatabaseService
    ) { }

  ngOnInit(): void {
    this.myArray = [];
    const collectionRef = this.firestore.collection('citizens');
    const collectionInstance = collectionRef.valueChanges();
    var sub = collectionInstance.subscribe(ss => {
      this.myArray = ss;
      this.myArray.sort((a,b) => 
        a.CFVolontario.localeCompare(b.CFVolontario)
      );
      this.mySubs.push(sub);
    });
  }

  addNewCitizen(patientToAdd : Patient){

    localStorage.setItem('patientToAdd', JSON.stringify(patientToAdd));


    this.db.cancelSubscriptions(this.mySubs);
  }

}
