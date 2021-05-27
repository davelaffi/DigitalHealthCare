import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

    isSignedIn = false;

    constructor(public firebaseService : AuthService){}
    ngOnInit(){
      if(localStorage.getItem('user') !== null){
        this.isSignedIn= true;
      }
      else
        this.isSignedIn = false;
    }
    
    async onSignin(email:string,password:string){
      await this.firebaseService.signin(email,password);
      if(this.firebaseService.isLoggedIn()){
        this.isSignedIn = true;
        console.log("Sei dentro");
      }

      
    }

    async googleSignIn(){
      await this.firebaseService.googleSignin();

      if(this.firebaseService.isLoggedIn()){
        this.isSignedIn = true;
        console.log("Sei dentro");
      }
    }
  
  }