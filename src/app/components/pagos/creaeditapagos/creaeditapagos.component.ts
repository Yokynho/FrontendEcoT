import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import path from 'path';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Pagos } from '../../../models/Pagos';
import { PagosService } from '../../../services/pagos.service';
import { Params, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Cotizaciones } from '../../../models/Cotizaciones';
import { CotizacionesService } from '../../../services/cotizaciones.service';

@Component({
  selector: 'app-creaeditapagos',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatInputModule,
            MatSelectModule,
            MatDatepickerModule,
            MatButtonModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            CommonModule,
            FormsModule
  ],
  templateUrl: './creaeditapagos.component.html',
  styleUrl: './creaeditapagos.component.css'
})
export class CreaeditapagosComponent implements OnInit{
  form:FormGroup=new FormGroup({});
  pagos:Pagos=new Pagos();
  id:number=0;
  edicion:boolean=false;
  precio:number=0
  listaCotizacion:Cotizaciones[]=[];


  listaEstados: { value: String; viewValue: string }[] = [
    { value: 'M', viewValue: 'M' },
    { value: 'G', viewValue: 'G' },
    { value: 'L', viewValue: 'L' },
  ];

  constructor(
    private formBuilder:FormBuilder,
    private pS:PagosService,
    private cS:CotizacionesService,
    private router:Router,
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form=this.formBuilder.group({
      hcodigo:new FormControl(''),
      hmonto:new FormControl('',Validators.required),
      hfecha:new FormControl({ value: new Date(), disabled: true }, Validators.required),
      hcotiza:new FormControl('',Validators.required)
    });
    this.cS.list().subscribe((data)=>{
      this.listaCotizacion=data;
    });

    

  }
  insertar():void{
    if(this.form.valid){
      this.pagos.idPagos=this.form.value.hcodigo
      this.pagos.estado='Pagado'
      this.pagos.fecha_pago=this.form.get('hfecha')?.value
      this.pagos.monto=this.form.value.hmonto
      this.pagos.cotizacion.idCotizaciones=this.form.value.hcotiza

      if(this.edicion){
        this.pS.update(this.pagos).subscribe((data)=>{
          this.pS.list().subscribe((data)=>{
            this.pS.setList(data);
          });
        });
      } else {
        this.pS.insert(this.pagos).subscribe(data=>{
          this.pS.list().subscribe(data=>{
            this.pS.setList(data)
          });
        });
      }
    }
    this.router.navigate(['/home/pagos'])
  }
  init(){
    if(this.edicion){
      this.pS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          hcodigo: new FormControl(data.idPagos),
          hmonto: new FormControl(data.monto),
          hfecha_pago: new FormControl(data.fecha_pago),
          hcotiza: new FormControl(data.cotizacion.idCotizaciones),
        });
      });
    }
  }


}
