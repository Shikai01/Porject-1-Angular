import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ComMat } from "../models/ComenMat";

@Injectable({
    providedIn: 'root'
})

export class RegMat{

    constructor(private firebase: AngularFirestore){ }

    guardarComentarioMat( Com: ComMat): Promise<any> {

        return  this.firebase.collection('comMat').add(Com);
    }

}