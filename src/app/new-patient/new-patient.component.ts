import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Patient } from '../models/patient';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css']
})
export class NewPatientComponent implements OnInit {

  controllerSection : number = 1;
  public CFfromHome : string = "";
  public patientAdded = false;
  isFirstTime = false;

  public ts = 1234;
  public patient : Patient;
  lastUpdateTS = 0;
  medicoCF = "";

  mySubs : Subscription[] = [];

  public patologieCroniche = [
    { id : 'allergieSai' , value : 'Allergie SAI (995.3)'},
    { id : 'cardiopatiaIschemica' , value : 'Cardiopatia ischemica (410* 414*)'},
    { id : 'IMApregresso' , value : 'IMA pregresso (412)'},
    { id : 'anurismiAorta' , value : 'Aneurismi: aorta (441*)'},
    { id : 'anurismiAltreParti' , value : 'Aneurismi: altre sedi (442*)'},
    { id : 'ipertensioneArteriosa' , value : 'Ipertensione arteriosa (401*-405*)'},
    { id : 'aritmieCardiache' , value : 'Aritmie cardiache (427*)'},
    { id : 'portatorePacemaker' , value : 'Portatore di pacemaker'},
    { id : 'malattieCerebrovascolari' , value : 'Malattie cerebrovascolari (430*-438*)'},
    { id : 'insuffRespiratioriaCronica' , value : 'Insuff. respiratoria cronaca (518.83)'},
    { id : 'diabete' , value : 'Diabete (250*)'},
    { id : 'patologieNeurologiche' , value : 'Patologie neurologiche (20* 326*)'},
    { id : 'epilessia' , value : 'Epilessia (345*)'},
    { id : 'patologiaOncologica' , value : 'Patologia oncologica (140*-239*)'},
    { id : 'insuffRenaleCronica' , value : 'Insuff. renale cronica (585)'},
    { id : 'traumiRecenti' , value : 'Traumi recenti (800*-859*)'},
    { id : 'epatiteVirale' , value : 'Epatite virale (070.*)'},
    { id : 'infezioneHIV' , value : 'Infezione HIV (0.42)'},
    { id : 'elementiDiSintesiFerromagnetici' , value : 'Elementi di sintesi ferromagnetici (RMN): protesi e/o impianti'},
    { id : 'terapiaAnticoagulante' , value : 'Terapia anticoagulante (warfarin/acenocumarolo) (B01AA03/B01AA07)'},
    { id : 'inibitoriTrombina' , value : 'Inibitori diretti Trombina (B01AE*)'},
    { id : 'antiaggregante' , value : 'Terapia antiaggregante (B01AC*)'},
    { id : 'terapiaInsulina' , value : 'Terapia con insulina (A10A*)'},
  ]

  public patologieInAttoElenco = [
    { id : 'cardiache' , value : 'Cardiache' },
    { id : 'ipertensioneArteriosa' , value : 'Ipertensione arteriosa' },
    { id : 'respiratorie' , value : 'Respiratorie' },
    { id : 'oculari' , value : 'Oculari' },
    { id : 'otorinolaingoriatiche' , value : 'Otorinolaingoriatiche' },
    { id : 'gastroenteriche' , value : 'Gastroenteriche' },
    { id : 'renali' , value : 'Renali' },
    { id : 'genitaliUrinarie' , value : 'Genitali-urinarie' },
    { id : 'cutanee' , value : 'Cutanee' },
    { id : 'muscoloScheletriche' , value : 'Muscolo-scheletriche' },
    { id : 'endocrineMetaboliche' , value : 'Endocrino-metaboliche' },
    { id : 'psichiatricoComportamentale' , value : 'Psichiatrico-comportamentale' },
  ]


  constructor(private firestore: AngularFirestore, public router : Router, public db : DatabaseService) { 
    this.patient = new Patient();

  }

