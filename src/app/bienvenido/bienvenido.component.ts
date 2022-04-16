import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

  usuario='Visitante';
  mostrar_loggout = false;
  mostrar_reg=true;

  constructor(private Cookie: CookieService,private router: Router) { }

  ngOnInit(): void {
    if(this.Cookie.get("loggeado")!=undefined && this.Cookie.get("loggeado")!=""){
      this.usuario=this.Cookie.get("loggeado");
      this.mostrar_loggout=true;
      this.mostrar_reg=false;
    }else{
      this.usuario="Visitante";
      this.mostrar_loggout=false;
      this.mostrar_reg=true;
    }
  }

  salir(){
    sessionStorage.clear();
    localStorage.clear();
    this.Cookie.deleteAll();
    this.router.navigate(['']);

  }

  cargar(){
    if(this.Cookie.get("loggeado")!=undefined){
      this.usuario=this.Cookie.get("loggeado");
      this.mostrar_loggout=true;
    }else{
      this.usuario="Visitante";
    }
  }
}
