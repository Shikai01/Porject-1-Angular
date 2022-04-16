import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
    providedIn: 'root'
})


export class CarrerasUniversitarias {
  constructor(private firebase: AngularFirestore) { }

  obtenerCarreras():Observable<any>{
    return this.firebase.collection('Universidades').snapshotChanges();
  }

}