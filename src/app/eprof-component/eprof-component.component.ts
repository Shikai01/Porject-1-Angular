import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ComProf } from '../models/ComenProf';
import { Reg_ComProf } from '../Servicio_Usuario/Reg_ComProf';
import { CookieService } from 'ngx-cookie-service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-eprof-component',
  templateUrl: './eprof-component.component.html',
  styleUrls: ['./eprof-component.component.css']
})
export class EProfComponentComponent implements OnInit {
  form: FormGroup;
  loading=false;

  prof:any;
  uni:any;
  carr:any;
  puntuacion:any;
  usuario="";
  nombreP:any;
  m_pop2 = false;


  listaComentarios:string[]=[];
  listaNombresComentarios :string[] =[];
  listaPuntuacionComentarios: number[] = [];
  listaProf:string[] = [];
  puntuacionAcumulada=0;
  

  constructor(private router: Router,private route: ActivatedRoute,private fb: FormBuilder,private _comentario: Reg_ComProf,private firebase: AngularFirestore
    ,private Cookie: CookieService) {
      this.form=this.fb.group({
        puntuacion: [0],
        comentarios: [''],
        materia: ['']
      });
   }

   
  ngOnInit(){
    this.uni = this.route.snapshot.paramMap.get('uni');
    this.carr = this.route.snapshot.paramMap.get('carr');
    this.prof = this.route.snapshot.paramMap.get('prof');
    this.usuario = this.Cookie.get("loggeado");
    if(this.usuario==undefined || this.usuario==""){
      this.usuario="Visitante";
    }

    this.firebase.collection("comProf").snapshotChanges().subscribe(doc =>{
      this.listaComentarios = [];
      doc.forEach((element:any)=>{
        let cosa=element.payload._delegate.doc._document.data.value.mapValue.fields;
        if(cosa.nombre.stringValue==this.prof ){
             this.listaComentarios.push(cosa.comentarios.stringValue);
             this.listaNombresComentarios.push(cosa.usuario.stringValue);
             this.listaPuntuacionComentarios.push(cosa.puntuacion.integerValue);
           }
        

      })

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
        let cosa=element.payload._delegate.doc._document.data.value.mapValue.fields.Nombre.stringValue
        if( this.listaProf.indexOf(cosa)==-1 && cosa==this.prof){
          this.listaProf.push(element.payload._delegate.doc._document.data.value.mapValue.fields.Materia.stringValue);
        }
      })
    })

    
  }




  crearComent(){
    const coment: ComProf={
      usuario: this.usuario,
      nombre: this.prof,
      materia: this.form.value.materia,
      puntuacion: this.form.value.puntuacion,
      comentarios: this.form.value.comentarios,
      universidad: this.uni,
      carrera: this.carr
    };

    this.loading=true;
    
    this._comentario.guardarComentarioProf(coment).then(() => {
      this.loading=false;
      console.log("todo correcto")
      this.form.reset();
    }) ;
  }


  crearMat(){
    const Usu={
      Materia: this.form.value.materia,
      Prof: this.prof
    };
    
    this.firebase.collection(this.nombreP).add(Usu).then(() => {
      window.location.reload();
    }) ;
  }

  activarForm(){
    this.m_pop2=true;
  }

  IrMat(prof:string){
    this.router.navigate(['EMat',this.uni,this.carr,prof]);
  }

  cerrarpop2(){
    this.m_pop2=false;
  }

}