  ngOnInit(): void {

    //Take CF from home
    const codiceFiscaleRaw = localStorage.getItem('CF');
    this.CFfromHome = codiceFiscaleRaw !== null ? JSON.parse(codiceFiscaleRaw) : "";
    localStorage.removeItem('CF');

    //Take if it is the first time you insert the patient
    const firstTime = localStorage.getItem('firstTime');
    this.isFirstTime = firstTime !== null ? JSON.parse(firstTime) : "";
    localStorage.removeItem('firstTime');

    //Take if you are starting from a different ts
    const lastUserDate = localStorage.getItem('lastUserDate');
    localStorage.removeItem('lastUserDate');

    //Take Medico CF who will add data
    const medicoCFraw = localStorage.getItem('medicoCF');
    this.medicoCF = medicoCFraw !== null ? JSON.parse(medicoCFraw) : "";
    localStorage.removeItem('medicoCF');

    this.patient.CF = this.CFfromHome;
    console.log(this.CFfromHome);

    //If you want it from scratch but already exists or if you want to start from a ts
    if(!this.isFirstTime){
      const collectionRef = this.firestore.collection('citizens').doc(this.CFfromHome);
      const collectionInstance = collectionRef.valueChanges();
      var sub = collectionInstance.subscribe(ss => {
        this.patient = this.db.createGeneralPatientFromSnapshot(ss);
        this.mySubs.push(sub);
        if(lastUserDate != null){
          this.lastUpdateTS = lastUserDate !== null ? JSON.parse(lastUserDate) : "";
          const collectionRef = this.firestore.collection('citizens').doc(this.CFfromHome).collection('data').doc(this.lastUpdateTS+"");
          const collectionInstance = collectionRef.valueChanges();
          var sub2 = collectionInstance.subscribe(ss => {
            this.patient = this.db.createPatientFromSnapshot(ss, this.patient);
            console.log(this.patient);
            console.log("Paziente dopo lastUserDate");
            this.mySubs.push(sub2);
          });
        }
      });
    }
    
  }

