import{Cotizaciones}from "./Cotizaciones"
export class Pagos{
    idPagos:number=0
    monto:number=0
    fecha_pago:Date=new Date(Date.now())
    estado:string=""
    cotizacion:Cotizaciones=new Cotizaciones()
}