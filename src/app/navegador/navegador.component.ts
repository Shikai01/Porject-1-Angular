import { Component, OnInit } from '@angular/core';
import {CarrerasUniversitarias } from '../Servicio_Usuario/Universidades';

@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.css']
})
export class NavegadorComponent implements OnInit {
  listaUniversidades:string[] =[];
  listaCarreras:string[] = [];
  cosa:any;
  diccionario={};

  constructor(private _carreras: CarrerasUniversitarias) { }

  ngOnInit(): void {
    this.ObtenerCarrerasF();
  }

  ObtenerCarrerasF(){
    this._carreras.obtenerCarreras().subscribe(doc =>{
      this.listaCarreras = [];
      this.listaUniversidades=[];
      doc.forEach((element:any)=>{
        this.cosa = element.payload._delegate.doc._document.data.value.mapValue.fields
        for(let k in this.cosa){
          this.listaUniversidades.push(k);
          this.cosa[k].arrayValue.values.forEach((elemento1 : any) =>{
            this.listaCarreras.push(elemento1);
          });
        }
      })
    })
    
  }

}
