import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Controles } from '../../../models/Controles';
import { ControlesService } from '../../../services/controles.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-creaeditacontrol',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule, 
    MatSelectModule, 
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './creaeditacontrol.component.html',
  styleUrl: './creaeditacontrol.component.css'
})
export class CreaeditacontrolComponent implements OnInit{
  form: FormGroup=new FormGroup({});
  controles: Controles= new Controles();
  id: number=0;
  edicion: boolean=false;
  listaTipos: { value: string; viewValue: string }[] = [
    { value: 'Control de Calidad', viewValue: 'Control de Calidad' },
    { value: 'Control Ambiental', viewValue: 'Control Ambiental' },
    { value: 'Control de Seguridad', viewValue: 'Control de Seguridad' },
    { value: 'Control de Inventario', viewValue: 'Control de Inventario' },
    { value: 'Control de Documentacion', viewValue: 'Control de Documentacion' },
    { value: 'Control de Transporte', viewValue: 'Control de Transporte' },
    { value: 'Control de Procesos', viewValue: 'Control de Procesos' },
  ];
  listaUbicaciones:{ value: string; viewValue: string }[] = [
    { value: 'Lima ', viewValue: 'Lima' },
    { value: 'La Libertad ', viewValue: 'La Libertad ' },
    { value: 'Piura', viewValue: 'Piura' },
    { value: 'Lambayeque', viewValue: 'Lambayeque' },
    { value: 'Ica', viewValue: 'Ica' },
    { value: 'Ancash', viewValue: 'Ancash' },
    { value: 'Cusco', viewValue: 'Cusco' },
    { value: 'Cajamarca ', viewValue: 'Cajamarca' },
    { value: 'Ayacucho', viewValue: 'Ayacucho' },
    { value: 'Huancavelica', viewValue: 'Huancavelica' },
    { value: 'Puno', viewValue: 'Puno' },
    { value: 'Junin', viewValue: 'Junin' },
    { value: 'Apurimac', viewValue: 'Apurimac' },
    { value: 'Loreto', viewValue: 'Loreto' },
    { value: 'San Martin', viewValue: 'San Martin' },
    { value: 'Ucayali', viewValue: 'Ucayali' },
    { value: 'Madre de Dios', viewValue: 'Madre de Dios' },
    { value: 'Amazonas', viewValue: 'Amazonas' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private cS: ControlesService,
    private router:Router,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null;
      this.init();
    });
    this.form=this.formBuilder.group({
      hcodigo:[''],
      htipo: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hubicacion: ['', Validators.required],
      hfecha: ['', Validators.required],
    })
  }
  insertar():void{
    if(this.form.valid){
      this.controles.idControles = this.form.value.hcodigo;
      this.controles.tipo_control = this.form.value.htipo;
      this.controles.descripcion = this.form.value.hdescripcion;
      this.controles.fecha_control = this.form.value.hfecha;
      this.controles.ubicacion = this.form.value.hubicacion;
      if(this.edicion){
        this.cS.update(this.controles).subscribe((data)=>{
          this.cS.list().subscribe((data)=>{
            this.cS.setList(data);
          });
        });
      }else{
        this.cS.insert(this.controles).subscribe((data)=>{
          this.cS.list().subscribe((data)=>{
            this.cS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['controles']);
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idControles),
          htipo: new FormControl(data.tipo_control),
          hdescripcion: new FormControl(data.descripcion),
          hubicacion: new FormControl(data.ubicacion),
          hfecha: new FormControl(data.fecha_control),
        });
      });
    }
  }
}
