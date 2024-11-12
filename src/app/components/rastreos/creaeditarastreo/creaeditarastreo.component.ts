import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Vehiculos } from '../../../models/Vehiculos';
import { Rastreos } from '../../../models/Rastreos';
import { vehiculosService } from '../../../services/vehiculos.service';
import { RastreosService } from '../../../services/rastreos.service';
import { ActivatedRoute, Router, Params} from '@angular/router';

@Component({
  selector: 'app-creaeditarastreo',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatInputModule,
            MatSelectModule,
            MatDatepickerModule,
            MatButtonModule,
            ReactiveFormsModule,
            CommonModule,
            FormsModule,
  ],
  templateUrl: './creaeditarastreo.component.html',
  styleUrl: './creaeditarastreo.component.css'
})
export class CreaeditarastreoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  id: number = 0;
  edicion: boolean = false;

  listaVehiculos: Vehiculos[]=[];
  listaEstado: { value: String; viewValue: string }[] = [
    { value: 'M', viewValue: 'M' },
    { value: 'G', viewValue: 'G' },
    { value: 'L', viewValue: 'L' },
  ];

  rastreo:Rastreos= new Rastreos()

  constructor(private formBuilder: FormBuilder,
              private vS: vehiculosService,
              private rS: RastreosService,
              private router:Router,
              private route: ActivatedRoute

  ){ }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      hcodigo: [''],
      hfechaSalida: ['', Validators.required],
      hfechaLlegada: ['', Validators.required],
      hestado: ['', Validators.required],
      hubicacion: ['', Validators.required],
      hvehiculo: ['', Validators.required],
    });
    this.vS.list().subscribe((data)=>{
      this.listaVehiculos=data;
    });
  }

  insertar():void{
    if(this.form.valid){
      this.rastreo.idRastreos=this.form.value.hcodigo
      this.rastreo.fecha_salida=this.form.value.hfechaSalida
      this.rastreo.fecha_llegada=this.form.value.hfechaLlegada
      this.rastreo.estado=this.form.value.hestado
      this.rastreo.ubicacion_actual=this.form.value.hubicacion
      this.rastreo.ve.idVehiculos=this.form.value.hvehiculo
      if(this.edicion){
        this.rS.update(this.rastreo).subscribe((data)=>{
          this.rS.list().subscribe((data)=>{
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.rastreo).subscribe(data=>{
          this.rS.list().subscribe(data=>{
            this.rS.setList(data)
          });
        });
      }
    }
    this.router.navigate(['/distribuidor/rastreos'])
  }
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idRastreos),
          hfechaSalida: new FormControl(data.fecha_salida),
          hfechaLlegada: new FormControl(data.fecha_llegada),
          hestado: new FormControl(data.estado),
          hubicacion: new FormControl(data.ubicacion_actual),
          hvehiculo: new FormControl(data.ve.placa),
        });
      });
    }
  }
}
