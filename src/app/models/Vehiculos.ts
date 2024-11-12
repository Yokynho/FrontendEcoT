import { Usuarios } from "./Usuarios";

export class Vehiculos
{
    idVehiculos:number=0
    placa:String=""
    modelo:String=""
    marca:String=""
    capacidad_carga:number=0
    estado:String=""
    fecha_inscripcion:Date=new Date(Date.now())
    usuario:Usuarios=new Usuarios()

}