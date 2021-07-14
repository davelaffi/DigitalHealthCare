import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Patient } from '../models/patient';
import { VolunteerProfile } from '../models/volunteer_profile';
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

  public currentUser = new VolunteerProfile();
  showAllCitizens : boolean = false;

  constructor(
    private firestore: AngularFirestore,
    public db : DatabaseService
    ) { }

  ngOnInit(): void {

    const userToConvert = localStorage.getItem('volontario');
    this.currentUser = userToConvert !== null ? JSON.parse(userToConvert) : "";

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
