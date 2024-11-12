import { Vehiculos } from "./Vehiculos"

export class Rastreos{
    idRastreos:number=0
    fecha_salida:Date=new Date(Date.now())
    fecha_llegada:Date=new Date(Date.now())
    estado:string=""
    ubicacion_actual:string=""
    ve:Vehiculos=new Vehiculos();
}