import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
import { LoginService } from '../../../services/login.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

/*FUNCION DE VALIDACION FECHA INICIO > FIN */
export function startDateValidator(control: AbstractControl): ValidationErrors | null {
  const startDate = control.value;
  const endDate = control.parent ? control.parent.get('hfechaSalida')?.value : null;
  
  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    return { 'startDateInvalid': true };  
  }

  return null;  
}

/*FUNCION DE VALIDACION FECHA FIN < INICIO */

export function endDateValidator(control: AbstractControl): ValidationErrors | null {
  const endDate = control.value;
  const startDate = control.parent ? control.parent.get('hfechaLlegada')?.value : null;
  
  if (endDate && startDate && new Date(endDate) < new Date(startDate)) {
    return { 'endDateInvalid': true };  
  }

  return null;  
}
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
    { value: 'Pendiente', viewValue: 'Pendiente' },
    { value: 'En Proceso', viewValue: 'En Proceso' },
    { value: 'En Tránsito', viewValue: 'En Tránsito' },
    { value: 'Completado', viewValue: 'Completado' },
    { value: 'Fallido', viewValue: 'Fallido' },
    { value: 'Cancelado', viewValue: 'Cancelado' },
  ];

  username:string=''


  rastreo:Rastreos= new Rastreos()

  constructor(private formBuilder: FormBuilder,
              private vS: vehiculosService,
              private rS: RastreosService,
              private router:Router,
              private route: ActivatedRoute,
              private loginService:LoginService

  ){ }

  ngOnInit(): void {

    this.username=this.loginService.showUsername();

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      hcodigo: new FormControl(''),
      hfecha: this.formBuilder.group({
        hfechaSalida: ['', Validators.required],
        hfechaLlegada: ['', Validators.required],
      }, { validators: this.dateRangeValidator }),
      //hfechaSalida: new FormControl('', [Validators.required, startDateValidator]),
      //hfechaLlegada: new FormControl('', [Validators.required, endDateValidator]),
      hestado: new FormControl('', Validators.required),
      hubicacion: new FormControl('', Validators.required),
      hvehiculo: new FormControl('', Validators.required),
    });


    this.vS.listByUsername(this.username).subscribe((data)=>{
      this.listaVehiculos=data;
    });
  }

  getPhFechaGroup(): FormGroup {
    return this.form.get('hfecha') as FormGroup;
  }

  dateRangeValidator(group: AbstractControl): { [key: string]: any } | null {
    const start = group.get('hfechaSalida')?.value;
    const end = group.get('hfechaLlegada')?.value;
    return start && end && start > end ? { dateRangeInvalid: true } : null;
  }

  insertar():void{
    if(this.form.valid){
      this.rastreo.idRastreos=this.form.value.hcodigo
      //this.rastreo.fecha_salida=this.form.value.hfechaSalida
      //this.rastreo.fecha_llegada=this.form.value.hfechaLlegada
      const phfechaControl = this.form.get('hfecha');
      if (phfechaControl instanceof FormGroup) {
        this.rastreo.fecha_salida = phfechaControl.get('hfechaSalida')?.value;
        this.rastreo.fecha_llegada = phfechaControl.get('hfechaLlegada')?.value;
      }
      this.rastreo.estado=this.form.value.hestado
      this.rastreo.ubicacion_actual=this.form.value.hubicacion
      this.rastreo.ve.idVehiculos=this.form.value.hvehiculo
      if(this.edicion){
        this.rS.update(this.rastreo).subscribe((data)=>{
          this.rS.listByUsername(this.username).subscribe((data)=>{
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.rastreo).subscribe(data=>{
          this.rS.listByUsername(this.username).subscribe(data=>{
            this.rS.setList(data)
          });
        });
      }
    }
    this.router.navigate(['/home/rastreos'])
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
          hvehiculo: new FormControl(data.ve.idVehiculos),
        });
      });
    }
  }
}
