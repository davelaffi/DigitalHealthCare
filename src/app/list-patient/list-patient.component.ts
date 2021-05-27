import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css']
})
export class ListPatientsComponent implements OnInit {

  myArray: any[] = [];
  mySubs : Subscription[] = [];

  searchText = "";

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
      this.mySubs.push(sub);
    });
  }

}
