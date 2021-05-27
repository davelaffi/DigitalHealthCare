import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/models/user';
import { MedicoProfile } from 'src/app/models/medico_profile';
import { VolunteerProfile } from 'src/app/models/volunteer_profile';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isSignedIn = false;
  public medicoCreated : MedicoProfile | undefined;
  public volunteerCreated : VolunteerProfile | undefined;
  public userCreated : any;
  public userType : string; 
  password : string;

  public nome : string = "";
  public cognome : string = "";
  public telefono : string = "";
  public pec : string = "";
  public email : string = "";
  public CF : string = "";

  controllerSection : number = 1;
  passwordNotEquals = false;


  constructor(public firebaseService : AuthService){
    this.userType = "";
    this.password = "";
  }

    ngOnInit(){
      if(localStorage.getItem('user')!== null){
        this.isSignedIn= true;
    }
      else{
        this.isSignedIn = false;
      }
    }
 

   async onSignup(){
    
    if(this.userType == "medico"){
      this.onSignupMedico();
    }
    else if(this.userType == "volunteer"){
      this.onSignupVolunteer();
    }
  }

  async onSignupMedico(){
    this.medicoCreated = new MedicoProfile();
    this.medicoCreated.userType = "medico";
    this.medicoCreated.CF = this.CF;
    this.medicoCreated.cognome = this.cognome;
    this.medicoCreated.email = this.email;
    this.medicoCreated.nome = this.nome;
    this.medicoCreated.pec = this.pec;
    this.medicoCreated.telefono = this.telefono;


    try {
      await this.firebaseService.signup(this.medicoCreated, this.password);

      if(this.firebaseService.isLoggedIn())
        this.isSignedIn = true;

    } catch (error) {
      window.alert(error);
    }

    console.log(this.medicoCreated);
  }

  async onSignupVolunteer(){
    this.volunteerCreated = new VolunteerProfile();
    this.volunteerCreated.userType = "volunteer";

    try {
      await this.firebaseService.signup(this.volunteerCreated,this.password);

      if(this.firebaseService.isLoggedIn())
        this.isSignedIn = true;

    } catch (error) {
      window.alert(error);
    }

    console.log(this.volunteerCreated);
  }

  changeSectionGo(){
    this.controllerSection = this.controllerSection + 1;
    this.passwordNotEquals = false;
  }

  changeSectionBack(){
    this.controllerSection = this.controllerSection -1;
  }

  passwordError(){
    this.passwordNotEquals = true;
  }

}
