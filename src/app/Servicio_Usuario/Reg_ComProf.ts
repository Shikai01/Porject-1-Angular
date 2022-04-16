import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ComProf } from "../models/ComenProf";

@Injectable({
    providedIn: 'root'
})

export class Reg_ComProf{

    constructor(private firebase: AngularFirestore){ }

    guardarComentarioProf( Com: ComProf): Promise<any> {

        return  this.firebase.collection('comProf').add(Com);
    }

}