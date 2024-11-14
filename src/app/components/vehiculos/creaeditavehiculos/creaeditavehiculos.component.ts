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
    { value: 'Toyota', viewValue: 'Toyota' },
    { value: 'Ford', viewValue: 'Ford' },
    { value: 'Chevrolet', viewValue: 'Chevrolet' },
    { value: 'Mitsubishi', viewValue: 'Mitsubishi' },
    { value: 'Nissan', viewValue: 'Nissan' },
    { value: 'Isuzu', viewValue: 'Isuzu' },
    { value: 'Hino', viewValue: 'Hino' },
    { value: 'Volkswagen', viewValue: 'Volkswagen' },
    { value: 'Fuso', viewValue: 'Fuso' },
    { value: 'Ram', viewValue: 'Ram' },
    { value: 'Mercedes Benz', viewValue: 'Mercedes Benz' },
    { value: 'Peugeot', viewValue: 'Peugeot' },
  ];

  listaModelos: Record<string,{value:string; viewValue:string}[]> = {
    'Toyota': [
      { value: 'Hilux', viewValue: 'Hilux' },
      { value: 'Land Cruiser', viewValue: 'Land Cruiser' },
      { value: 'Tacoma', viewValue: 'Tacoma' },
      { value: 'Fortuner', viewValue: 'Fortuner' },
      { value: 'Prado', viewValue: 'Prado' }
    ],
    'Ford': [
      { value: 'F-150', viewValue: 'F-150' },
      { value: 'Ranger', viewValue: 'Ranger' }
    ],
    'Chevrolet': [
      { value: 'Silverado', viewValue: 'Silverado' },
      { value: 'Colorado', viewValue: 'Colorado' },
      { value: 'Express', viewValue: 'Express' },
      { value: 'Tracker', viewValue: 'Tracker' }
    ],
    'Mitsubishi': [
      { value: 'L200', viewValue: 'L200' },
      { value: 'Outlander', viewValue: 'Outlander' },
      { value: 'Montero Sport', viewValue: 'Montero Sport' },

    ],
    'Nissan': [
      { value: 'Frontier', viewValue: 'Frontier' },
      { value: 'NP300', viewValue: 'NP300' },
      { value: 'Navara', viewValue: 'Navara' },
      { value: 'Titan', viewValue: 'Titan' }
    ],
    'Isuzu': [
      { value: 'D-Max', viewValue: 'D-Max' },
      { value: 'N-Series', viewValue: 'N-Series' },
      { value: 'F-Series', viewValue: 'F-Series' },
    ],
    'Hino': [
      { value: '300 series', viewValue: '300 series' },
      { value: '500 series', viewValue: '500 series' },
      { value: '700 series', viewValue: '700 series' }
    ],
    'Volkswagen': [
      { value: 'Amarok', viewValue: 'Amarok' },
      { value: 'Transporter', viewValue: 'Transporter' },
      { value: 'Crafter', viewValue: 'Crafter' },
    ],
    'Fuso': [
      { value: 'Canter', viewValue: 'Canter' },
      { value: 'Fighter', viewValue: 'Fighter' },
      { value: 'Super Great', viewValue: 'Super Great' },

    ],
    'Ram': [
      { value: '1500', viewValue: '1500' },
      { value: '2500', viewValue: '2500' },
      { value: '3500', viewValue: '3500' },
      { value: 'ProMaster', viewValue: 'ProMaster' }
    ],
    'Mercedes Benz': [
      { value: 'Sprinter', viewValue: 'Sprinter' },
      { value: 'Vito', viewValue: 'Vito' },
      { value: 'Actros', viewValue: 'Actros' },
    ],
    'Peugeot': [
      { value: 'Partner', viewValue: 'Partner' },
      { value: 'Boxer', viewValue: 'Boxer' },
      { value: 'Expert', viewValue: 'Expert' },
    ],
  };

  listaEstados: { value: String; viewValue: string }[] = [
    { value: 'Disponible', viewValue: 'Disponible' },
    { value: 'En Mantenimiento', viewValue: 'En Mantenimiento' },
    { value: 'En Ruta', viewValue: 'En Ruta' },
    { value: 'En Espera', viewValue: 'En Espera' },
    { value: 'Fuera de Servicio', viewValue: 'Fuera de Servicio' },
    { value: 'Inactivo', viewValue: 'Inactivo' },
    { value: 'Reservado', viewValue: 'Reservado' },
    { value: 'Accidentado', viewValue: 'Accidentado' },
    { value: 'Reparacion Tecnica', viewValue: 'Reparacion Tecnica' },
    { value: 'Averiado', viewValue: 'Averiado' },
  ];

  marcaSeleccionada: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private vS: vehiculosService,
    private uS: UsuariosService
  ){ }
  
  obtenerModelosPorMarca() {
    return this.listaModelos[this.marcaSeleccionada] || [];
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      hcodigo: new FormControl(''),
      hplaca: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]{3}-[0-9]{3}$')]),
      hmodelo: new FormControl('', Validators.required),
      hmarca: new FormControl('', Validators.required),
      hcapacidad: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      hestado: new FormControl('', Validators.required),
      hfecha: new FormControl({ value: new Date(), disabled: true }, Validators.required),
      husuario: new FormControl('', Validators.required),
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
      this.vehiculos.fecha_inscripcion=this.form.get('hfecha')?.value;
      this.vehiculos.usuario.idUsuarios=this.form.value.husuario

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
    this.router.navigate(['/home/vehiculos'])
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
          husuario: new FormControl(data.usuario.nombre),
        });
      });
    }
  }
}
