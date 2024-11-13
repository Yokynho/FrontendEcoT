import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { Quejas } from '../../../models/Quejas';
import { Reportes } from '../../../models/Reportes';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReportesService } from '../../../services/reportes.service';
import { QuejasService } from '../../../services/quejas.service';

@Component({
  selector: 'app-creaeditareporte',
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
  templateUrl: './creaeditareporte.component.html',
  styleUrl: './creaeditareporte.component.css'
})
export class CreaeditareporteComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  id: number = 0;
  edicion: boolean = false;
  listaQuejas: Quejas[]=[];
  listaTipos: { value: String; viewValue: string }[] = [
    { value: 'Resuelto', viewValue: 'Resuelto' },
    { value: 'En proceso', viewValue: 'En proceso' },
    { value: 'Rechazada', viewValue: 'Rechazada' },
    { value: 'Pendiente', viewValue: 'Pendiente' },
    { value: 'No aplicable', viewValue: 'No aplicable' },
    { value: 'Escalado a superior', viewValue: 'Escalado a superior' },
    { value: 'Solucionado parcialmente', viewValue: 'Solucionado parcialmente' },
    { value: 'Investigacion en curso', viewValue: 'Investigacion en curso' },
    { value: 'Esperando respuesta del cliente', viewValue: 'Esperando respuesta del cliente' },
    { value: 'Aprobado', viewValue: 'Aprobado' },
    { value: 'Reembolso', viewValue: 'Reembolso' },
    { value: 'En espera de accion', viewValue: 'En espera de accion' },
    { value: 'Cerrado', viewValue: 'Cerrado' },
    { value: 'Revisado', viewValue: 'Revisado' },
  ];
  reportes:Reportes=new Reportes();
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private rS:ReportesService,
    private qS: QuejasService
  ){}

  
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      hcodigo: new FormControl(''),
      htitulo: new FormControl('', Validators.required),
      hdescripcion: new FormControl('', Validators.required),
      hfecha: new FormControl({ value: new Date(), disabled: true }, Validators.required),
      htipo: new FormControl('', Validators.required),
      hrespuesta: new FormControl('', Validators.required),
      hqueja: new FormControl('', Validators.required),
    });
    this.qS.list().subscribe((data)=>{
      this.listaQuejas=data;
    });
  }


  insertar():void{
    if(this.form.valid){
      this.reportes.idReportes=this.form.value.hcodigo
      this.reportes.titulo=this.form.value.htitulo
      this.reportes.descripcion=this.form.value.hdescripcion
      this.reportes.fecha_creacion=this.form.get('hfecha')?.value
      this.reportes.tipo=this.form.value.htipo
      this.reportes.respuesta=this.form.value.hrespuesta
      this.reportes.quejas.idQuejas=this.form.value.hqueja

      if(this.edicion){
        this.rS.update(this.reportes).subscribe((data)=>{
          this.rS.list().subscribe((data)=>{
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.reportes).subscribe(data=>{
          this.rS.list().subscribe(data=>{
            this.rS.setList(data)
          });
        });
      }
    }
    this.router.navigate(['reportes'])
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idReportes),
          htitulo: new FormControl(data.titulo),
          hdescripcion: new FormControl(data.descripcion),
          hfecha: new FormControl(data.fecha_creacion),
          htipo: new FormControl(data.tipo),
          hrespuesta: new FormControl(data.respuesta),
          hqueja: new FormControl(data.quejas.idQuejas),
        });
      });
    }
  }

}
