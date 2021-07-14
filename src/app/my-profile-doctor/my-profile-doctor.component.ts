import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MedicoProfile } from '../models/medico_profile';
import { DatabaseService } from '../service/database.service';
import { UploadService } from '../service/uploadStorage.service';


@Component({
  selector: 'app-my-profile-doctor',
  templateUrl: './my-profile-doctor.component.html',
  styleUrls: ['./my-profile-doctor.component.css']
})
export class MyProfileComponent implements OnInit {

  userProfileUploaded : File | undefined;
  currentUserRaw : any;
  public currentUser : MedicoProfile;
  public currentUserTemp : MedicoProfile;

  public photoModified = false;

  constructor(
    public firestore : AngularFirestore,
    public dbService : DatabaseService,
    private storage: UploadService,
    public db : AngularFirestore
  ) { 
    this.currentUserTemp = new MedicoProfile();
    this.currentUser = new MedicoProfile();
  }

  ngOnInit(): void {
    const userToConvert = localStorage.getItem('user');
    this.currentUserRaw = userToConvert !== null ? JSON.parse(userToConvert) : "";
    
    const documentRef = this.firestore.collection('users').doc(this.currentUserRaw['uid']);
    const collectionInstance = documentRef.valueChanges();
    collectionInstance.subscribe(ss => {
      this.currentUserTemp = this.dbService.createUserMedicoFromSnapshot(ss);

      const documentRefMedico = this.firestore.collection('doctors').doc(this.currentUserTemp.CF);
      const collectionInstanceMedico = documentRefMedico.valueChanges();
      collectionInstanceMedico.subscribe(ss => {
        this.currentUser = this.dbService.createCompleteMedicoFromSnapshot(ss, this.currentUserTemp)
      
        localStorage.setItem('medico',JSON.stringify(this.currentUser));
      });
    });
  }

  onFileChanged(event : any) {
    this.storage.handleFiles(event.target.files[0]);
    this.photoModified = true;
  }

  async registerChanges(){

    const userRef: AngularFirestoreDocument = this.db.collection('doctors').doc(`${this.currentUser.CF}`);

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
