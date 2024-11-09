import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import path from 'path';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Pagos } from '../../../models/Pagos';
import { PagosService } from '../../../services/pagos.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-creaeditapagos',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [],
  templateUrl: './creaeditapagos.component.html',
  styleUrl: './creaeditapagos.component.css'
})
export class CreaeditapagosComponent implements OnInit{
  form:FormGroup=new FormGroup({});
  pagos:Pagos=new Pagos();
  id:number=0;
  edicion:boolean=false;
  hide=signal(true);
  listaPagos:Pagos[]=[];
  constructor(
    private formBuilder:FormBuilder,
    private pS:PagosService,
    //private cS:CotizacionesService,
    private router:Router,
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
      this.form=this.formBuilder.group({
        hcodigo:[''],
        hmonto:['',Validators.required],
        hfecha_pago:['',Validators.required],
        hestado:['',Validators.required],
        hfecha_vencimiento:['',Validators.required]
      });
      this.pS.list().subscribe((data)=>{
        this.listaPagos=data;
      });
  }
  insertar():void{
    if(this.form.valid){
      this.pagos.idPagos=this.form.value.hcodigo
      this.pagos.estado=this.form.value.hestado
      this.pagos.fecha_pago=this.form.value.hfecha_pago
      this.pagos.fecha_vencimiento=this.form.value.hfecha_vencimiento
      this.pagos.monto=this.form.value.hmonto
      this.pS.insert(this.pagos).subscribe(data=>{
        this.pS.list().subscribe(data=>{
          this.pS.setList(data)
        })
      })
      this.router.navigate(['pagos'])
    }
  }
  init(){
    if(this.edicion){
      this.pS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          hcodigo: new FormControl(data.idPagos),
          hmonto: new FormControl(data.monto),
          hfecha_pago: new FormControl(data.fecha_pago),
          hestado: new FormControl(data.estado),
          hfecha_vencimiento: new FormControl(data.fecha_vencimiento),
        });
      });
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
