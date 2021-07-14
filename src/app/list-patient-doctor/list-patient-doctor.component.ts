import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MedicoProfile } from '../models/medico_profile';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-list-patient-doctor',
  templateUrl: './list-patient-doctor.component.html',
  styleUrls: ['./list-patient-doctor.component.css']
})
export class ListPatientsComponent implements OnInit {

  myArray: any[] = [];
  mySubs : Subscription[] = [];
  
  public currentUser : MedicoProfile;

  showAllPatients : boolean = false;

  searchText = "";

  constructor(
    private firestore: AngularFirestore,
    public db : DatabaseService,
    private route: ActivatedRoute,
    ) { 
      this.currentUser = new MedicoProfile();
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

}
