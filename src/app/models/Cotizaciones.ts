import { Usuarios } from "./Usuarios"

export class Cotizaciones{
    idCotizaciones:number=0
    precio:number=0
    fecha_cotizacion:Date=new Date(Date.now())
    usuario:Usuarios=new Usuarios()
}