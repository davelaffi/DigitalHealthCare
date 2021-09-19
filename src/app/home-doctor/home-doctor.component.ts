import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MedicoProfile } from '../models/medico_profile';
import { AuthService } from '../service/auth.service';
import { DatabaseService } from '../service/database.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {trigger, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-home-doctor',
  templateUrl: './home-doctor.component.html',
  styleUrls: ['./home-doctor.component.css'],
  animations: [
    trigger('fade1', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate(1000, style({opacity: 1}))
      ]) 
    ]),
    trigger('fade2', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate(1500, style({opacity: 1}))
      ]) 
    ]),
    trigger('fade3', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate(2000, style({opacity: 1}))
      ]) 
    ]),
    trigger('fade4', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate(2500, style({opacity: 1}))
      ]) 
    ]),
  ]
})
export class HomeComponent implements OnInit {

  currentUserRaw : any;
  public currentUserTemp : MedicoProfile;
  public currentUser : MedicoProfile;

  public cfNuovoPaziente : string = "";
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
      this.currentUserTemp = new MedicoProfile();
      this.currentUser = new MedicoProfile();
    }
    

  ngOnInit(): void {
    const userToConvert = localStorage.getItem('user');
    this.currentUserRaw = userToConvert !== null ? JSON.parse(userToConvert) : "";
    
    const documentRef = this.firestore.collection('users').doc(this.currentUserRaw['uid']);
    const collectionInstance = documentRef.valueChanges();
    var subs = collectionInstance.subscribe(ss => {
      this.currentUserTemp = this.db.createUserMedicoFromSnapshot(ss);

      const documentRefMedico = this.firestore.collection('doctors').doc(this.currentUserTemp.CF);
      const collectionInstanceMedico = documentRefMedico.valueChanges();
      var subs2 = collectionInstanceMedico.subscribe(ss => {
        this.currentUser = this.db.createCompleteMedicoFromSnapshot(ss, this.currentUserTemp);
    
        localStorage.setItem('medico', JSON.stringify(this.currentUser));
        localStorage.setItem('medicoCF', JSON.stringify(this.currentUser.CF));
        this.mySubs.push(subs2);
      });
    });
    
    this.mySubs.push(subs);
    
  }

  triggerModal(content : any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  checkCF(){
    console.log(this.cfNuovoPaziente);

    var subs = this.firestore.collection('citizens').doc(this.cfNuovoPaziente).valueChanges().subscribe(
      
      ss => {
        if(ss == null){
          console.log("Non esiste");
          localStorage.setItem('CF', JSON.stringify(this.cfNuovoPaziente));
          localStorage.setItem('firstTime', JSON.stringify(true));
          localStorage.removeItem('lastUserDate');
          this.router.navigate(['newPatient']);
          this.modalService.dismissAll();
          this.db.cancelSubscriptions(this.mySubs);
        }
        else{
          console.log("esiste");
          this.cfAlreadyInDB = true;

          this.myArray = [];

          let dataDoc = this.firestore.collection('citizens').doc(this.cfNuovoPaziente).collection('data');
          dataDoc.get().subscribe((querySnapshot) => { 
            querySnapshot.forEach((doc) => {
              this.myArray.push(doc.id);
          });
          this.lastUpdateTS = this.myArray[this.myArray.length - 1];
        });
        
        }
      }
    );
    this.mySubs.push(subs);
  }
  
  addNewDatePatient(){
    localStorage.setItem('CF', JSON.stringify(this.cfNuovoPaziente));
    localStorage.setItem('firstTime', JSON.stringify(false));
    localStorage.setItem('lastUserDate', JSON.stringify(this.lastUpdateTS));
    this.router.navigate(['newPatient']);
    this.modalService.dismissAll();

    this.db.cancelSubscriptions(this.mySubs);
  }

  addNewPatientFromScratch(){
    localStorage.setItem('CF', JSON.stringify(this.cfNuovoPaziente));
    localStorage.setItem('firstTime', JSON.stringify(false));
    localStorage.removeItem('lastUserDate');
    this.router.navigate(['newPatient']);
    this.modalService.dismissAll();

    this.db.cancelSubscriptions(this.mySubs);
    }



  logout(){
    this.authService.SignOut();
  }

}
