import { Pagos } from "./Pagos"
import { Usuarios } from "./Usuarios"

export class MetodosPago{
    idMetodosPago:number=0
    nombre:string=""
    descripcion:string=""
    pagos: Pagos = new Pagos();
    usuario: Usuarios = new Usuarios();
}

