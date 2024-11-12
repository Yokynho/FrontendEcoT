import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuarios } from '../../../models/Usuarios';
import { Vehiculos } from '../../../models/Vehiculos';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { vehiculosService } from '../../../services/vehiculos.service';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-creaeditavehiculos',
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
  templateUrl: './creaeditavehiculos.component.html',
  styleUrl: './creaeditavehiculos.component.css'
})
export class CreaeditavehiculosComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  id: number = 0;
  edicion: boolean = false;
  listaUsuarios: Usuarios[]=[];
  vehiculos:Vehiculos= new Vehiculos();
  listaMarcas: { value: String; viewValue: string }[] = [
    { value: 'M', viewValue: 'M' },
    { value: 'G', viewValue: 'G' },
    { value: 'L', viewValue: 'L' },
  ];
  listaModelos: { value: String; viewValue: string }[] = [
    { value: 'M', viewValue: 'M' },
    { value: 'G', viewValue: 'G' },
    { value: 'L', viewValue: 'L' },
  ];
  listaEstados: { value: String; viewValue: string }[] = [
    { value: 'M', viewValue: 'M' },
    { value: 'G', viewValue: 'G' },
    { value: 'L', viewValue: 'L' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private vS: vehiculosService,
    private uS: UsuariosService
  ){ }
  
  
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      hcodigo: [''],
      hplaca: ['', Validators.required],
      hmodelo: ['', Validators.required],
      hmarca: ['', Validators.required],
      hcapacidad: ['', Validators.required],
      hestado: ['', Validators.required],
      hfecha: ['', Validators.required],
      husuario: ['', Validators.required],
    });
    this.uS.list().subscribe((data)=>{
      this.listaUsuarios=data;
    });
  }

  insertar():void{
    if(this.form.valid){
      this.vehiculos.idVehiculos=this.form.value.hcodigo
      this.vehiculos.placa=this.form.value.hplaca
      this.vehiculos.modelo=this.form.value.hmodelo
      this.vehiculos.marca=this.form.value.hmarca
      this.vehiculos.capacidad_carga=this.form.value.hcapacidad
      this.vehiculos.estado=this.form.value.hestado
      this.vehiculos.fecha_inscripcion=this.form.value.hfecha
      this.vehiculos.us.idUsuarios=this.form.value.husuario

      if(this.edicion){
        this.vS.update(this.vehiculos).subscribe((data)=>{
          this.vS.list().subscribe((data)=>{
            this.vS.setList(data);
          });
        });
      } else {
        this.vS.insert(this.vehiculos).subscribe(data=>{
          this.vS.list().subscribe(data=>{
            this.vS.setList(data)
          });
        });
      }
    }
    this.router.navigate(['/distribuidor/vehiculos'])
  }

  init() {
    if (this.edicion) {
      this.vS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idVehiculos),
          hplaca: new FormControl(data.placa),
          hmodelo: new FormControl(data.modelo),
          hmarca: new FormControl(data.marca),
          hcapacidad: new FormControl(data.capacidad_carga),
          hestado: new FormControl(data.estado),
          hfecha: new FormControl(data.fecha_inscripcion),
          husuario: new FormControl(data.us.nombre),
        });
      });
    }
  }
}
