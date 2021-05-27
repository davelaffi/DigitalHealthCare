import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-verify-mail-address',
  templateUrl: './verify-mail-address.component.html',
  styleUrls: ['./verify-mail-address.component.css']
})
export class VerifyMailAddressComponent implements OnInit {

  public currentUser : any;

  constructor(public firebaseService : AuthService) { }

  ngOnInit(): void {
    const userToConvert = localStorage.getItem('user');
    this.currentUser = userToConvert !== null ? JSON.parse(userToConvert) : "";
  }

  sendVerificationAgain(){
    
    
  }

}