  addNewPatient(){

    console.log(this.patient);

    this.db.cancelSubscriptions(this.mySubs);
    
    if(this.isFirstTime == true){
      this.firestore.collection('citizens').doc(this.patient.CF).set({
        CF : "",
        nome: "",
        cognome: "",
        photoURL: "https://firebasestorage.googleapis.com/v0/b/digital-healthcare-it.appspot.com/o/profile_image%2FUnknown_person.jpg?alt=media&token=0807cbb4-d08a-461d-9006-44530fede5b2",
        CFMedico: this.medicoCF,
        CFVolontario: "",
      }).catch((error) => {
        window.alert(error)
      });
    }

    this.firestore.collection('citizens').doc(this.patient.CF).update({
      CF : this.patient.CF,
      nome: this.patient.nome,
      cognome: this.patient.cognome,
    }).then(res1 => {
      console.log("Paziente:");
      console.log(this.patient);
      this.firestore.collection('citizens').doc(this.patient.CF).collection('data').doc(Date.now().toString())
      .set({
        //Dati personali
        CF : this.patient.CF,
        nome: this.patient.nome,
        cognome: this.patient.cognome,
        sesso: this.patient.datiPersonali.sesso,
        dataNascita: this.patient.datiPersonali.dataNascita,
        comuneNascita: this.patient.datiPersonali.comuneNascita,
        indirizzoDomicilio: this.patient.datiPersonali.indirizzoDomicilio,
        CAP: this.patient.datiPersonali.CAP,
        comuneDomicilio: this.patient.datiPersonali.comuneDomicilio,
        telefono: this.patient.datiPersonali.telefono,
        email: this.patient.datiPersonali.email,
        pec: this.patient.datiPersonali.pec,
        provinciaNascita: this.patient.datiPersonali.provinciaNascita,
        provinciaDomicilio: this.patient.datiPersonali.provinciaDomicilio,

        //Dati inseriti dal medico
        codiceEsenzione  : this.patient.datiMedico.codiceEsenzione,
        retiPatologieAssistito : this.patient.datiMedico.retiPatologieAssistito,
        capacitaMotoriaAssistito : this.patient.datiMedico.capacitaMotoriaAssistito,
        attivitaLavorativa : this.patient.datiMedico.attivitaLavorativa,
        patologieCronicheRilevanti : this.patient.datiMedico.patologieCronicheRilevanti,
        organiMancanti : this.patient.datiMedico.organiMancanti,
        trapianti : this.patient.datiMedico.trapianti,
        rilevantiMalformazioni : this.patient.datiMedico.rilevantiMalformazioni,
        reazioniAvverseFarmaciAlimenti : this.patient.datiMedico.reazioniAvverseFarmaciAlimenti,
        allergieCutaneeRespiratorieSistemiche : this.patient.datiMedico.allergieCutaneeRespiratorieSistemiche,
        allergieVelenoImenotteri : this.patient.datiMedico.allergieVelenoImenotteri,
        protesi : this.patient.datiMedico.protesi,
        ausili : this.patient.datiMedico.ausili,
        terapieFarmacologicheCroniche : this.patient.datiMedico.terapieFarmacologicheCroniche,
        anamnesiFamigliari : this.patient.datiMedico.anamnesiFamigliari,
        fattoriRischio : this.patient.datiMedico.fattoriRischio,
        terapieFarmacologiche : this.patient.datiMedico.terapieFarmacologiche,
        vaccinazioni : this.patient.datiMedico.vaccinazioni,
        contattoCareGiver : this.patient.datiMedico.contattoCareGiver,
        telefonoCareGiver : this.patient.datiMedico.telefonoCareGiver,
        donazioneOrgani : this.patient.datiMedico.donazioneOrgani,
        patologieInAtto : this.patient.datiMedico.patologieInAtto,
        gravidanzeParti : this.patient.datiMedico.gravidanzeParti,
        altezza : this.patient.datiMedico.altezza,
        peso : this.patient.datiMedico.peso,
        pressioneArteriosa : this.patient.datiMedico.pressioneArteriosa,
        BMI : this.patient.datiMedico.BMI,
        ADI : this.patient.datiMedico.ADI,
        ADP : this.patient.datiMedico.ADP,
        gruppoSanguigno : this.patient.datiMedico.gruppoSanguigno,
        fattoreRH : this.patient.datiMedico.fattoreRH,

        //Dati inseriti dal volontario, inizializzazione
        numeroCartaIdentità : this.patient.datiVolontario.numeroCartaIdentita,
        comuneRilascio : this.patient.datiVolontario.comuneRilascio,
        dataScadenza : this.patient.datiVolontario.dataScadenza,
        contatto1 : this.patient.datiVolontario.contatto1,
        telefono1 : this.patient.datiVolontario.telefono1,
        contatto2 : this.patient.datiVolontario.contatto2,
        telefono2 : this.patient.datiVolontario.telefono2,
        viveSolo : this.patient.datiVolontario.viveSolo,
        areaUtenza : this.patient.datiVolontario.areaUtenza,
        servizioAssociazione : this.patient.datiVolontario.servizioAssociazione,

      }).then(async res => {
        
        console.log("Patient correctly added");
        this.patient = new Patient();
        this.patientAdded = true;
        await this.delay(2000);

        this.router.navigate(['home']);
      })

      }).catch((error) => {
        this.patientAdded = true;
        window.alert(error)
    })
  }

  delay(ms:number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  changeSectionGo(){
    this.controllerSection = this.controllerSection + 1;
    console.log(this.patient.datiPersonali.sesso)
  }

  changeSectionBack(){
    this.controllerSection = this.controllerSection -1;
  }


  registerCheckbox(e:any, value:string, array : string[]){

    var present = false

    for(var i=0; i<array.length; i++){
          if(array[i] == value){
            console.log(value);
            array.splice(i,1);
            present = true;
          }
        }
    console.log(value);
    if(!present){
      array.push(value);
    }
    console.log(array);
  }

  

}
