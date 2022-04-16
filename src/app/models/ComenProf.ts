export class ComProf{
    id?: string;
    usuario: string;
    nombre: string;
    universidad: string;
    carrera: string;
    materia:string;
    puntuacion: number;
    comentarios: string;


    constructor(usuario:string, nombre:string, universidad:string, carrera:string, materia:string, puntuacion:number,  comentarios:string){
        this.usuario=usuario;
        this.nombre=nombre;
        this.puntuacion=puntuacion;
        this.comentarios=comentarios;
        this.universidad=universidad;
        this.carrera=carrera;
        this.materia=materia;
    }
    
}