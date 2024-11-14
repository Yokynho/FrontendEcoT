import { Quejas } from "./Quejas"

export class Soluciones{
    idSoluciones:number=0
    titulo:string=""
    descripcion:string =""
    fecha_creacion:Date=new Date(Date.now())
    tipo:string =""
    respuesta:string =""
    quejas:Quejas = new Quejas();
}