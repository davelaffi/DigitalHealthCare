import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private basePath = '/profile_image';
  file: File | undefined;
  url = '';

  constructor(private storage: AngularFireStorage, 
    public db : AngularFirestore) { }

  handleFiles(file : File) {
    this.file = file;
  }

  //method to upload file at firebase storage
  async uploadFile(nomeFile : string, uid : string) {
    if (this.file) {
      const filePath = `${this.basePath}/` + nomeFile;    //path at which image will be stored in the firebase storage
      const snap = await this.storage.upload(filePath, this.file);    //upload task
      this.getUrl(snap, uid);
    } else {
      alert('Please select an image');
      }
  }

  //method to retrieve download url
  private async getUrl(snap: firebase.storage.UploadTaskSnapshot, uid : string) {
    const userRef: AngularFirestoreDocument = this.db.collection('users').doc(`${uid}`);
    const url = await snap.ref.getDownloadURL();
    this.url = url;  //store the URL
    userRef.update({
       photoURL : this.url
      });
  }
}