import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UploadServiceCitizenPhoto {

  private basePath = '/citizen_image';
  file: File | undefined;
  url = '';

  constructor(
    private storage: AngularFireStorage, 
    public db : AngularFirestore
    ) { }

  handleFiles(file : File) {
    this.file = file;
  }

  setBasePath(basePath : string){
    this.basePath = basePath;
  }

  //method to upload file at firebase storage
  async uploadFile(nomeFile : string, CF : string) {
    if (this.file) {
      const filePath = `${this.basePath}/` + nomeFile;    //path at which image will be stored in the firebase storage
      const snap = await this.storage.upload(filePath, this.file);    //upload task
      this.getUrl(snap, CF);
    } else {
      alert('Please select an image');
      }
  }

  //method to retrieve download url
  private async getUrl(snap: firebase.storage.UploadTaskSnapshot, CF : string) {
    const userRef: AngularFirestoreDocument = this.db.collection('citizens').doc(CF);
    const url = await snap.ref.getDownloadURL();
    this.url = url;  //store the URL
    userRef.update({
       photoURL : this.url
      });
  }
}