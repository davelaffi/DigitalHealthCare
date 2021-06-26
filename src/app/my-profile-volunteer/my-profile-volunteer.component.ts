import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { VolunteerProfile } from '../models/volunteer_profile';
import { DatabaseService } from '../service/database.service';
import { UploadService } from '../service/uploadStorage.service';

@Component({
  selector: 'app-my-profile-volunteer',
  templateUrl: './my-profile-volunteer.component.html',
  styleUrls: ['./my-profile-volunteer.component.css']
})
export class MyProfileVolunteerComponent implements OnInit {
  
  userProfileUploaded : File | undefined;
  currentUserRaw : any;
  public currentUser : VolunteerProfile;
  public currentUserTemp : VolunteerProfile;

  public photoModified = false;

  constructor(
    public firestore : AngularFirestore,
    public dbService : DatabaseService,
    private storage: UploadService,
    public db : AngularFirestore
  ) { 
    this.currentUserTemp = new VolunteerProfile();
    this.currentUser = new VolunteerProfile();
  }

  ngOnInit(): void {
    const userToConvert = localStorage.getItem('user');
    this.currentUserRaw = userToConvert !== null ? JSON.parse(userToConvert) : "";
    
    const documentRef = this.firestore.collection('users').doc(this.currentUserRaw['uid']);
    const collectionInstance = documentRef.valueChanges();
    collectionInstance.subscribe(ss => {
      this.currentUserTemp = this.dbService.createUserVolunteerFromSnapshot(ss);

      const documentRefMedico = this.firestore.collection('volunteers').doc(this.currentUserTemp.CF);
      const collectionInstanceMedico = documentRefMedico.valueChanges();
      collectionInstanceMedico.subscribe(ss => {
        this.currentUser = this.dbService.createCompleteVolunteerFromSnapshot(ss, this.currentUserTemp)
      
        localStorage.setItem('volontario',JSON.stringify(this.currentUser));
      });
    });
  }

  onFileChanged(event : any) {
    this.storage.handleFiles(event.target.files[0]);
    this.photoModified = true;
  }

  async registerChanges(){

    const userRef: AngularFirestoreDocument = this.db.collection('volunteers').doc(`${this.currentUser.CF}`);

    if(this.photoModified){
      await this.storage.uploadFile(this.currentUser.CF + "_profile", this.currentUser.uid);
    }

    console.log(this.currentUser);
    
    userRef.update({
      nome: this.currentUser.nome,
      cognome: this.currentUser.cognome,
      pec: this.currentUser.pec,
      telefono: this.currentUser.telefono
    });


  }

 

}
