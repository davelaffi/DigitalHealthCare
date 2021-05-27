  
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { VolunteerProfile } from '../models/volunteer_profile';
import { MedicoProfile } from '../models/medico_profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged = false
  constructor(public firebaseAuth : AngularFireAuth, public router : Router, public db : AngularFirestore) { }

  async signin(email: string, password : string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLogged = true
      console.log(res);
      localStorage.setItem('user',JSON.stringify(res.user))
      this.router.navigate(['home']);
    }).catch((error) => {
      window.alert(error)
  })
  }
  
  async signup(userCreated : MedicoProfile | VolunteerProfile, password:string){
    await this.firebaseAuth.createUserWithEmailAndPassword(userCreated.email, password)
    .then(res=>{
      this.isLogged = true;
      this.SendVerificationMail();
      localStorage.setItem('user',JSON.stringify(res.user));
      this.setUserData(res.user, userCreated);
    }).catch((error) => {
      window.alert(error)
  })
  }

  setUserData(user : any, userCreated : MedicoProfile | VolunteerProfile){

    const userRef: AngularFirestoreDocument = this.db.collection('users').doc(`${user.uid}`);
    
    userRef.set({
      email: userCreated.email,
      uid: user.uid,
      photoURL: user.photoURL != null ? user.photoURL : "https://firebasestorage.googleapis.com/v0/b/digital-healthcare-it.appspot.com/o/profile_image%2FUnknown_person.jpg?alt=media&token=0807cbb4-d08a-461d-9006-44530fede5b2",
      emailVerified: user.emailVerified,
      CF: userCreated.CF,
      userType: userCreated.userType,
    });

    if(userCreated.userType == "medico"){
      const medicoRef: AngularFirestoreDocument = this.db.collection('doctors').doc(userCreated.CF);

      medicoRef.set({
        cognome: userCreated.cognome,
        nome: userCreated.nome,
        telefono: userCreated.telefono,
        pec: userCreated.pec,
        CF: userCreated.CF,
      });
    }

    else if(userCreated.userType == "volunteer"){
      const medicoRef: AngularFirestoreDocument = this.db.collection('volunteers').doc(userCreated.CF);

      medicoRef.set({
        cognome: userCreated.cognome,
        nome: userCreated.nome,
        telefono: userCreated.telefono,
        pec: userCreated.pec,
        CF: userCreated.CF,
      });
    }
  }


  async SendVerificationMail() {
    return await this.firebaseAuth.currentUser.then((user) => {
        return user !== null ? user.sendEmailVerification() : null;
    }).then(() => {
        this.router.navigate(['verifyMail']);
    })
}

// Reset forgot password
async ForgotPassword(passwordResetEmail : string) {
  return await this.firebaseAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
          window.alert('Password reset email sent, check your inbox.');
          this.router.navigate(['signIn']);
      }).catch((error) => {
          window.alert(error)
      })
}


async googleSignin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return await this.firebaseAuth.signInWithPopup(provider)
  .then((res) => {
    console.log(res);
    this.isLogged = true;
    localStorage.setItem('user',JSON.stringify(res.user))
      this.router.navigate(['home']);
  }).catch((error) => {
    window.alert(error)
});
  
}




isLoggedIn() {
  const takeUser = localStorage.getItem('user')
  const user = takeUser != null ? JSON.parse(takeUser) : null;

  return (user !== null) ? true : false;
}

  // Sign out
  async SignOut() {
    return await this.firebaseAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['signIn']);
    });
}
}