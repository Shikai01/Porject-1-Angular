import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder,FormGroup } from '@angular/forms';
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-visitar-pagina',
  templateUrl: './visitar-pagina.component.html',
  styleUrls: ['./visitar-pagina.component.css']
})
export class VisitarPaginaComponent implements OnInit {
  m_pop = false;
  m_pop2 = false;
  m_nuevo=false;
  m_nuevon=true;
  uni:any;
  carr: any;
  prof: any;
  nombreP:any;
  form: FormGroup;

  listaMaterias:string[] = [];
  listaProf:string[] = [];

  constructor(private router: Router,private firebase: AngularFirestore, private route: ActivatedRoute,private fb: FormBuilder) {
    this.form=this.fb.group({
      nombreP: [''],
      materiaP: [''],
      nombreM: [''],
      materiaM: [''],
    });
   }

  ngOnInit(){
    this.uni = this.route.snapshot.paramMap.get('uni');
    this.carr = this.route.snapshot.paramMap.get('carr');
    if(this.uni==null){
      this.m_nuevo=true;
      this.m_nuevon=false;
    }
    this.nombreP=  String(this.uni) + String(this.carr)+"P"


    this.firebase.collection(this.nombreP).snapshotChanges().subscribe(doc =>{
      this.listaProf = [];
      doc.forEach((element:any)=>{
        let cosa=element.payload._delegate.doc._document.data.value.mapValue.fields.Nombre.stringValue
        if( this.listaProf.indexOf(cosa)==-1){
          this.listaProf.push(cosa);
          this.listaMaterias.push(element.payload._delegate.doc._document.data.value.mapValue.fields.Materia.stringValue);
        }
        
      })
    })
  }


  activarpop(){
    this.m_pop=true;
  }

  cerrarpop(){
    this.m_pop=false;
  }

  activarpop2(){
    this.m_pop2=true;
  }

  cerrarpop2(){
    this.m_pop2=false
  }

  crearMat(){
    const Usu={
      Nombre: this.form.value.nombreM,
      Materia: this.form.value.materiaM
    };
    
    this.firebase.collection(this.nombreP).add(Usu).then(() => {
      console.log("todo correcto")
      window.location.reload();
    }) ;
  }


  crearProf(){
    const Usu={
      Nombre: this.form.value.nombreP,
      Materia: this.form.value.materiaP
    };
    
    this.firebase.collection(this.nombreP).add(Usu).then(() => {
      console.log("todo correcto")
      window.location.reload();
    }) ;
  }

  ComentarProf(nombre:string){
    this.router.navigate(['EProf',this.uni,this.carr,nombre]);
  }

  ComentarMat(nombre:string){
    this.router.navigate(['EMat',this.uni,this.carr,nombre]);
  }

}
