import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { HomeComponent } from './home/home.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { ListPatientsComponent } from './list-patient/list-patient.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './pipes/filter.pipe';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { SignUpComponent } from './LoginAndRegistration/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './LoginAndRegistration/forgot-password/forgot-password.component';
import { SignInComponent } from './LoginAndRegistration/sign-in/sign-in.component';
import { VerifyMailAddressComponent } from './LoginAndRegistration/verify-mail-address/verify-mail-address.component';
import { AuthService } from './service/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { EmergenzaCovidComponent } from './emergenza-covid/emergenza-covid.component';
import { TipologiaFilter } from './pipes/tipologiaFilter';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewPatientComponent,
    routingComponents,
    ListPatientsComponent,
    FilterPipe,
    TipologiaFilter,
    MyProfileComponent,
    PatientProfileComponent,
    SignUpComponent,
    SignInComponent,
    VerifyMailAddressComponent,
    ForgotPasswordComponent,
    EmergenzaCovidComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgbModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
