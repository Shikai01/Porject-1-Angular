import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder,FormGroup} from '@angular/forms';
import { ComMat } from '../models/ComenMat';
import { RegMat } from '../Servicio_Usuario/Reg_ComMat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-emat-component',
  templateUrl: './emat-component.component.html',
  styleUrls: ['./emat-component.component.css']
})
export class EMatComponentComponent implements OnInit {

  uni:any;
  carr:any;
  mat:any;
  puntuacion:any;
  usuario="";
  form: FormGroup;
  loading=false;
  nombreP:any;
  m_pop2 = false;

  listaComentarios:string[]=[];
  listaNombresComentarios :string[] =[];
  listaPuntuacionComentarios: number[] = [];
  listaProf:string[] = [];
  puntuacionAcumulada=0;

  constructor(private router: Router,private route: ActivatedRoute,private fb: FormBuilder,private _comentario: RegMat, private firebase: AngularFirestore
    ,private Cookie: CookieService) {
    this.form=this.fb.group({
      puntuacion: [0],
      comentarios: [''],
      nombreP: ['']
    });
  }

  ngOnInit(){
    this.uni = this.route.snapshot.paramMap.get('uni');
    this.carr = this.route.snapshot.paramMap.get('carr');
    this.mat = this.route.snapshot.paramMap.get('mat');
    this.usuario = this.Cookie.get("loggeado");
    console.log("El usuario es:")
    console.log(this.usuario);
    if(this.usuario==undefined || this.usuario==""){
      this.usuario="Visitante";
    }

    this.firebase.collection("comMat").snapshotChanges().subscribe(doc =>{
      this.listaComentarios = [];
      doc.forEach((element:any)=>{
        let cosa=element.payload._delegate.doc._document.data.value.mapValue.fields;
        if(cosa.materia.stringValue==this.mat &&
           cosa.carrera.stringValue==this.carr &&
           cosa.universidad.stringValue==this.uni){
             this.listaComentarios.push(cosa.comentarios.stringValue);
             this.listaNombresComentarios.push(cosa.usuario.stringValue);
             this.listaPuntuacionComentarios.push(cosa.puntuacion.integerValue);
           }
        

      })
      console.log(this.listaPuntuacionComentarios.length);
      console.log(this.listaPuntuacionComentarios);
      for (var a=0; a<this.listaPuntuacionComentarios.length; a++){
        this.puntuacionAcumulada=this.puntuacionAcumulada + Number(this.listaPuntuacionComentarios[a]);
      }
      this.puntuacion= this.puntuacionAcumulada/this.listaPuntuacionComentarios.length;
      if(isNaN(this.puntuacion)){
        this.puntuacion=0;
      }
    })



    this.nombreP=this.uni+this.carr+"P";
    this.firebase.collection(this.nombreP).snapshotChanges().subscribe(doc =>{
      this.listaProf = [];
      doc.forEach((element:any)=>{
        let cosa=element.payload._delegate.doc._document.data.value.mapValue.fields.Materia.stringValue
        if( this.listaProf.indexOf(cosa)==-1 && cosa==this.mat){
          this.listaProf.push(element.payload._delegate.doc._document.data.value.mapValue.fields.Nombre.stringValue);
        }
      })
    })
    
  }


  crearComent(){
    const coment: ComMat={
      usuario: this.usuario,
      materia: this.mat,
      puntuacion: this.form.value.puntuacion,
      comentarios: this.form.value.comentarios,
      universidad: this.uni,
      carrera: this.carr
    };

    this.loading=true;
    
    this._comentario.guardarComentarioMat(coment).then(() => {
      this.loading=false;
      window.location.reload();
      
    }) ;
  }

  crearProf(){
    const Usu={
      Nombre: this.form.value.nombreP,
      Materia: this.mat
    };
    
    this.firebase.collection(this.nombreP).add(Usu).then(() => {
      window.location.reload();
    }) ;
  }

  activarForm(){
    this.m_pop2=true;
  }

  IrProf(prof:string){
    this.router.navigate(['EProf',this.uni,this.carr,prof]);
  }

  cerrarpop2(){
    this.m_pop2=false;
  }
}


