import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public emailAdress : string = "";

  constructor(public firebaseService : AuthService) { }

  ngOnInit(): void {
  }

  forgotPass(){
    this.firebaseService.ForgotPassword(this.emailAdress);
  }

}
