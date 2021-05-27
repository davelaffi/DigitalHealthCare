import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmergenzaCovidComponent } from './emergenza-covid/emergenza-covid.component';
import { HomeComponent } from './home/home.component';
import { ListPatientsComponent } from './list-patient/list-patient.component';
import { ForgotPasswordComponent } from './LoginAndRegistration/forgot-password/forgot-password.component';
import { SignInComponent } from './LoginAndRegistration/sign-in/sign-in.component';
import { SignUpComponent } from './LoginAndRegistration/sign-up/sign-up.component';
import { VerifyMailAddressComponent } from './LoginAndRegistration/verify-mail-address/verify-mail-address.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { AuthGuard } from './service/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/signIn', pathMatch: 'full' },
  { path:'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path:'newPatient', component: NewPatientComponent, canActivate: [AuthGuard]  },
  { path:'listPatient', component: ListPatientsComponent, canActivate: [AuthGuard]  },
  { path:'myProfile', component: MyProfileComponent, canActivate: [AuthGuard]  },
  { path:'listPatient/:patientCF', component : PatientProfileComponent, canActivate: [AuthGuard] },
  { path:'emergenzaCovid', component : EmergenzaCovidComponent, canActivate: [AuthGuard]},
  { path:'signUp', component : SignUpComponent },
  { path:'signIn', component : SignInComponent },
  { path:'forgotPassword', component : ForgotPasswordComponent },
  { path:'verifyMail', component : VerifyMailAddressComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  HomeComponent, NewPatientComponent, ListPatientsComponent, 
  MyProfileComponent, PatientProfileComponent, EmergenzaCovidComponent]