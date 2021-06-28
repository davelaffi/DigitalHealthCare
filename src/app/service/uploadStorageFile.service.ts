import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase/app';
import { CovidReport } from '../models/covid_report';

@Injectable({
  providedIn: 'root'
})
export class UploadServiceFile {

  private basePath = '/reports';
  file: File | undefined;
  url = '';

  constructor(
    private storage: AngularFireStorage,
    public db: AngularFirestore
  ) { }

  handleFiles(file: File) {
    this.file = file;
  }

  setBasePath(basePath: string) {
    this.basePath = basePath;
  }

  //method to upload file at firebase storage
  async uploadFile(nomeFile: string, CF: string, dateTS: string, report : CovidReport) {
    if (this.file) {
      console.log(this.file);
      const filePath = `${this.basePath}/` + nomeFile;    //path at which image will be stored in the firebase storage
      const snap = await this.storage.upload(filePath, this.file);    //upload task
      this.getUrl(snap, CF, dateTS, report);
    } else {
      alert('Please select an image');
    }
  }

  //method to retrieve download url
  private async getUrl(snap: firebase.storage.UploadTaskSnapshot, CF: string, dateTS: string, report : CovidReport) {
    const userRef: AngularFirestoreDocument = this.db.collection('citizens').doc(CF).collection('covid19').doc(dateTS);
    report.ts = dateTS;
    const url = await snap.ref.getDownloadURL();
    this.url = url;  //store the URL
    userRef.set({
      link: this.url,
      esito: report.esito,
      tipologia: report.tipologia,
      nomeVaccino: report.nomeVaccino,
      data: report.data,
      ts : report.ts,
    }).catch(error =>{window.alert(error); console.log("Errore set");});
  }
}