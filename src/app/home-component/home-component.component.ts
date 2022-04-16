import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  form: FormGroup;
  repetido= false;
  Existe=false;
  listaUsuario:string[] = [];

  constructor(private router: Router, private fb: FormBuilder,private firebase: AngularFirestore,private Cookie: CookieService) {
    this.form=this.fb.group({
    correo: [''],
    contraseña: ['']
  });
}

  ngOnInit(): void {
    this.CargarUSu();
  }
  viajarSinRegistrarse(){
    this.router.navigate(['Pag'])
  }

  checkUsu(){
    this.ObtenerUsuario();
    this.repetido=this.ComprobarUsu();
    console.log(this.repetido);
    console.log(this.Existe);
    if(this.repetido){
      alert("Usuario no existente");
      console.log(this.listaUsuario);
      
    }else{
      this.router.navigate(['Pag'])
      this.Cookie.set('loggeado',this.form.value.correo)
    }
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
    console.log(this.form.value.correo);
    if(this.listaUsuario.includes(this.form.value.correo)){
      return false;
    }
    return true;
  }



  ObtenerUsuario(){
    this.repetido=this.ComprobarUsu();
    this.firebase.collection('usuarios').snapshotChanges().subscribe(doc =>{
      doc.forEach((element:any)=>{
        let cosa = element.payload._delegate.doc._document.data.value.mapValue.fields
        console.log(cosa.correo);
        if(cosa.correo.stringValue==this.form.value.correo && cosa.contraseña.stringValue==this.form.value.contraseña){
          this.Existe=true;
        }
      })
    })
  }
    
    
  
}
