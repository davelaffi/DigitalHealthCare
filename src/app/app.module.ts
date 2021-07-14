import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { HomeComponent } from './home-doctor/home-doctor.component';
import { NewPatientComponent } from './new-patient-doctor/new-patient-doctor.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { ListPatientsComponent } from './list-patient-doctor/list-patient-doctor.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './pipes/filter.pipe';
import { MyProfileComponent } from './my-profile-doctor/my-profile-doctor.component';
import { PatientProfileComponent } from './patient-profile-doctor/patient-profile-doctor.component';
import { SignUpComponent } from './LoginAndRegistration/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './LoginAndRegistration/forgot-password/forgot-password.component';
import { SignInComponent } from './LoginAndRegistration/sign-in/sign-in.component';
import { VerifyMailAddressComponent } from './LoginAndRegistration/verify-mail-address/verify-mail-address.component';
import { AuthService } from './service/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { EmergenzaCovidComponent } from './emergenza-covid-doctor/emergenza-covid-doctor.component';
import { TipologiaFilter } from './pipes/tipologiaFilter';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HomeVolontarioComponent } from './home-volontario/home-volontario.component';
import { MyProfileVolunteerComponent } from './my-profile-volunteer/my-profile-volunteer.component';
import { EmergenzaCovidVolunteerComponent } from './emergenza-covid-volunteer/emergenza-covid-volunteer.component';
import { ListPatientVolunteerComponent } from './list-patient-volunteer/list-patient-volunteer.component';
import { PatientProfileVolunteerComponent } from './patient-profile-volunteer/patient-profile-volunteer.component';
import { AddNewPatientVolunteerComponent } from './add-new-patient-volunteer/add-new-patient-volunteer.component';



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
    EmergenzaCovidComponent,
    HomeVolontarioComponent,
    MyProfileVolunteerComponent,
    EmergenzaCovidVolunteerComponent,
    ListPatientVolunteerComponent,
    PatientProfileVolunteerComponent,
    AddNewPatientVolunteerComponent,
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
    BsDatepickerModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
