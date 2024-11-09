import { Quejas } from "./Quejas"

export class Reportes{
    idReportes:number=0
    titulo:string=""
    descripcion:string =""
    fecha_creacion:Date=new Date(Date.now())
    tipo:string =""
    respuesta:string =""
    quejas:Quejas = new Quejas();
}