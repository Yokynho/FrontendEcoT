import { Usuarios } from './Usuarios';
import { Controles } from './Controles';

export class Lotes{
  idLotes: number=0
  nombre:string =""
  tipo_cultivo:string =""
  fecha_siembra:Date=new Date(Date.now())
  estado:string=""
  cantidad:number=0
  usuario:Usuarios=new Usuarios();
  controles:Controles=new Controles();
}
