import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { Usuario } from '../models/Usuario';
import { RegUsuario } from '../Servicio_Usuario/Reg_Usuario';
import { Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-reg-usu',
  templateUrl: './reg-usu.component.html',
  styleUrls: ['./reg-usu.component.css']
})
export class RegUsuComponent implements OnInit {

  form: FormGroup;
  loading=false;
  repetido= false;
  mostrarC = false;
  listaCarreras:string[] = [];
  listaUsuario:string[] = [];


  constructor(private router: Router, private fb: FormBuilder,
              private _Usuario: RegUsuario,private firebase: AngularFirestore, private Cookie: CookieService) {
    this.form=this.fb.group({
      Correo: [''],
      Nombre: [''],
      contraseña: [''],
      universidad: [''],
      carrera: ['']
    });
   }

  ngOnInit(): void {
    this.CargarUSu();
  }

  crearUsu(){
    this.repetido=this.ComprobarUsu();
    console.log(this.repetido);
    console.log("has salido de comprobar Usu");
    if(this.repetido){
      alert("Correo ya existente, introduzca otro");
    }else{
      if(this.form.value.universidad != "UC3M" 
    && this.form.value.universidad != "UPM" 
    && this.form.value.universidad != "UCM"
    && this.form.value.universidad != "Rey Juan Carlos"){
      alert("Inserte una universidad valida");
      }else{
        const Usu: Usuario={
          nombre: this.form.value.Nombre,
          contraseña: this.form.value.contraseña,
          correo: this.form.value.Correo,
          universidad: this.form.value.universidad,
          carrera: this.form.value.carrera
        };
  
        this.loading=true;
        this._Usuario.guardarUsuario(Usu).then(() => {
          this.loading=false;
          console.log("todo correcto");
          this.form.reset();
          this.Cookie.set('loggeado',this.form.value.Correo);
        });
        this.router.navigate(['Pag']);

    }

    }
    
  }



  ActualizarCheckBox(){
    console.log("cambio");
    this.mostrarC=true;
    this.ObtenerCarrerasF();
  }

  CargarUSu(){
    console.log("cargado usuarios")
    this.firebase.collection('usuarios').snapshotChanges().subscribe(doc =>{
      doc.forEach((element:any)=>{
        let cosa = element.payload._delegate.doc._document.data.value.mapValue.fields
        this.listaUsuario.push(cosa.correo.stringValue);
      })
    })

  }

  ComprobarUsu(){
    console.log("Has entrado");
    console.log(this.listaUsuario);
    console.log(this.form.value.Correo);
    if(this.listaUsuario.includes(this.form.value.Correo)){
      return true;
    }
    return false;
  }
  

  ObtenerCarrerasF(){
    if(this.form.value.universidad != "UC3M" 
    && this.form.value.universidad != "UPM" 
    && this.form.value.universidad != "UCM"
    && this.form.value.universidad != "Rey Juan Carlos"){

      this.listaCarreras.push("Escriba una carrera valida");
    }else{
      this.firebase.collection('Universidades').snapshotChanges().subscribe(doc =>{
        this.listaCarreras = [];
        doc.forEach((element:any)=>{
          let cosa = element.payload._delegate.doc._document.data.value.mapValue.fields
          for(let k in cosa){
            if(k==this.form.value.universidad)
            cosa[k].arrayValue.values.forEach((elemento1 : any) =>{
              this.listaCarreras.push(elemento1.stringValue);
            });
          }
        })
      })
    }
    
    
  }

}
