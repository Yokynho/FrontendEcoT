export class Usuarios{
    idUsuarios:number=0
    dni:number=0
    nombre:string=""
    direccion:string=""
    telefono:string=""
    fecha_registro:Date=new Date(Date.now())

    enabled:boolean=false
    username:string=""
    password:string=""
}