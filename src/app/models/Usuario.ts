export class Usuario{
    id?: string;
    nombre: string;
    contraseña: string;
    correo: string;
    universidad: string;
    carrera: string;


    constructor(nombre:string, contraseña:string, universidad:string, carrera:string, correo:string){
        this.nombre=nombre;
        this.contraseña=contraseña;
        this.correo=correo;
        this.universidad=universidad;
        this.carrera=carrera;
    }
    
}