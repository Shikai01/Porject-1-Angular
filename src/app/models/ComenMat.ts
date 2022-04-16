export class ComMat{
    id?: string;
    usuario: string;
    materia: string;
    universidad: string;
    carrera: string;
    puntuacion: number;
    comentarios: string;


    constructor(usuario:string, materia:string, universidad:string, carrera:string, puntuacion:number,  comentarios:string){
        this.usuario=usuario;
        this.materia=materia;
        this.puntuacion=puntuacion;
        this.comentarios=comentarios;
        this.universidad=universidad;
        this.carrera=carrera;
    }
    
}