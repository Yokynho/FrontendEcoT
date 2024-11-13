import { Usuarios } from "./Usuarios"

export class Quejas{
    idQuejas:number=0
    titulo:string=""
    descripcion:string=""
    fecha_creacion:Date=new Date(Date.now())
    tipo:string=""
    usuario:Usuarios=new Usuarios();
}