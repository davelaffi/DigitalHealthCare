import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { VolunteerProfile } from '../models/volunteer_profile';
import { AuthService } from '../service/auth.service';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-home-volontario',
  templateUrl: './home-volontario.component.html',
  styleUrls: ['./home-volontario.component.css']
})
export class HomeVolontarioComponent implements OnInit {
  currentUserRaw : any;
  public currentUserTemp : VolunteerProfile;
  public currentUser : VolunteerProfile;

  public cfNuovoCittadino : string = "";
  public cfAlreadyInDB = false;
  myArray: any[] = [];
  lastUpdateTS = 0;

  mySubs : Subscription[] = [];
  constructor(
    public authService : AuthService,
    public firestore : AngularFirestore,
    public db : DatabaseService,
    private modalService: NgbModal,
    public router : Router
  ) { 
    this.currentUserTemp = new VolunteerProfile();
    this.currentUser = new VolunteerProfile();
  }

  ngOnInit(): void {
    const userToConvert = localStorage.getItem('user');
    this.currentUserRaw = userToConvert !== null ? JSON.parse(userToConvert) : "";
    
    const documentRef = this.firestore.collection('users').doc(this.currentUserRaw['uid']);
    const collectionInstance = documentRef.valueChanges();
    var subs = collectionInstance.subscribe(ss => {
      this.currentUserTemp = this.db.createUserVolunteerFromSnapshot(ss);

      const documentRefVolontario = this.firestore.collection('volunteers').doc(this.currentUserTemp.CF);
      const collectionInstanceVolontario = documentRefVolontario.valueChanges();
      var subs2 = collectionInstanceVolontario.subscribe(ss => {
        this.currentUser = this.db.createCompleteVolunteerFromSnapshot(ss, this.currentUserTemp);
    
        localStorage.setItem('volontario', JSON.stringify(this.currentUser));
        localStorage.setItem('volontarioCF', JSON.stringify(this.currentUser.CF));
        this.mySubs.push(subs2);
      });
    });
    
    this.mySubs.push(subs);
  }


  logout(){
    this.authService.SignOut();
  }

}
