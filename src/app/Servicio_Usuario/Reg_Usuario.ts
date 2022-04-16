import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Usuario } from "../models/Usuario";

@Injectable({
    providedIn: 'root'
})

export class RegUsuario{

    constructor(private firebase: AngularFirestore){ }

    guardarUsuario( Usus: Usuario): Promise<any> {
        return  this.firebase.collection('usuarios').add(Usus);
    }

}